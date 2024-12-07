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

const isHorizontal = computed(() => layoutStore.sidebarLayout === "horizontal");
const isRTL = computed(() => layoutStore.isRTL);

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
  <aside :class="sidebarClasses" class="flex flex-col">
    <!-- Logo -->
    <div class="h-14 flex items-center px-3 border-b border-border">
      <div class="flex items-center gap-2">
        <div
          class="w-8 h-8 bg-primary rounded-md flex items-center justify-center"
        >
          <Icon name="lucide:box" class="w-5 h-5 text-primary-foreground" />
        </div>
        <Transition name="fade">
          <div v-if="!props.isMinimized" class="space-y-1">
            <h2 class="text-sm font-semibold">Acme Inc</h2>
            <p class="text-xs text-muted-foreground">Enterprise</p>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex-1 overflow-y-auto py-4 px-2">
      <nav class="space-y-1">
        <template v-for="section in menuItems" :key="section.title">
          <div v-if="!props.isMinimized" class="pt-4 pb-2">
            <h2 :class="sectionTitleClasses">
              {{ section.title }}
            </h2>
          </div>

          <div class="space-y-1">
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
                  <span v-if="!props.isMinimized" class="flex-1 text-left">{{
                    item.name
                  }}</span>
                  <Icon
                    v-if="!props.isMinimized"
                    :name="
                      expandedItems.has(item.name)
                        ? 'lucide:chevron-down'
                        : 'lucide:chevron-right'
                    "
                    class="w-4 h-4 shrink-0 ml-auto"
                  />
                </button>

                <!-- Submenu -->
                <div
                  v-show="expandedItems.has(item.name) && !props.isMinimized"
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
                <span v-if="!props.isMinimized" class="flex-1">{{
                  item.name
                }}</span>
              </NuxtLink>
            </template>
          </div>
        </template>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

aside {
  transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
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
