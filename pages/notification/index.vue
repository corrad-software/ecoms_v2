<script setup>
definePageMeta({
  layout: "admin",
  title: "Notification Center",
});

const activeTab = ref("general");

const notifications = ref({
  general: [
    { id: 1, title: "General Notification 1", content: "Content for general notification 1" },
    { id: 2, title: "General Notification 2", content: "Content for general notification 2" },
  ],
  announcements: [
    { id: 1, title: "Announcement 1", content: "Content for announcement 1" },
    { id: 2, title: "Announcement 2", content: "Content for announcement 2" },
  ],
  system: [
    { id: 1, title: "System Alert 1", content: "Content for system alert 1" },
    { id: 2, title: "System Alert 2", content: "Content for system alert 2" },
  ],
});

const addNotification = (type, notification) => {
  notifications.value[type].push({ ...notification, id: Date.now() });
};

const deleteNotification = (type, id) => {
  notifications.value[type] = notifications.value[type].filter(n => n.id !== id);
};

const showAddNotificationModal = ref(false);
const newNotification = ref({ title: "", content: "" });

const openAddNotificationModal = () => {
  newNotification.value = { title: "", content: "" };
  showAddNotificationModal.value = true;
};

const handleAddNotification = () => {
  if (newNotification.value.title && newNotification.value.content) {
    addNotification(activeTab.value, newNotification.value);
    showAddNotificationModal.value = false;
  }
};

const searchQuery = ref("");
const filteredNotifications = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return {
    general: notifications.value.general.filter(n => n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query)),
    announcements: notifications.value.announcements.filter(n => n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query)),
    system: notifications.value.system.filter(n => n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query)),
  };
});

const showDeleteConfirmation = ref(false);
const notificationToDelete = ref(null);

const confirmDeleteNotification = (type, id) => {
  notificationToDelete.value = { type, id };
  showDeleteConfirmation.value = true;
};

const handleDeleteNotification = () => {
  if (notificationToDelete.value) {
    deleteNotification(notificationToDelete.value.type, notificationToDelete.value.id);
    showDeleteConfirmation.value = false;
    notificationToDelete.value = null;
  }
};

const selectedNotification = ref(null);

const selectNotification = (notification) => {
  selectedNotification.value = notification;
};

const customNavigation = [
  { name: "General", value: "general" },
  { name: "Announcements", value: "announcements" },
  { name: "System Alerts", value: "system" },
];
</script>

<template>
  <div class="flex h-[calc(100vh-100px)]">
    <!-- Sidebar -->
    <div class="w-64 bg-gray-100 p-4 flex flex-col">
      <h2 class="text-xl font-semibold mb-4">Notification Center</h2>
      <nav class="space-y-2 flex-1 overflow-y-auto">
        <button
          v-for="item in customNavigation"
          :key="item.value"
          @click="activeTab = item.value"
          class="block w-full text-left px-4 py-2 rounded-md transition-colors"
          :class="[activeTab === item.value ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-indigo-200']"
        >
          {{ item.name }}
        </button>
      </nav>
    </div>

    <!-- Notification List -->
    <div class="w-1/3 bg-white border-r border-gray-200 p-4 flex flex-col">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium">Notifications</h3>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="block w-1/2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>
      <ul class="flex-1 overflow-y-auto">
        <li
          v-for="notification in filteredNotifications[activeTab]"
          :key="notification.id"
          @click="selectNotification(notification)"
          class="p-4 mb-2 border rounded-md cursor-pointer hover:bg-gray-100"
        >
          <h4 class="text-md font-semibold">{{ notification.title }}</h4>
          <p class="text-sm text-gray-600">{{ notification.content }}</p>
          <p class="text-xs text-gray-400">{{ new Date(notification.id).toLocaleString() }}</p>
        </li>
      </ul>
    </div>

    <!-- Notification Details -->
    <div class="flex-1 p-4 flex flex-col">
      <div v-if="selectedNotification" class="flex-1 overflow-y-auto">
        <h3 class="text-xl font-semibold mb-2">{{ selectedNotification.title }}</h3>
        <p class="text-sm text-gray-600 mb-4">{{ selectedNotification.content }}</p>
        <p class="text-xs text-gray-400 mb-4">{{ new Date(selectedNotification.id).toLocaleString() }}</p>
        <Button @click="confirmDeleteNotification(activeTab, selectedNotification.id)" variant="danger">
          <Icon name="mdi:trash-can"></Icon> Delete
        </Button>
      </div>
      <div v-else class="flex-1 flex items-center justify-center">
        <p class="text-gray-600">Select a notification to view details</p>
      </div>
    </div>
  </div>

  <!-- Add Notification Modal -->
  <Modal v-model:open="showAddNotificationModal">
    <ModalHeader>
      <ModalTitle>Add Notification</ModalTitle>
    </ModalHeader>
    <ModalBody>
      <div class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input id="title" v-model="newNotification.title" type="text" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
        </div>
        <div>
          <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
          <textarea id="content" v-model="newNotification.content" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"></textarea>
        </div>
      </div>
    </ModalBody>
    <ModalFooter>
      <Button @click="handleAddNotification" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Notification</Button>
      <Button @click="showAddNotificationModal = false" class="mt-4 ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</Button>
    </ModalFooter>
  </Modal>

  <!-- Delete Confirmation Modal -->
  <Modal v-model:open="showDeleteConfirmation">
    <ModalHeader>
      <ModalTitle>Confirm Delete</ModalTitle>
    </ModalHeader>
    <ModalBody>
      <p>Are you sure you want to delete this notification?</p>
    </ModalBody>
    <ModalFooter>
      <Button @click="handleDeleteNotification" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</Button>
      <Button @click="showDeleteConfirmation = false" class="mt-4 ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</Button>
    </ModalFooter>
  </Modal>
</template>

<style scoped>
.router-link-active {
  @apply text-foreground font-medium;
}
.flex {
  display: flex;
}
.h-screen {
  height: 100vh;
}
.flex-1 {
  flex: 1;
}
.overflow-y-auto {
  overflow-y: auto;
}
</style>
