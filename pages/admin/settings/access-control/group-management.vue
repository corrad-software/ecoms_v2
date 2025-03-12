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
  return settingsSection?.items[0]?.children || [];
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

const users = ref([
  { username: "900101-01-1234", role: "Owner", accessType: ["view", "edit", "download", "upload", "print", "delete"] },
  { username: "900202-02-2345", role: "User", accessType: ["view", "download"] },
  { username: "900303-03-3456", role: "Owner", accessType: ["view", "edit", "download", "upload", "print", "delete"] },
  { username: "900404-04-4567", role: "User", accessType: ["view", "download"] },
  { username: "900505-05-5678", role: "Owner", accessType: ["view", "edit", "download", "upload", "print", "delete"] },
  { username: "900606-06-6789", role: "User", accessType: ["view", "download"] },
]);

const newUser = ref({ username: "", role: "", accessType: [] });

const showAddUserModal = ref(false);

const openAddUserModal = () => {
  newUser.value = { username: "", role: "", accessType: [] };
  showAddUserModal.value = true;
};

const showDeleteUserModal = ref(false);
const userToDelete = ref(null);

const addUser = () => {
  if (newUser.value.username && newUser.value.role && newUser.value.accessType.length) {
    users.value.push({ ...newUser.value });
    if (selectedGroup.value !== null) {
      const group = groups.value.find(group => group.id === selectedGroup.value);
      if (group && !group.users.includes(newUser.value.username)) {
        group.users.push(newUser.value.username);
      }
    }
    newUser.value = { username: "", role: "", accessType: [] };
    showAddUserModal.value = false;
  }
};

const confirmDeleteUser = (username) => {
  userToDelete.value = username;
  showDeleteUserModal.value = true;
};

const deleteUser = () => {
  if (userToDelete.value !== null) {
    const userIndex = users.value.findIndex(user => user.username === userToDelete.value);
    if (userIndex !== -1) {
      users.value.splice(userIndex, 1);
    }
    const group = groups.value.find(group => group.id === selectedGroup.value);
    if (group) {
      group.users = group.users.filter(username => username !== userToDelete.value);
    }
    userToDelete.value = null;
    showDeleteUserModal.value = false;
  }
};

const showDeleteButtons = ref(false);

const toggleDeleteButtons = () => {
  showDeleteButtons.value = !showDeleteButtons.value;
};

const accessTypes = ["view", "edit", "download", "upload", "print", "delete"];

const groups = ref([
  { id: 1, name: "Kumpulan Kewangan", users: ["900101-01-1234", "900202-02-2345"], projectId: 1, disciplineId: 1 },
  { id: 2, name: "Kumpulan Ukuran Kejuruteraan", users: ["900303-03-3456", "900404-04-4567"], projectId: 2, disciplineId: 2 },
  { id: 3, name: "Kumpulan Pembangunan Teknologi Maklumat", users: ["900505-05-5678", "900606-06-6789"], projectId: 3, disciplineId: 3 },
  { id: 4, name: "Kumpulan Kewangan", users: ["900101-01-1234", "900202-02-2345"], projectId: 4, disciplineId: 4 },
  { id: 5, name: "Kumpulan Ukuran Kejuruteraan", users: ["900303-03-3456", "900404-04-4567"], projectId: 5, disciplineId: 5 },
  { id: 6, name: "Kumpulan Pembangunan Teknologi Maklumat", users: ["900505-05-5678", "900606-06-6789"], projectId: 6, disciplineId: 1 },
]);

const newGroup = ref({ name: "", users: [] });
const selectedGroupName = ref("");
const selectedGroup = ref("");

const showAddGroupModal = ref(false);
const showDeleteGroupModal = ref(false);
const groupToDelete = ref(null);

const openAddGroupModal = () => {
  newGroup.value = { name: "", users: [] };
  selectedGroupName.value = "";
  showAddGroupModal.value = true;
};

const addGroup = () => {
  if (selectedGroupName.value) {
    newGroup.value.name = selectedGroupName.value;
    groups.value.push({ ...newGroup.value, id: groups.value.length + 1 });
    newGroup.value = { name: "", users: [] };
    selectedGroupName.value = "";
    showAddGroupModal.value = false;
  }
};

const confirmDeleteGroup = (index) => {
  groupToDelete.value = index;
  showDeleteGroupModal.value = true;
};

const deleteGroup = () => {
  if (groupToDelete.value !== null) {
    groups.value.splice(groupToDelete.value, 1);
    groupToDelete.value = null;
    showDeleteGroupModal.value = false;
  }
};

const assignUserToGroup = (userId, groupId) => {
  const group = groups.value.find(group => group.id === groupId);
  if (group && !group.users.includes(userId)) {
    group.users.push(userId);
  }
};

const removeUserFromGroup = (userId, groupId) => {
  const group = groups.value.find(group => group.id === groupId);
  if (group) {
    group.users = group.users.filter(id => id !== userId);
  }
};

const filteredGroupUsers = computed(() => {
  const group = groups.value.find(group => group.id === selectedGroup.value);
  return group ? users.value.filter(user => group.users.includes(user.username)) : [];
});

const activeTab = ref("group");

