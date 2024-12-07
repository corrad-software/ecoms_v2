<script setup>
const props = defineProps({
  isMinimized: {
    type: Boolean,
    default: false,
  },
});

const layoutStore = useLayoutStore();
const isRTL = computed(() => layoutStore.isRTL);

defineEmits(["toggle"]);

const unreadCount = 2;
</script>

<template>
  <header
    class="sticky top-0 h-14 bg-background border-b px-3 flex items-center gap-3 z-50"
    :class="[isRTL ? 'flex-row-reverse' : 'flex-row']"
  >
    <!-- Left side -->
    <button
      @click="$emit('toggle')"
      :class="[
        'p-1.5 hover:bg-accent rounded-lg flex items-center justify-center',
        isRTL ? 'order-last' : 'order-first',
      ]"
    >
      <Icon name="mdi:menu" class="w-4 h-4" />
    </button>

    <!-- Right side -->
    <div
      class="flex items-center gap-2"
      :class="[isRTL ? 'mr-auto' : 'ml-auto']"
    >
      <!-- Theme Switcher -->
      <ThemeSwitcher />

      <!-- Notification -->
      <Dropdown>
        <DropdownTrigger class="relative">
          <button
            class="p-1.5 hover:bg-accent rounded-lg flex items-center justify-center"
          >
            <Icon name="mdi:bell" class="w-4 h-4" />
            <span
              v-if="unreadCount"
              :class="[
                'absolute top-0.5 w-3.5 h-3.5 bg-danger rounded-full text-[10px] text-danger-foreground flex items-center justify-center',
                isRTL ? 'left-0.5' : 'right-0.5',
              ]"
            >
              {{ unreadCount }}
            </span>
          </button>
        </DropdownTrigger>
        <DropdownContent class="w-80">
          <div class="px-3 py-2 border-b">
            <h3 class="font-semibold text-sm">Notifications</h3>
          </div>
          <div class="py-1.5">
            <DropdownItem>
              <div class="flex items-start gap-3">
                <div class="p-1 bg-primary/10 rounded">
                  <Icon name="mdi:email" class="w-3.5 h-3.5 text-primary" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium">New message received</p>
                  <p class="text-xs text-muted-foreground truncate">
                    You have a new message from John Doe
                  </p>
                </div>
                <p class="text-xs text-muted-foreground">2m ago</p>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div class="flex items-start gap-3">
                <div class="p-1 bg-success/10 rounded">
                  <Icon
                    name="mdi:check-circle"
                    class="w-3.5 h-3.5 text-success"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium">Task completed</p>
                  <p class="text-xs text-muted-foreground truncate">
                    Project X has been successfully deployed
                  </p>
                </div>
                <p class="text-xs text-muted-foreground">1h ago</p>
              </div>
            </DropdownItem>
          </div>
          <div class="px-3 py-2 border-t text-center">
            <NuxtLink
              to="/notifications"
              class="text-xs text-primary hover:text-primary/90"
            >
              View all notifications
            </NuxtLink>
          </div>
        </DropdownContent>
      </Dropdown>

      <!-- User Profile -->
      <Dropdown>
        <DropdownTrigger>
          <button
            class="flex items-center gap-2 p-1 hover:bg-accent rounded-lg"
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
              alt="User"
              class="w-7 h-7 rounded-full"
            />
            <span class="text-sm font-medium">Admin User</span>
            <Icon name="mdi:chevron-down" class="w-4 h-4" />
          </button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>
            <div class="flex items-center gap-2">
              <Icon name="mdi:account" class="w-4 h-4" />
              <span class="text-sm">Profile</span>
            </div>
          </DropdownItem>
          <DropdownItem>
            <div class="flex items-center gap-2">
              <Icon name="mdi:cog" class="w-4 h-4" />
              <span class="text-sm">Settings</span>
            </div>
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem>
            <div class="flex items-center gap-2">
              <Icon name="mdi:logout" class="w-4 h-4" />
              <span class="text-sm">Log out</span>
            </div>
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  </header>
</template>
