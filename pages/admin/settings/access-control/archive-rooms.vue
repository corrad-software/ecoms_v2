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

const cabinets = ref([
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
    cabinets.value.push({ ...newUser.value });
    if (selectedRoom.value !== null) {
      const room = rooms.value.find(room => room.id === selectedRoom.value);
      if (room && !room.cabinets.includes(newUser.value.username)) {
        room.cabinets.push(newUser.value.username);
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
    const userIndex = cabinets.value.findIndex(user => user.username === userToDelete.value);
    if (userIndex !== -1) {
      cabinets.value.splice(userIndex, 1);
    }
    const room = rooms.value.find(room => room.id === selectedRoom.value);
    if (room) {
      room.cabinets = room.cabinets.filter(username => username !== userToDelete.value);
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

const rooms = ref([
  { id: 1, name: "JKR Cawangan Tebedu, Sarawak", cabinets: [4, 5, 6] },
  { id: 2, name: "JKR Cawangan Batu Kawan, Penang", cabinets: [1, 2, 3] },
  { id: 3, name: "JKR Cawangan Kota Bharu, Kelantan", cabinets: [7, 8, 9] },
  { id: 4, name: "JKR Cawangan Kuala Terengganu, Terengganu", cabinets: [10, 11, 12] },
  { id: 5, name: "JKR Cawangan Ipoh, Perak", cabinets: [13, 14, 15] },
]);

const newRoom = ref({ name: "", cabinets: [] });
const selectedRoom = ref("");

const showAddRoomModal = ref(false);
const showDeleteRoomModal = ref(false);
const roomToDelete = ref(null);

const openAddRoomModal = () => {
  newRoom.value = { name: "", cabinets: [] };
  showAddRoomModal.value = true;
};

const addRoom = () => {
  if (newRoom.value.name) {
    rooms.value.push({ ...newRoom.value, id: rooms.value.length + 1 });
    newRoom.value = { name: "", cabinets: [] };
    showAddRoomModal.value = false;
  }
};

const confirmDeleteRoom = (index) => {
  roomToDelete.value = index;
  showDeleteRoomModal.value = true;
};

const deleteRoom = () => {
  if (roomToDelete.value !== null) {
    rooms.value.splice(roomToDelete.value, 1);
    roomToDelete.value = null;
    showDeleteRoomModal.value = false;
  }
};

const assignCabinetToRoom = (cabinetId, roomId) => {
  const room = rooms.value.find(room => room.id === roomId);
  if (room && !room.cabinets.includes(cabinetId)) {
    room.cabinets.push(cabinetId);
  }
};

const removeCabinetFromRoom = (cabinetId, roomId) => {
  const room = rooms.value.find(room => room.id === roomId);
  if (room) {
    room.cabinets = room.cabinets.filter(id => id !== cabinetId);
  }
};

const filteredRoomCabinets = computed(() => {
  const room = rooms.value.find(room => room.id === selectedRoom.value);
  return room ? cabinets.value.filter(cabinet => room.cabinets.includes(cabinet.id)) : [];
});

const activeTab = ref("room");

const newCabinet = ref({ id: null, name: "", accessType: [] });

const showAddCabinetModal = ref(false);

const openAddCabinetModal = () => {
  newCabinet.value = { id: null, name: "", accessType: [] };
  showAddCabinetModal.value = true;
};

const addCabinet = () => {
  if (newCabinet.value.id && newCabinet.value.name && newCabinet.value.accessType.length) {
    cabinets.value.push({ ...newCabinet.value });
    if (selectedRoom.value !== null) {
      const room = rooms.value.find(room => room.id === selectedRoom.value);
      if (room && !room.cabinets.includes(newCabinet.value.id)) {
        room.cabinets.push(newCabinet.value.id);
      }
    }
    newCabinet.value = { id: null, name: "", accessType: [] };
    showAddCabinetModal.value = false;
  }
};

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
      <!-- Settings Sidebar -->
      <div class="lg:w-56">
        <nav class="flex flex-col space-y-1">
          <NuxtLink
            v-for="item in settingsNavigation"
            :key="item.name"
            :to="item.path"
            class="flex items-center gap-3 px-3 py-2 rounded-md transition-colors relative"
            :class="[isActiveRoute(item.path) ? 'bg-accent text-foreground font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50']"
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
            <CardTitle>Room Management</CardTitle>
            <CardDescription>Manage rooms and assign cabinets</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs v-model="activeTab">
              <TabsList>
                <TabsTrigger value="room">Room</TabsTrigger>
                <TabsTrigger value="manageCabinets">Access Control</TabsTrigger>
              </TabsList>
              <TabsContent value="room">
                <div class="space-y-8 mt-4">
                  <div class="flex justify-between items-center mb-2">
                    <h3 class="text-lg font-medium">Rooms</h3>
                    <div class="flex space-x-2">
                      <Button @click="openAddRoomModal" class="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2">
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
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Name</th>
                          <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only"><Icon name="mdi:delete"></Icon></span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(room, index) in rooms" :key="index">
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ room.name }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button v-if="showDeleteButtons" @click="confirmDeleteRoom(index)" variant="danger">
                              <Icon name="mdi:trash-can"></Icon>
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="manageCabinets">
                <div class="space-y-8">
                  <div>
                    <label for="room" class="block text-sm font-medium text-gray-700">Select Room</label>
                    <select id="room" v-model="selectedRoom" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option disabled value="">Select a room</option>
                      <option v-for="room in rooms" :key="room.id" :value="room.id">{{ room.name }}</option>
                    </select>
                  </div>

                  <!-- Cabinets Table for Selected Room -->
                  <div v-if="selectedRoom">
                    <div class="flex justify-between items-center mb-2">
                      <h3 class="text-lg font-medium">Cabinets in Room</h3>
                      <div class="flex gap-x-1">
                        <Button @click="openAddCabinetModal" class="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2">
                          <Icon name="mdi:plus"></Icon>
                        </Button>
                        <Button @click="toggleDeleteButtons" class="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white  focus:outline-none focus:ring-2 focus:ring-offset-2"><Icon name="mdi:minus"></Icon></Button>
                      </div>
                    </div>
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cabinet Name</th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access Type</th>
                          <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only"><Icon name ="mdi:delete"></Icon></span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(cabinet, index) in filteredRoomCabinets" :key="index">
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ cabinet.name }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ cabinet.accessType.join(', ') }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button v-if="showDeleteButtons" @click="confirmDeleteUser(cabinet.username)" variant="danger"><Icon name="mdi:trash-can"></Icon></Button>
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

    <!-- Add Cabinet Modal -->
    <Modal v-model:open="showAddCabinetModal">
      <ModalHeader>
        <ModalTitle>Add Cabinet</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div class="space-y-4">
          <div>
            <label for="cabinetId" class="block text-sm font-medium text-gray-700">Cabinet</label>
            <select id="cabinetId" v-model="newCabinet.id" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option disabled value="">Select a Cabinet</option>
              <option v-for="cabinet in cabinets" :key="cabinet.id" :value="cabinet.id">{{ cabinet.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Access Type</label>
            <div class="mt-2 flex flex-wrap space-x-4">
              <div v-for="type in accessTypes" :key="type" class="flex items-center">
                <input type="checkbox" :value="type" v-model="newCabinet.accessType" class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                <label :for="type" class="ml-2 block text-sm text-gray-700">{{ type }}</label>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button @click="addCabinet" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Cabinet</Button>
        <Button @click="showAddCabinetModal = false" class="mt-4 ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</Button>
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

    <!-- Add Room Modal -->
    <Modal v-model:open="showAddRoomModal">
      <ModalHeader>
        <ModalTitle>Add Room</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div class="space-y-4">
          <div>
            <label for="roomName" class="block text-sm font-medium text-gray-700">Room Name</label>
            <input id="roomName" v-model="newRoom.name" type="text" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button @click="addRoom" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Room</Button>
        <Button @click="showAddRoomModal = false" class="mt-4 ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</Button>
      </ModalFooter>
    </Modal>

    <!-- Delete Room Confirmation Modal -->
    <Modal v-model:open="showDeleteRoomModal">
      <ModalHeader>
        <ModalTitle>Confirm Delete</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>Are you sure you want to delete this room?</p>
      </ModalBody>
      <ModalFooter>
        <Button @click="deleteRoom" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</Button>
        <Button @click="showDeleteRoomModal = false" class="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</Button>
      </ModalFooter>
    </Modal>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply text-foreground font-medium;
}
</style>
