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

const menuItems = [
  {
    type: "section",
    title: "Platform",
    items: [
      {
        name: "Home",
        icon: "lucide:home",
        path: "/admin",
      },
      {
        name: "Playground",
        icon: "lucide:play",
        children: [
          { name: "History", path: "/admin/playground/history" },
          { name: "Starred", path: "/admin/playground/starred" },
          { name: "Settings", path: "/admin/playground/settings" },
        ],
      },
      {
        name: "Models",
        icon: "lucide:boxes",
        children: [
          { name: "Genesis", path: "/admin/models/genesis" },
          { name: "Explorer", path: "/admin/models/explorer" },
          { name: "Quantum", path: "/admin/models/quantum" },
        ],
      },
      { name: "Documentation", icon: "lucide:file-text", path: "/admin/docs" },
      { name: "Settings", icon: "lucide:settings", path: "/admin/settings" },
    ],
  },
  {
    type: "section",
    title: "Projects",
    items: [
      {
        name: "Design Engineering",
        icon: "lucide:puzzle",
        path: "/admin/design",
      },
      {
        name: "Sales & Marketing",
        icon: "lucide:trending-up",
        path: "/admin/sales",
      },
      { name: "Travel", icon: "lucide:plane", path: "/admin/travel" },
      { name: "More", icon: "lucide:more-horizontal", path: "/admin/more" },
    ],
  },
];

const handleOverlayClick = () => {
  emit("toggle");
};

// Compute layout-based properties
const isHorizontal = computed(() => layoutStore.sidebarLayout === "horizontal");
const isRTL = computed(() => layoutStore.isRTL);

// Compute effective isMinimized state based on screen size and layout
const effectiveIsMinimized = computed(() => {
  // Don't minimize if horizontal layout
  if (isHorizontal.value) return false;

  // Force false on mobile (< 768px)
  if (process.client && window.innerWidth < 768) {
    return false;
  }
  return props.isMinimized;
});

// Handle window resize
const handleResize = () => {
  effectiveIsMinimized.value;
};

// Setup and cleanup resize listener
onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
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

// Dynamic classes for the sidebar
const sidebarClasses = computed(() => {
  const widthClass = props.isMinimized ? "w-14" : "w-56";
  return `fixed inset-y-0 left-0 z-50 ${widthClass} bg-sidebar border-r transform transition-all duration-200 ease-in-out`;
});

// Dynamic classes for navigation items
const navItemClasses = computed(() => {
  return "flex items-center w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors gap-3";
});

const iconContainerClasses = computed(() => {
  // if (props.isMinimized) {
  //   return "w-full flex items-center justify-center";
  // }
  return "flex items-center gap-2";
});

const textClasses = computed(() => {
  return "transition-all duration-200 overflow-hidden";
});

const isActive = (path) => {
  if (!path) return false;
  return path === useRoute().path;
};

const textVisible = ref(!props.isMinimized);

watch(
  () => props.isMinimized,
  (newValue) => {
    if (newValue) {
      // When minimizing: hide text first, then collapse sidebar
      textVisible.value = false;
    } else {
      // When expanding: expand sidebar first, then show text
      setTimeout(() => {
        textVisible.value = true;
      }, 200); // Match the sidebar transition duration
    }
  }
);

// Update the section title classes
const sectionTitleClasses = computed(() => {
  return "px-3 text-xs font-medium text-muted-foreground tracking-wider uppercase";
});
</script>

<template>
  <div>
    <!-- Overlay (only for vertical layout) -->
    <div
      v-if="props.isOpen && !isHorizontal"
      @click="handleOverlayClick"
      class="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
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
          <Transition name="fade">
            <div v-if="!effectiveIsMinimized" class="space-y-1">
              <h2 class="text-sm font-semibold">Acme Inc</h2>
              <p class="text-xs text-muted-foreground">Enterprise</p>
            </div>
          </Transition>
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
                <!-- Item with children -->
                <div v-if="item.children" class="relative">
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
                      v-if="!effectiveIsMinimized"
                      class="flex-1"
                      :class="{ 'text-left': !isRTL, 'text-right': isRTL }"
                      >{{ item.name }}</span
                    >
                    <Icon
                      v-if="!effectiveIsMinimized"
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

                  <!-- Submenu -->
                  <div
                    v-show="
                      expandedItems.has(item.name) && !effectiveIsMinimized
                    "
                    class="mt-1"
                  >
                    <NuxtLink
                      v-for="child in item.children"
                      :key="child.name"
                      :to="child.path"
                      class="flex items-center w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 pl-10"
                    >
                      <span>{{ child.name }}</span>
                    </NuxtLink>
                  </div>
                </div>

                <!-- Regular item -->
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
