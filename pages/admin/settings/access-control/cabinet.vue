<script setup>
definePageMeta({
  layout: "admin",
  title: "Drawer Management",
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



const drawers = ref([
  { id: 1, name: "JKR Bahagian Kewangan Cawangan Batu Kawan", role: "Owner", accessType: ["view", "edit", "download", "upload", "print", "delete"] },
  { id: 2, name: "JKR Bahagian Kejuruteraan Awam Cawangan Batu Kawan", role: "User", accessType: ["view", "download"] },
  { id: 3, name: "JKR Bahagian Teknologi Maklumat Cawangan Batu Kawan", role: "Owner", accessType: ["view", "edit", "download", "upload", "print", "delete"] },
  { id: 4, name: "JKR Bahagian Kewangan Cawangan Tebedu", role: "Owner", accessType: ["view", "edit", "download", "upload", "print", "delete"] },
  { id: 5, name: "JKR Bahagian Kejuruteraan Awam Cawangan Tebedu", role: "User", accessType: ["view", "download"] },
  { id: 6, name: "JKR Bahagian Teknologi Maklumat Cawangan Tebedu", role: "Owner", accessType: ["view", "edit", "download", "upload", "print", "delete"] },
  { id: 7, name: "JKR Bahagian Kewangan Cawangan Kota Bharu", role: "Owner", accessType: ["view", "edit", "download", "upload", "print", "delete"] },
  { id: 8, name: "JKR Bahagian Kejuruteraan Awam Cawangan Kota Bharu", role: "User", accessType: ["view", "download"] },
  { id: 9, name: "JKR Bahagian Teknologi Maklumat Cawangan Kota Bharu", role: "Owner", accessType: ["view", "edit", "download", "upload", "print", "delete"] },
  { id: 10, name: "JKR Bahagian Kewangan Cawangan Kuala Terengganu", role: "Owner", accessType: ["view", "edit", "download", "upload", "print", "delete"] },
  { id: 11, name: "JKR Bahagian Kejuruteraan Awam Cawangan Kuala Terengganu", role: "User", accessType: ["view", "download"] },
  { id: 12, name: "JKR Bahagian Teknologi Maklumat Cawangan Kuala Terengganu", role: "Owner", accessType: ["view", "edit", "download", "upload", "print", "delete"] },
  { id: 13, name: "JKR Bahagian Kewangan Cawangan Ipoh", role: "Owner", accessType: ["view", "edit", "download", "upload", "print", "delete"] },
  { id: 14, name: "JKR Bahagian Kejuruteraan Awam Cawangan Ipoh", role: "User", accessType: ["view", "download"] },
  { id: 15, name: "JKR Bahagian Teknologi Maklumat Cawangan Ipoh", role: "Owner", accessType: ["view", "edit", "download", "upload", "print", "delete"] },
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
    drawers.value.push({ ...newUser.value });
    if (selectedCabinet.value !== null) {
      const cabinet = cabinets.value.find(cabinet => cabinet.id === selectedCabinet.value);
      if (cabinet && !cabinet.drawers.includes(newUser.value.username)) {
        cabinet.drawers.push(newUser.value.username);
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
    const userIndex = drawers.value.findIndex(user => user.username === userToDelete.value);
    if (userIndex !== -1) {
      drawers.value.splice(userIndex, 1);
    }
    const cabinet = cabinets.value.find(cabinet => cabinet.id === selectedCabinet.value);
    if (cabinet) {
      cabinet.drawers = cabinet.drawers.filter(username => username !== userToDelete.value);
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

const cabinets = ref([
  { id: 1, name: "JKR Cawangan Tebedu, Sarawak", drawers: [4, 5, 6] },
  { id: 2, name: "JKR Cawangan Batu Kawan, Penang", drawers: [1, 2, 3] },
  { id: 3, name: "JKR Cawangan Kota Bharu, Kelantan", drawers: [7, 8, 9] },
  { id: 4, name: "JKR Cawangan Kuala Terengganu, Terengganu", drawers: [10, 11, 12] },
  { id: 5, name: "JKR Cawangan Ipoh, Perak", drawers: [13, 14, 15] },
]);

const newCabinet = ref({ name: "", drawers: [] });
const selectedCabinet = ref("");

const showAddCabinetModal = ref(false);

const showDeleteCabinetModal = ref(false);
const deleteCabinetName = ref("");
const cabinetToDelete = ref({ name: "" });
const errorMessage = ref("");

const openAddCabinetModal = () => {
  newCabinet.value = { name: "", drawers: [] };
  showAddCabinetModal.value = true;
};

const addCabinet = () => {
  if (newCabinet.value.name) {
    cabinets.value.push({ ...newCabinet.value, id: cabinets.value.length + 1 });
    newCabinet.value = { name: "", drawers: [] };
    showAddCabinetModal.value = false;
  }
};

const confirmDeleteCabinet = (index, cabinetName) => {
  // cabinetToDelete.value = index;
  // showDeleteCabinetModal.value = true;
  console.log('cabinetName is ',cabinetName)
  errorMessage.value = "";
  cabinetToDelete.value = { name: cabinetName };
  showDeleteCabinetModal.value = true;
  deleteCabinetName.value = ""; 
};

const deleteCabinet = () => {
  // if (cabinetToDelete.value !== null) {
  //   cabinets.value.splice(cabinetToDelete.value, 1);
  //   cabinetToDelete.value = null;
  //   showDeleteCabinetModal.value = false;
  // }

  if (deleteCabinetName.value.trim() === cabinetToDelete.value.name) {
    const { index } = cabinetToDelete.value;
    cabinets.value.splice(index, 1); // Remove the drawer
    cabinetToDelete.value = { name: "" }; // Reset
    deleteCabinetName.value = ""; // Clear input
    showDeleteCabinetModal.value = false; // Close modal
  } else {
    errorMessage.value = "You need to fill the cabinet name for deletion.";
  }
};

const assignDrawerToCabinet = (drawerId, cabinetId) => {
  const cabinet = cabinets.value.find(cabinet => cabinet.id === cabinetId);
  if (cabinet && !cabinet.drawers.includes(drawerId)) {
    cabinet.drawers.push(drawerId);
  }
};

const removeDrawerFromCabinet = (drawerId, cabinetId) => {
  const cabinet = cabinets.value.find(cabinet => cabinet.id === cabinetId);
  if (cabinet) {
    cabinet.drawers = cabinet.drawers.filter(id => id !== drawerId);
  }
};

const filteredCabinetDrawers = computed(() => {
  const cabinet = cabinets.value.find(cabinet => cabinet.id === selectedCabinet.value);
  return cabinet ? drawers.value.filter(drawer => cabinet.drawers.includes(drawer.id)) : [];
});

const activeTab = ref("cabinet");

const newDrawer = ref({ id: null, name: "", accessType: [] });

const showAddDrawerModal = ref(false);

const openAddDrawerModal = () => {
  newDrawer.value = { id: null, name: "", accessType: [] };
  showAddDrawerModal.value = true;
};

const addDrawer = () => {
  if (newDrawer.value.id && newDrawer.value.name && newDrawer.value.accessType.length) {
    drawers.value.push({ ...newDrawer.value });
    if (selectedCabinet.value !== null) {
      const cabinet = cabinets.value.find(cabinet => cabinet.id === selectedCabinet.value);
      if (cabinet && !cabinet.drawers.includes(newDrawer.value.id)) {
        cabinet.drawers.push(newDrawer.value.id);
      }
    }
    newDrawer.value = { id: null, name: "", accessType: [] };
    showAddDrawerModal.value = false;
  }
};

</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">General Settings</h1>
      <p class="text-gray-600">
        Manage settings for multiple level of hiearchial structure.
      </p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">

      <!-- Settings Content -->
      <div class="flex-1">
        <!-- Combined Settings Card -->
        <Card>
          <CardHeader>
            <CardTitle>Cabinet Management</CardTitle>
            <CardDescription>Manage cabinets and assign drawers</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs v-model="activeTab">
              <TabsList>
                <TabsTrigger value="cabinet">Cabinet</TabsTrigger>
                <TabsTrigger value="manageDrawers">Access Control</TabsTrigger>
              </TabsList>
              <TabsContent value="cabinet">
                <div class="space-y-8 mt-4">
                  <div class="flex justify-between items-center mb-2">
                    <h3 class="text-lg font-medium">Cabinets</h3>
                    <div class="flex space-x-2">
                      <Button @click="openAddCabinetModal" class="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2">
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
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cabinet Name</th>
                          <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only"><Icon name="mdi:delete"></Icon></span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(cabinet, index) in cabinets" :key="index">
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ cabinet.name }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button v-if="showDeleteButtons" @click="confirmDeleteCabinet(index, cabinet.name)" variant="danger">
                              <Icon name="mdi:trash-can"></Icon>
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="manageDrawers">
                <div class="space-y-8">
                  <div>
                    <label for="cabinet" class="block text-sm font-medium text-gray-700">Select Cabinet</label>
                    <select id="cabinet" v-model="selectedCabinet" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option disabled value="">Select a cabinet</option>
                      <option v-for="cabinet in cabinets" :key="cabinet.id" :value="cabinet.id">{{ cabinet.name }}</option>
                    </select>
                  </div>

                  <!-- Drawers Table for Selected Cabinet -->
                  <div v-if="selectedCabinet">
                    <div class="flex justify-between items-center mb-2">
                      <h3 class="text-lg font-medium">Drawers in Cabinet</h3>
                      <div class="flex gap-x-1">
                        <Button @click="openAddDrawerModal" class="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2">
                          <Icon name="mdi:plus"></Icon>
                        </Button>
                        <Button @click="toggleDeleteButtons" class="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white  focus:outline-none focus:ring-2 focus:ring-offset-2"><Icon name="mdi:minus"></Icon></Button>
                      </div>
                    </div>
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drawer Name</th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access Type</th>
                          <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only"><Icon name ="mdi:delete"></Icon></span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(drawer, index) in filteredCabinetDrawers" :key="index">
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ drawer.name }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ drawer.accessType.join(', ') }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button v-if="showDeleteButtons" @click="confirmDeleteUser(drawer.username)" variant="danger"><Icon name="mdi:trash-can"></Icon></Button>
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

    <!-- Add Drawer Modal -->
    <Modal v-model:open="showAddDrawerModal">
      <ModalHeader>
        <ModalTitle>Add Drawer</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div class="space-y-4">
          <div>
            <label for="drawerId" class="block text-sm font-medium text-gray-700">Drawer</label>
            <select id="drawerId" v-model="newDrawer.id" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option disabled value="">Select a Drawer</option>
              <option v-for="drawer in drawers" :key="drawer.id" :value="drawer.id">{{ drawer.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Access Type</label>
            <div class="mt-2 flex flex-wrap space-x-4">
              <div v-for="type in accessTypes" :key="type" class="flex items-center">
                <input type="checkbox" :value="type" v-model="newDrawer.accessType" class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                <label :for="type" class="ml-2 block text-sm text-gray-700">{{ type }}</label>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button @click="addDrawer" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Drawer</Button>
        <Button @click="showAddDrawerModal = false" class="mt-4 ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</Button>
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

    <!-- Add Cabinet Modal -->
    <Modal v-model:open="showAddCabinetModal">
      <ModalHeader>
        <ModalTitle>Add Cabinet</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div class="space-y-4">
          <div>
            <label for="cabinetName" class="block text-sm font-medium text-gray-700">Cabinet Name</label>
            <input id="cabinetName" v-model="newCabinet.name" type="text" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button @click="addCabinet" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Cabinet</Button>
        <Button @click="showAddCabinetModal = false" class="mt-4 ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</Button>
      </ModalFooter>
    </Modal>

    <!-- Delete Cabinet Confirmation Modal -->
    <Modal v-model:open="showDeleteCabinetModal">
      <ModalHeader>
        <ModalTitle>Confirm Delete</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>Please enter the cabinet name to delete?</p>
        <input
          id="deleteCabinetName"
          v-model="deleteCabinetName"
          type="text"
          class="mt-1 mb-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
          :placeholder="`'${cabinetToDelete.name}'`"
        />
        <p v-if="errorMessage" class="text-red-500 text-sm mt-1">{{ errorMessage }}</p>
      </ModalBody>
      <ModalFooter>
        <Button @click="deleteCabinet" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</Button>
        <Button @click="showDeleteCabinetModal = false" class="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</Button>
      </ModalFooter>
    </Modal>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply text-foreground font-medium;
}
</style>
