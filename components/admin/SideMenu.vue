<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  isMinimized: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggle"]);
const layoutStore = useLayoutStore();
const { getAdminNavigation } = useNavigation();
const menuItems = getAdminNavigation();

const handleOverlayClick = () => {
  emit("toggle");
};

// Compute layout-based properties
const isHorizontal = computed(() => layoutStore.sidebarLayout === "horizontal");
const isRTL = computed(() => layoutStore.isRTL);

// Compute effective isMinimized state based on screen size and layout
const effectiveIsMinimized = computed(() => {
  if (isHorizontal.value) return false;
  if (process.client && window.innerWidth < 768) {
    return false;
  }
  return props.isMinimized;
});

// Compute sidebar positioning classes
const sidebarPositionClasses = computed(() => {
  if (isHorizontal.value) {
    return "fixed top-14 left-0 right-0 h-auto";
  }

  return [
    "fixed inset-y-0",
    isRTL.value ? "right-0" : "left-0",
    props.isOpen ? "z-50" : "-translate-x-full md:translate-x-0",
    effectiveIsMinimized.value ? "w-14" : "w-56",
  ];
});

// Track expanded menu items
const expandedItems = ref(new Set());

const toggleExpand = (itemName) => {
  if (expandedItems.value.has(itemName)) {
    expandedItems.value.delete(itemName);
  } else {
    expandedItems.value.add(itemName);
  }
};

// Dynamic classes for navigation items
const navItemClasses = computed(() => {
  return "flex items-center w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md gap-3";
});

const sectionTitleClasses = computed(() => {
  return "px-3 text-xs font-medium text-muted-foreground tracking-wider uppercase";
});

const isActive = (path) => {
  if (!path) return false;
  return path === useRoute().path;
};
</script>

