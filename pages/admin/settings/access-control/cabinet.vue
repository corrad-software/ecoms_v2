<script setup>
definePageMeta({
  layout: "admin",
  title: "Cabinet Access Control",
});

const layoutStore = useLayoutStore();
const { getAdminNavigation } = useNavigation();

// Get settings navigation items
const settingsNavigation = computed(() => {
  const adminNav = getAdminNavigation();
  const settingsSection = adminNav.find(
    (section) => section.title === "Settings"
  );
  // Return the second item in the settings section
  return settingsSection?.items[1]?.children || [];
});

// Set active state for current route
const route = useRoute();
const isActiveRoute = (path) => route.path === path;

// Font options
const fonts = [
  { value: "inter", label: "Inter" },
  { value: "roboto", label: "Roboto" },
  { value: "poppins", label: "Poppins" },
];

const selectedFont = ref("inter");

// Theme handling
const { currentTheme, setTheme } = useTheme();
const selectedTheme = computed({
  get: () => currentTheme.value === "dark",
  set: (value) => {
    setTheme(value ? "dark" : "default");
  },
});

const handleThemeChange = (isDark) => {
  selectedTheme.value = isDark;
};

const updatePreferences = () => {
  // Update font and theme preferences
  setTheme(selectedTheme.value ? "dark" : "default");
  // You might want to add font updating logic here

  // Show success toast
  const toast = useToast();
  toast.add({
    title: "Preferences Updated",
    description: "Your theme settings have been saved successfully.",
    type: "success",
  });
};

const layoutOptions = [
  {
    id: "vertical",
    title: "Vertical Menu",
    description: "Traditional vertical sidebar navigation",
    icon: "mdi:view-split-vertical",
    preview: "/images/layouts/vertical.svg",
  },
  {
    id: "horizontal",
    title: "Horizontal Menu",
    description: "Modern horizontal top navigation",
    icon: "mdi:view-split-horizontal",
    preview: "/images/layouts/horizontal.svg",
  },
];

const directionOptions = [
  {
    id: "ltr",
    title: "Left to Right (LTR)",
    description: "Default layout direction",
    icon: "mdi:format-horizontal-align-left",
  },
  {
    id: "rtl",
    title: "Right to Left (RTL)",
    description: "For RTL languages support",
    icon: "mdi:format-horizontal-align-right",
  },
];

const handleLayoutChange = (layoutId) => {
  if (layoutStore.sidebarLayout !== layoutId) {
    layoutStore.toggleSidebarLayout();
  }
};

const handleDirectionChange = () => {
  layoutStore.toggleDirection();
};

const cabinets = ref([
  { id: 1, name: "Cabinet 1" },
  { id: 2, name: "Cabinet 2" },
  { id: 3, name: "Cabinet 3" },
]);

const selectedCabinet = ref(cabinets.value[0].id);

const users = ref({
  1: [
    { username: "900101-01-1234", role: "Admin", accessType: "Full" },
    { username: "900202-02-2345", role: "User", accessType: "Read" },
  ],
  2: [
    { username: "900303-03-3456", role: "Admin", accessType: "Full" },
    { username: "900404-04-4567", role: "User", accessType: "Read" },
  ],
  3: [
    { username: "900505-05-5678", role: "Admin", accessType: "Full" },
    { username: "900606-06-6789", role: "User", accessType: "Read" },
  ],
});

const newUser = ref({ username: "", role: "", accessType: "" });

const showAddUserModal = ref(false);
const showDeleteUserModal = ref(false);
const userToDelete = ref(null);

const addUser = () => {
  if (newUser.value.username && newUser.value.role && newUser.value.accessType) {
    users.value[selectedCabinet.value].push({ ...newUser.value });
    newUser.value = { username: "", role: "", accessType: "" };
    showAddUserModal.value = false;
  }
};

const confirmDeleteUser = (index) => {
  userToDelete.value = index;
  showDeleteUserModal.value = true;
};

const deleteUser = () => {
  if (userToDelete.value !== null) {
    users.value[selectedCabinet.value].splice(userToDelete.value, 1);
    userToDelete.value = null;
    showDeleteUserModal.value = false;
  }
};
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Cabinet Access Control</h1>
      <p class="text-gray-600">
        Manage access control settings for your cabinets
      </p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Settings Sidebar -->
      <div class="lg:w-56">
        <nav class="flex flex-col space-y-1">
          <NuxtLink
            v-for="item in settingsNavigation"
            :key="item.name"
            :to="item.path"
            class="flex items-center gap-3 px-3 py-2 rounded-md transition-colors relative"
            :class="[
              isActiveRoute(item.path)
                ? 'bg-accent text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
            ]"
          >
            <div class="flex items-center gap-3 flex-1">
              <Icon :name="item.icon" class="w-4 h-4" />
              {{ item.name }}
            </div>
          </NuxtLink>
        </nav>
      </div>

      <!-- Settings Content -->
      <div class="flex-1">
        <!-- Combined Settings Card -->
        <Card>
          <CardHeader>
            <CardTitle>Cabinet Access Control</CardTitle>
            <CardDescription>Manage access control settings for your cabinets</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-8">
              <!-- Cabinet Dropdown -->
              <div>
                <label for="cabinet" class="block text-sm font-medium text-gray-700">Select Cabinet</label>
                <select id="cabinet" v-model="selectedCabinet" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option v-for="cabinet in cabinets" :key="cabinet.id" :value="cabinet.id">{{ cabinet.name }}</option>
                </select>
              </div>

              <!-- Users Table -->
              <div>
                <h3 class="text-lg font-medium mb-2">Users</h3>
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username (NRIC)</th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access Type</th>
                      <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(user, index) in users[selectedCabinet]" :key="index">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.username }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.role }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.accessType }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button @click="confirmDeleteUser(index)" variant="danger" >Delete</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Add User Button -->
              <div>
                <Button @click="showAddUserModal = true" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add User</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button @click="updatePreferences">Update preferences</Button>
          </CardFooter>
        </Card>
      </div>
    </div>

    <!-- Add User Modal -->
    <Modal v-model:open="showAddUserModal">
      <ModalHeader>
        <ModalTitle>Add User</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">Username (NRIC)</label>
            <input id="username" v-model="newUser.username" type="text" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          </div>
          <div>
            <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
            <input id="role" v-model="newUser.role" type="text" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          </div>
          <div>
            <label for="accessType" class="block text-sm font-medium text-gray-700">Access Type</label>
            <input id="accessType" v-model="newUser.accessType" type="text" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button @click="addUser" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add User</Button>
        <Button @click="showAddUserModal = false" class="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</Button>
      </ModalFooter>
    </Modal>

    <!-- Delete User Confirmation Modal -->
    <Modal v-model:open="showDeleteUserModal">
      <ModalHeader>
        <ModalTitle>Confirm Delete</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>Are you sure you want to delete this user?</p>
      </ModalBody>
      <ModalFooter>
        <Button @click="deleteUser" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</Button>
        <Button @click="showDeleteUserModal = false" class="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</Button>
      </ModalFooter>
    </Modal>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply text-foreground font-medium;
}
</style>
