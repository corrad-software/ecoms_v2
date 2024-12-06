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
        icon: "mdi:home",
        path: "/admin",
      },
      {
        name: "Playground",
        icon: "mdi:play-circle",
        children: [
          { name: "History", path: "/admin/playground/history" },
          { name: "Starred", path: "/admin/playground/starred" },
          { name: "Settings", path: "/admin/playground/settings" },
        ],
      },
      { name: "Models", icon: "mdi:cube", path: "/admin/models" },
      { name: "Documentation", icon: "mdi:file-document", path: "/admin/docs" },
      { name: "Settings", icon: "mdi:cog", path: "/admin/settings" },
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
  if (isHorizontal.value) {
    return "fixed top-0 left-0 right-0 h-14 bg-background border-b border-input z-50";
  }

  const rtlClasses = isRTL.value ? "right-0" : "left-0";
  const widthClass = props.isMinimized ? "w-16" : "w-56";
  return `fixed inset-y-0 ${rtlClasses} z-50 ${widthClass} bg-background border-r border-input transform transition-all duration-200 ease-in-out ${
    props.isOpen
      ? "translate-x-0"
      : isRTL.value
      ? "translate-x-full"
      : "-translate-x-full"
  } md:translate-x-0`;
});

// Dynamic classes for navigation items
const navItemClasses = computed(() => {
  const baseClasses =
    "flex items-center w-full px-2 py-1.5 text-sm text-foreground rounded-md hover:bg-accent  duration-150";
  if (props.isMinimized) {
    return `${baseClasses} justify-center h-8`;
  }
  return `${baseClasses} justify-between`;
});

const isActive = (path) => {
  if (!path) return false;
  return path === useRoute().path;
};
</script>

<template>
  <aside :class="sidebarClasses" class="flex flex-col">
    <!-- Logo -->
    <div
      class="h-14 flex items-center px-3 border border-input"
      :class="{ 'justify-start': !isMinimized, 'justify-center': isMinimized }"
    >
      <div class="flex items-center gap-2">
        <div
          class="w-7 h-7 bg-primary rounded-lg flex items-center justify-center"
        >
          <Icon name="lucide:box" class="w-4 h-4 text-primary-foreground" />
        </div>
        <div v-if="!isMinimized">
          <div class="text-sm font-semibold text-foreground">Acme Inc</div>
          <div class="text-xs text-muted-foreground">Enterprise</div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex-1 overflow-y-auto">
      <nav class="p-2">
        <template v-for="section in menuItems" :key="section.title">
          <!-- Section Title -->
          <div v-if="!isMinimized" class="px-2 pt-3 pb-1">
            <h2
              class="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
            >
              {{ section.title }}
            </h2>
          </div>
          <div v-else class="pt-3"></div>

          <!-- Section Items -->
          <div class="space-y-0.5">
            <template v-for="item in section.items" :key="item.name">
              <!-- Item with children -->
              <div v-if="item.children" class="space-y-0.5">
                <Dropdown
                  :class="navItemClasses"
                  v-if="isMinimized"
                  :hover="true"
                >
                  <DropdownTrigger>
                    <button class="flex items-center gap-2">
                      <Icon :name="item.icon" class="w-4 h-4" />
                    </button>
                  </DropdownTrigger>
                  <DropdownContent class="ml-2" side="right">
                    <DropdownItem
                      v-for="child in item.children"
                      :key="child.name"
                    >
                      <NuxtLink
                        :to="child.path"
                        class="flex items-center gap-2"
                      >
                        <span class="text-sm">{{ child.name }}</span>
                      </NuxtLink>
                    </DropdownItem>
                  </DropdownContent>
                </Dropdown>
                <template v-else>
                  <button
                    @click="toggleExpand(item.name)"
                    :class="[
                      navItemClasses,
                      expandedItems.has(item.name) ? 'bg-accent' : '',
                    ]"
                  >
                    <div class="flex items-center gap-2">
                      <Icon :name="item.icon" class="w-4 h-4" />
                      <span v-if="!isMinimized" class="text-sm">{{
                        item.name
                      }}</span>
                    </div>
                    <Icon
                      v-if="!isMinimized"
                      :name="
                        expandedItems.has(item.name)
                          ? 'mdi:chevron-down'
                          : 'mdi:chevron-right'
                      "
                      class="w-4 h-4"
                    />
                  </button>

                  <!-- Submenu -->
                  <div
                    v-show="expandedItems.has(item.name)"
                    class="ml-4 space-y-0.5"
                  >
                    <NuxtLink
                      v-for="child in item.children"
                      :key="child.name"
                      :to="child.path"
                      :class="[
                        navItemClasses,
                        isActive(child.path) ? 'bg-accent' : '',
                      ]"
                    >
                      <span class="text-sm">{{ child.name }}</span>
                    </NuxtLink>
                  </div>
                </template>
              </div>

              <!-- Regular item -->
              <NuxtLink
                v-else
                :to="item.path"
                :class="[
                  navItemClasses,
                  isActive(item.path) ? 'bg-accent' : '',
                ]"
                :title="isMinimized ? item.name : ''"
              >
                <div
                  class="flex items-center gap-2"
                  :class="{ 'justify-center w-full': isMinimized }"
                >
                  <Icon :name="item.icon" class="w-4 h-4" />
                  <span v-if="!isMinimized" class="text-sm">{{
                    item.name
                  }}</span>
                </div>
              </NuxtLink>
            </template>
          </div>
        </template>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
.router-link-active {
  @apply bg-accent font-medium;
}
</style>