</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Access Control Settings</h1>
      <p class="text-gray-600">
        Manage access control settings for multiple level of hiearchial structure.
      </p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Settings Content -->
      <div class="flex-1">
        <!-- Combined Settings Card -->
        <Card>
          <CardHeader>
            <CardTitle>Group Management</CardTitle>
            <CardDescription>Manage group and assign access for users</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs v-model="activeTab">
              <TabsList>
                <TabsTrigger value="group">Group </TabsTrigger>
                <TabsTrigger value="manageUsers">Access Control</TabsTrigger>
              </TabsList>
              <TabsContent value="group">
                <div class="space-y-8 mt-4">
                  <div class="flex justify-between items-center mb-2">
                    <h3 class="text-lg font-medium">Groups</h3>
                    <div class="flex space-x-2">
                      <Button @click="openAddGroupModal" class="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2">
                        <Icon name="mdi:plus"></Icon>
                      </Button>
                      <Button @click="toggleDeleteButtons" class="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2">
                        <Icon name="mdi:minus"></Icon>
                      </Button>
                    </div>
                  </div>

                  <div class="overflow-y-auto max-h-96">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
                          <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only"><Icon name="mdi:delete"></Icon></span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(group, index) in groups" :key="index">
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ group.name }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button v-if="showDeleteButtons" @click="confirmDeleteGroup(index)" variant="danger">
                              <Icon name="mdi:trash-can"></Icon>
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="manageUsers">
                <div class="space-y-8">
                  <div>
                    <label for="group" class="block text-sm font-medium text-gray-700">Select Group</label>
                    <select id="group" v-model="selectedGroup" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option disabled value="">Select a group</option>
                      <option v-for="group in groups" :key="group.id" :value="group.id">{{ group.name }}</option>
                    </select>
                  </div>

                  <!-- Users Table for Selected Group -->
                  <div v-if="selectedGroup">
                    <div class="flex justify-between items-center mb-2">
                      <h3 class="text-lg font-medium">Users in Group</h3>
                      <div class="flex gap-x-1">
                        <Button @click="openAddUserModal" class="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 "><Icon name="mdi:plus"></Icon></Button>
                        <Button @click="toggleDeleteButtons" class="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white  focus:outline-none focus:ring-2 focus:ring-offset-2"><Icon name="mdi:minus"></Icon></Button>
                      </div>
                    </div>
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username (NRIC)</th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access Type</th>
                          <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only"><Icon name ="mdi:delete"></Icon></span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(user, index) in filteredGroupUsers" :key="index">
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.username }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.role }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.accessType.join(', ') }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button v-if="showDeleteButtons" @click="confirmDeleteUser(user.username)" variant="danger"><Icon name="mdi:trash-can"></Icon></Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
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
            <input id="username" v-model="newUser.username" type="text" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" @input="newUser.username = newUser.username.replace(/\D/g, '')">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Role</label>
            <div class="mt-2 flex space-x-4">
              <div class="flex items-center">
                <input type="radio" id="owner" value="Owner" v-model="newUser.role" class="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                <label for="owner" class="ml-2 block text-sm text-gray-700">Owner</label>
              </div>
              <div class="flex items-center">
                <input type="radio" id="user" value="User" v-model="newUser.role" class="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                <label for="user" class="ml-2 block text-sm text-gray-700">User</label>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Access Type</label>
            <div class="mt-2 flex flex-wrap space-x-4">
              <div v-for="type in accessTypes" :key="type" class="flex items-center">
                <input type="checkbox" :value="type" v-model="newUser.accessType" class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                <label :for="type" class="ml-2 block text-sm text-gray-700">{{ type }}</label>
              </div>
            </div>
          </div>
          <!-- Hide Cabinet, Project, and Discipline dropdowns -->
          <div v-if="false">
            <label for="cabinetId" class="block text-sm font-medium text-gray-700">Cabinet</label>
            <select id="cabinetId" v-model="newUser.cabinetId" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option disabled value="">Select a Cabinet</option>
              <option v-for="cabinet in cabinets" :key="cabinet.id" :value="cabinet.id">{{ cabinet.name }}</option>
            </select>
          </div>
          <div v-if="false">
            <label for="projectId" class="block text-sm font-medium text-gray-700">Project</label>
            <select id="projectId" v-model="newUser.projectId" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option disabled value="">Select a Project</option>
              <option v-for="project in projects[selectedCabinet]" :key="project.id" :value="project.id">{{ project.name }}</option>
            </select>
          </div>
          <div v-if="false" class="mb-4">
            <label for="disciplineId" class="block text-sm font-medium text-gray-700">Discipline</label>
            <select id="disciplineId" v-model="newUser.disciplineId" class="mt-1 mb-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option disabled value="">Select a Discipline</option>
              <option v-for="discipline in disciplines" :key="discipline.id" :value="discipline.id">{{ discipline.name }}</option>
            </select>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button @click="addUser" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add User</Button>
        <Button @click="showAddUserModal = false" class=" mt-4 ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</Button>
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

    <!-- Add Group Modal -->
    <Modal v-model:open="showAddGroupModal">
      <ModalHeader>
        <ModalTitle>Add Group</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div class="space-y-4">
          <div>
            <label for="groupName" class="block text-sm font-medium text-gray-700">Group Name</label>
            <select id="groupName" v-model="selectedGroupName" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option disabled value="">Select a Group</option>
              <option v-for="group in groups" :key="group.id" :value="group.name">{{ group.name }}</option>
            </select>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button @click="addGroup" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Group</Button>
        <Button @click="showAddGroupModal = false" class="mt-4 ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</Button>
      </ModalFooter>
    </Modal>

    <!-- Delete Group Confirmation Modal -->
    <Modal v-model:open="showDeleteGroupModal">
      <ModalHeader>
        <ModalTitle>Confirm Delete</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>Are you sure you want to delete this group?</p>
      </ModalBody>
      <ModalFooter>
        <Button @click="deleteGroup" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</Button>
        <Button @click="showDeleteGroupModal = false" class="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</Button>
      </ModalFooter>
    </Modal>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply text-foreground font-medium;
}
</style>
