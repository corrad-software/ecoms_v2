
<script setup>
definePageMeta({
  layout: "admin",
  title: "Notification Center",
});


const activeTab = ref("announcements");


const notifications = ref({
  tasks: [
    { 
      id: 1, 
      title: "Permohonan Baru", 
      content: {
        request_id: "A10089",
        project: {
          title: "Projek Pembinaan Sekolah",
          ministry: "Kementerian Pendidikan",
          access: "Akses penuh & 3 bulan",
        },
        requester:{
          name: "Ahmad bin Ali",
          ic: "800101-01-1234",
          gred: "Gred 41",
          emel: "ahmad.ali@jkr.gov.my",
        },
        section: {
          category: "Bangunan",
          building_category: "Sekolah",
          pap: "PAP A",
          type: "Reka Bentuk Moden",
          dicipline: "Arkitek"
        }
      }
    },
    { 
      id: 2, 
      title: "Permohonan Baru", 
      content: {
        request_id: "A10089",
        project: {
          title: "Projek Pembinaan Stadium",
          ministry: "Kementerian Belia dan Sukan",
          access: "Akses penuh & 6 bulan",
        },
        requester:{
          name: "Ali bin Siti",
          ic: "850606-06-6789",
          gred: "Gred 44",
          emel: "ali.siti@jkr.gov.my",
        },
        section: {
          category: "Bangunan",
          building_category: "Stadium",
          pap: "PAP F",
          type: "Reka Bentuk Moden",
          dicipline: "Jurutera Elektrik"
        }
      }
    },
  ],
  announcements: [
    {
      id: 1,
      title: "Important System Update - March 2025",
      image: "~/assets/image/announcement_1.png",
      content: "We are excited to announce a major system update scheduled for March 15, 2025. This update includes performance improvements, security enhancements, and new features designed to streamline your experience. During the update window from 12:00 AM to 4:00 AM (UTC), the system may experience temporary downtime. We appreciate your patience and will notify you once the update is complete. For further details, please visit our support page or contact our helpdesk."
    },
    {
      id: 2,
      title: "Scheduled Maintenance Notice - March 2025",
      image: "~/assets/image/announcement_1.png",
      content: "Dear users, we would like to inform you that scheduled maintenance will take place on March 20, 2025, from 2:00 AM to 6:00 AM (UTC). During this period, some services may be temporarily unavailable as we implement critical system updates and security improvements. We apologize for any inconvenience this may cause and appreciate your understanding. If you have any urgent inquiries, please reach out to our support team. Thank you for your cooperation!"
    }

  ],
  system: [
    { id: 1, title: "Dokumen Hampir Luput", content: "Dokumen anda hampir mencapai tarikh luput 24/2/2025. Sila perbaharui sebelum tarikh akhir untuk mengelakkan sebarang kesulitan.", document: "project-plan.pdf", expiredDate: "24/2/2025" },
    { id: 2, title: "Dokumen Hampir Luput", content: "Dokumen anda hampir mencapai tarikh luput 28/2/2025. Sila perbaharui sebelum tarikh akhir untuk mengelakkan sebarang kesulitan.", document: "stadium-blueprint.png", expiredDate: "28/2/2025" }
  ],
});

const addNotification = (type, notification) => {
  if (type !== 'all') {
    notifications.value[type].push({ ...notification, id: Date.now() });
  }
};

const deleteNotification = (type, id) => {
  if (type === 'all') {
    Object.keys(notifications.value).forEach(key => {
      notifications.value[key] = notifications.value[key].filter(n => n.id !== id);
    });
  } else {
    notifications.value[type] = notifications.value[type].filter(n => n.id !== id);
  }
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
  const filtered = {
    all: [
      ...notifications.value.tasks,
      ...notifications.value.announcements,
      ...notifications.value.system
    ],
    tasks: notifications.value.tasks,
    announcements: notifications.value.announcements,
    system: notifications.value.system,
  };

  return Object.keys(filtered).reduce((acc, key) => {
    acc[key] = filtered[key].filter(n => 
      n.title.toLowerCase().includes(query) || 
      n.content.toLowerCase().includes(query)
    );
    return acc;
  }, {});
});