<template>
  <div>
    <!-- Overlay (only for vertical layout) -->
    <div
      v-if="props.isOpen && !isHorizontal"
      @click="handleOverlayClick"
      class="fixed inset-0 backdrop-blur-sm backdrop-brightness-75 z-40 md:hidden"
    ></div>

    <!-- Sidebar -->
    <aside
      :class="[
        'bg-sidebar border-r flex',
        isHorizontal ? 'flex-row' : 'flex-col',
        ...sidebarPositionClasses,
        'transition-all duration-200',
      ]"
    >
      <!-- Logo (only show in vertical layout) -->
      <div
        v-if="!isHorizontal"
        class="h-14 flex items-center px-3 border-b border-border"
      >
        <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 bg-primary rounded-md flex items-center justify-center"
          >
            <Icon name="lucide:box" class="w-5 h-5 text-primary-foreground" />
          </div>
          <div
            class="overflow-hidden transition-all duration-200"
            :style="{
              width: effectiveIsMinimized ? '0' : 'auto',
              opacity: effectiveIsMinimized ? '0' : '1',
            }"
          >
            <h2 class="text-sm font-semibold whitespace-nowrap">Corrad UI</h2>
            <p class="text-xs text-muted-foreground whitespace-nowrap">
              Enterprise
            </p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div
        class="flex-1 overflow-y-auto py-4 px-2"
        :class="{ 'px-4': isHorizontal }"
      >
        <nav class="space-y-1">
          <template v-for="section in menuItems" :key="section.title">
            <!-- Section title (only in vertical layout when not minimized) -->
            <div
              v-if="!effectiveIsMinimized && !isHorizontal"
              class="pt-4 pb-2"
            >
              <h2 :class="sectionTitleClasses">
                {{ section.title }}
              </h2>
            </div>

            <!-- Navigation items -->
            <div
              :class="[
                'space-y-1',
                isHorizontal ? 'flex items-center gap-4' : '',
              ]"
            >
              <template v-for="item in section.items" :key="item.name">
                <!-- Items with children -->
                <template v-if="item.children">
                  <!-- Minimized state -->
                  <template v-if="effectiveIsMinimized">
                    <HoverCard>
                      <HoverCardTrigger>
                        <button
                          class="submenu-trigger relative"
                          :class="navItemClasses"
                        >
                          <Icon :name="item.icon" class="w-4 h-4 shrink-0" />
                        </button>
                      </HoverCardTrigger>

                      <HoverCardContent side="right" align="start">
                        <div class="min-w-[8rem] z-50">
                          <div class="mb-2 font-medium">{{ item.name }}</div>
                          <div class="space-y-1">
                            <template
                              v-for="child in item.children"
                              :key="child.name"
                            >
                              <!-- Handle nested children -->
                              <template v-if="child.children">
                                <div class="px-2 py-1.5 text-sm font-medium">
                                  {{ child.name }}
                                </div>
                                <NuxtLink
                                  v-for="subChild in child.children"
                                  :key="subChild.name"
                                  :to="subChild.path"
                                  class="block px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-sm"
                                >
                                  {{ subChild.name }}
                                </NuxtLink>
                              </template>
                              <!-- Regular child item -->
                              <NuxtLink
                                v-else
                                :to="child.path"
                                class="block px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-sm"
                              >
                                {{ child.name }}
                              </NuxtLink>
                            </template>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </template>

                  <!-- Non-minimized state -->
                  <template v-else>
                    <button
                      @click="toggleExpand(item.name)"
                      :class="[
                        navItemClasses,
                        expandedItems.has(item.name)
                          ? 'bg-accent text-foreground'
                          : '',
                      ]"
                    >
                      <Icon :name="item.icon" class="w-4 h-4 shrink-0" />
                      <span
                        class="flex-1"
                        :class="{ 'text-left': !isRTL, 'text-right': isRTL }"
                      >
                        {{ item.name }}
                      </span>
                      <Icon
                        :name="
                          expandedItems.has(item.name)
                            ? 'lucide:chevron-down'
                            : isRTL
                            ? 'lucide:chevron-left'
                            : 'lucide:chevron-right'
                        "
                        class="w-4 h-4 shrink-0"
                        :class="{ 'ml-auto': !isRTL, 'mr-auto': isRTL }"
                      />
                    </button>

                    <!-- Expanded menu in non-minimized state -->
                    <div
                      v-show="expandedItems.has(item.name)"
                      class="mt-1 space-y-1"
                    >
                      <template
                        v-for="child in item.children"
                        :key="child.name"
                      >
                        <!-- Handle nested children -->
                        <template v-if="child.children">
                          <button
                            @click="toggleExpand(child.name)"
                            class="w-full pl-10 pr-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 flex items-center justify-between"
                          >
                            <span>{{ child.name }}</span>
                            <Icon
                              :name="
                                expandedItems.has(child.name)
                                  ? 'lucide:chevron-down'
                                  : 'lucide:chevron-right'
                              "
                              class="w-4 h-4 shrink-0"
                            />
                          </button>
                          <div
                            v-show="expandedItems.has(child.name)"
                            class="pl-12"
                          >
                            <NuxtLink
                              v-for="subChild in child.children"
                              :key="subChild.name"
                              :to="subChild.path"
                              class="block py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50"
                            >
                              {{ subChild.name }}
                            </NuxtLink>
                          </div>
                        </template>
                        <!-- Regular child item -->
                        <NuxtLink
                          v-else
                          :to="child.path"
                          class="block pl-10 pr-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        >
                          {{ child.name }}
                        </NuxtLink>
                      </template>
                    </div>
                  </template>
                </template>

                <!-- Regular item without children -->
                <NuxtLink
                  v-else
                  :to="item.path"
                  :class="[
                    navItemClasses,
                    isActive(item.path) ? 'bg-accent text-foreground' : '',
                  ]"
                >
                  <Icon :name="item.icon" class="w-4 h-4 shrink-0" />
                  <span v-if="!effectiveIsMinimized" class="flex-1">{{
                    item.name
                  }}</span>
                </NuxtLink>
              </template>
            </div>
          </template>
        </nav>
      </div>
    </aside>
  </div>
</template>

<style scoped>
aside {
  transition: width 200ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hide scrollbar but maintain functionality */
.overflow-y-auto {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.overflow-y-auto::-webkit-scrollbar {
  display: none;
}
</style>