const isNearExpiry = (expiryDate) => {
  const expiry = new Date(expiryDate.split('/').reverse().join('-'));
  const today = new Date();
  const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
};

const calculateTimeRemaining = (expiryDate) => {
  const expiry = new Date(expiryDate.split('/').reverse().join('-'));
  const today = new Date();
  const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'Expired';
  if (diffDays === 0) return 'Expires today';
  if (diffDays === 1) return '1 day remaining';
  return `${diffDays} days remaining`;
};

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
  { name: "Announcements", value: "announcements" },
  { name: "Tasks", value: "tasks" },
  { name: "System Alerts", value: "system" },
];
</script>

<template>
  <div class="flex h-[calc(100vh-100px)] gap-2">
    <!-- Sidebar -->
    <div class="w-1/4 bg-gray-100 p-4 flex flex-col">
      <h2 class="text-xl font-semibold mb-4">Notification Center</h2>
      
      <!-- Navigation Tabs -->
      <nav class="space-y-2 mb-4">
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

      <!-- Search Bar -->
      <div class="mb-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>

       <!-- Notification List -->
       <ul class="flex-1 overflow-y-auto">
        <li
          v-for="notification in filteredNotifications[activeTab]"
          :key="notification.id"
          class="p-4 mb-2 border rounded-md hover:bg-gray-100 bg-white relative group"
        >
          <!-- Add click handler to the content div to prevent click conflict with delete button -->
          <div @click="selectNotification(notification)" class="cursor-pointer">
            <h4 class="text-md font-semibold">{{ notification.title }}</h4>
            
            <!-- Different content display based on notification type -->
            <template v-if="notification.content?.project">
              <p class="text-sm text-gray-600">
                {{ notification.content.project.title }} - {{ notification.content.requester.name }}
              </p>
            </template>
            
            <template v-else-if="notification.document">
              <p class="text-sm text-gray-600">
                {{ notification.document }} - Expires: {{ notification.expiredDate }}
              </p>
            </template>
            
            <template v-else>
              <p class="text-sm text-gray-600">
                {{ notification.content.slice(0, 100) }}{{ notification.content.length > 100 ? '...' : '' }}
              </p>
            </template>

            <p class="text-xs text-gray-400">{{ new Date(notification.id).toLocaleString() }}</p>
          </div>

          <!-- Delete button -->
          <button
            @click="confirmDeleteNotification(activeTab, notification.id)"
            class="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Delete notification"
          >
            <Icon name="mdi:delete" class="w-5 h-5" />
          </button>
        </li>
      </ul>
    </div>


    <!-- Notification Details / Modal -->
    <div class="flex-1 p-4 bg-white overflow-y-auto">
      <div v-if="selectedNotification" class="flex-1 overflow-y-auto">
        <h3 class="text-xl font-semibold mb-4">{{ selectedNotification.title }}</h3>
        
          <!-- Tasks notification content -->
          <div v-if="selectedNotification.content?.project" class="space-y-2">       
              <!-- Request Details Card -->
              <div class="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex items-center mb-4">
                  <Icon name="mdi:file-document-outline" class="text-indigo-600 text-xl mr-2" />
                  <h4 class="text-lg font-semibold text-gray-800">Request Details</h4>
                </div>
                <div class="flex items-center bg-indigo-50 rounded-lg p-3">
                  <Icon name="mdi:identifier" class="text-indigo-600 mr-2" />
                  <p class="text-sm font-medium text-indigo-900">Request ID: {{ selectedNotification.content.request_id }}</p>
                </div>


                <div class="grid grid-cols-2 gap-6 mt-5">
                <!-- Project Information Card -->
                <div class="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div class="flex items-center mb-4">
                    <Icon name="mdi:office-building" class="text-indigo-600 text-xl mr-2" />
                    <h4 class="text-lg font-semibold text-gray-800">Project Information</h4>
                  </div>
                  <div class="grid gap-3">
                    <div class="flex items-center">
                      <Icon name="mdi:format-title" class="text-gray-500 w-5 mr-3" />
                      <span class="text-sm text-gray-600 w-24">Title:</span>
                      <span class="text-sm font-medium text-gray-800">{{ selectedNotification.content.project.title }}</span>
                    </div>
                    <div class="flex items-center">
                      <Icon name="mdi:bank" class="text-gray-500 w-5 mr-3" />
                      <span class="text-sm text-gray-600 w-24">Ministry:</span>
                      <span class="text-sm font-medium text-gray-800">{{ selectedNotification.content.project.ministry }}</span>
                    </div>
                    <div class="flex items-center">
                      <Icon name="mdi:key" class="text-gray-500 w-5 mr-3" />
                      <span class="text-sm text-gray-600 w-24">Access:</span>
                      <span class="text-sm font-medium text-gray-800">{{ selectedNotification.content.project.access }}</span>
                    </div>
                  </div>
                </div>
            
                <!-- Section Details Card -->
                <div class="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div class="flex items-center mb-4">
                    <Icon name="mdi:folder-information" class="text-indigo-600 text-xl mr-2" />
                    <h4 class="text-lg font-semibold text-gray-800">Section Details</h4>
                  </div>
                  <div class="grid gap-3">
                    <div class="flex items-center">
                      <Icon name="mdi:shape" class="text-gray-500 w-5 mr-3" />
                      <span class="text-sm text-gray-600 w-24">Category:</span>
                      <span class="text-sm font-medium text-gray-800">{{ selectedNotification.content.section.category }}</span>
                    </div>
                    <div class="flex items-center">
                      <Icon name="mdi:office-building" class="text-gray-500 w-5 mr-3" />
                      <span class="text-sm text-gray-600 w-24">Building:</span>
                      <span class="text-sm font-medium text-gray-800">{{ selectedNotification.content.section.building_category }}</span>
                    </div>
                    <div class="flex items-center">
                      <Icon name="mdi:file-document" class="text-gray-500 w-5 mr-3" />
                      <span class="text-sm text-gray-600 w-24">PAP:</span>
                      <span class="text-sm font-medium text-gray-800">{{ selectedNotification.content.section.pap }}</span>
                    </div>
                    <div class="flex items-center">
                      <Icon name="mdi:format-list-text" class="text-gray-500 w-5 mr-3" />
                      <span class="text-sm text-gray-600 w-24">Type:</span>
                      <span class="text-sm font-medium text-gray-800">{{ selectedNotification.content.section.type }}</span>
                    </div>
                    <div class="flex items-center">
                      <Icon name="mdi:account-hard-hat" class="text-gray-500 w-5 mr-3" />
                      <span class="text-sm text-gray-600 w-24">Discipline:</span>
                      <span class="text-sm font-medium text-gray-800">{{ selectedNotification.content.section.dicipline }}</span>
                    </div>
                  </div>
                </div>
                </div>

                <!-- Requester Information Card -->
                <div class="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow mt-5">
                  <div class="flex items-center mb-4">
                    <Icon name="mdi:account" class="text-indigo-600 text-xl mr-2" />
                    <h4 class="text-lg font-semibold text-gray-800">Requester Information</h4>
                  </div>
                  <div class="grid grid-cols-2 gap-3 px-10">
                    <div class="flex items-center">
                      <Icon name="mdi:account-details" class="text-gray-500 w-5 mr-3" />
                      <span class="text-sm text-gray-600 w-24">Name:</span>
                      <span class="text-sm font-medium text-gray-800">{{ selectedNotification.content.requester.name }}</span>
                    </div>
                    <div class="flex items-center">
                      <Icon name="mdi:card-account-details" class="text-gray-500 w-5 mr-3" />
                      <span class="text-sm text-gray-600 w-24">IC:</span>
                      <span class="text-sm font-medium text-gray-800">{{ selectedNotification.content.requester.ic }}</span>
                    </div>
                    <div class="flex items-center">
                      <Icon name="mdi:badge-account" class="text-gray-500 w-5 mr-3" />
                      <span class="text-sm text-gray-600 w-24">Grade:</span>
                      <span class="text-sm font-medium text-gray-800">{{ selectedNotification.content.requester.gred }}</span>
                    </div>
                    <div class="flex items-center">
                      <Icon name="mdi:email" class="text-gray-500 w-5 mr-3" />
                      <span class="text-sm text-gray-600 w-24">Email:</span>
                      <span class="text-sm font-medium text-gray-800">{{ selectedNotification.content.requester.emel }}</span>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
               <div class="mt-6 flex gap-3 justify-end">
                  <NuxtLink 
                    to="/repository/approval/senarai-pengesahan"
                    class="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Icon name="mdi:checkbox-marked-circle" class="mr-2" />
                    Proceed to Approval
                  </NuxtLink>
                </div>
              </div>
               

          </div>
          
          <!-- Announcements notification content -->
          <div v-if="selectedNotification.content && !selectedNotification.content?.project && !selectedNotification.document" 
               class="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
               <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <Icon name="mdi:bullhorn" class="text-indigo-600 text-xl mr-2" />
                <h4 class="text-lg font-semibold text-gray-800">Announcement</h4>
              </div>
              <a href="/support" class="inline-flex items-center text-indigo-600 hover:text-indigo-800">
                <Icon name="mdi:open-in-new" class="w-4 h-4 mr-1" />
                Visit Website
              </a>
            </div>
            
            
            <div class="bg-gray-50 rounded-lg p-6 mb-4 space-y-5">
              <img 
                src="~/assets/image/announcement_1.png" 
                alt="selectedNotification.title"
                class="w-full h-96 object-cover rounded-lg shadow-sm"
              />
              <p class="text-gray-700 leading-relaxed text-base font-light text-justify">{{ selectedNotification.content }}</p>
            </div>
          </div>

          <!-- System notification content -->
          <div v-if="selectedNotification.document" class="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <!-- Header -->
            <div class="flex items-center mb-6">
              <Icon name="mdi:alert-circle" class="text-amber-500 text-xl mr-2" />
              <h4 class="text-lg font-semibold text-gray-800">Document Expiration Alert</h4>
            </div>

            <!-- Alert Message -->
            <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div class="flex items-start">
                <Icon name="mdi:clock-alert" class="text-amber-600 text-xl mr-3 mt-1" />
                <p class="text-sm text-amber-800">{{ selectedNotification.content }}</p>
              </div>
            </div>

            <!-- Document Details Card -->
            <div class="bg-gray-50 rounded-lg p-6">
              <h4 class="font-medium mb-4 flex items-center">
                <Icon name="mdi:file-document-outline" class="text-indigo-600 mr-2" />
                Document Details
              </h4>
              
              <div class="grid gap-4">
                <!-- Document Name -->
                <div class="flex items-center">
                  <Icon name="mdi:file" class="text-gray-500 w-5 mr-3" />
                  <span class="text-sm text-gray-600 w-24">Document:</span>
                  <div class="flex items-center">
                    <span class="text-sm font-medium text-gray-800">{{ selectedNotification.document }}</span>
                    <button class="ml-2 text-indigo-600 hover:text-indigo-800">
                      <Icon name="mdi:download" class="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <!-- Expiry Date -->
                <div class="flex items-center">
                  <Icon name="mdi:calendar-clock" class="text-gray-500 w-5 mr-3" />
                  <span class="text-sm text-gray-600 w-24">Expires on:</span>
                  <span class="text-sm font-medium" :class="{
                    'text-red-600': isNearExpiry(selectedNotification.expiredDate),
                    'text-gray-800': !isNearExpiry(selectedNotification.expiredDate)
                  }">{{ selectedNotification.expiredDate }}</span>
                </div>

                <!-- Time Remaining -->
                <div class="flex items-center">
                  <Icon name="mdi:timer-sand" class="text-gray-500 w-5 mr-3" />
                  <span class="text-sm text-gray-600 w-24">Remaining:</span>
                  <span class="text-sm font-medium" :class="{
                    'text-red-600': isNearExpiry(selectedNotification.expiredDate),
                    'text-gray-800': !isNearExpiry(selectedNotification.expiredDate)
                  }">{{ calculateTimeRemaining(selectedNotification.expiredDate) }}</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="mt-6 flex gap-3">
                <NuxtLink 
                  to="/repository/document-tray"
                  class="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  <Icon name="mdi:refresh" class="mr-2" />
                  Take Action
                </NuxtLink>
                <Button class="flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                  <Icon name="mdi:eye" class="mr-2" />
                  View Document
                </Button>
              </div>
            </div>
          </div>

      </div>

        <div v-else class="flex-1 flex items-center justify-center">
          <p class="text-gray-600">Select a notification to view details</p>
        </div>
    </div>

  </div>

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
