<script setup>
definePageMeta({
  layout: "admin",
  title: "About System",
});

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

// System information
const systemInfo = {
  name: "JKR ECOMS v2.0",
  version: "1.0.0",
  releaseDate: "March 06, 2025",
  lastUpdated: "March 06, 2025",
  developer: "Datascience Sdn Bhd",
  supportEmail: "support@datascience.com.my",
  supportPhone: "+60 3-1234 5678"
};


// System requirements
const systemRequirements = {
  browser: ["Chrome 88+", "Firefox 85+", "Safari 14+", "Edge 88+"],
  resolution: "Minimum 1366 x 768",
  internet: "Broadband connection (minimum 1Mbps)",
  devices: "Desktop, Laptop, Tablet, Mobile Phone"
};

// Release notes
const releaseNotes = [
  {
    version: "1.0.0",
    date: "January 15, 2023",
    notes: [
      "Initial system release",
      "Core claiming functionality",
      "User management and access control",
      "Basic reporting features"
    ]
  },
  {
    version: "1.0.1",
    date: "March 22, 2023",
    notes: [
      "Bug fixes for approval workflow",
      "Improved document upload performance",
      "Enhanced search functionality"
    ]
  },
  {
    version: "1.0.2",
    date: "June 10, 2023",
    notes: [
      "Added export to Excel feature",
      "Implemented batch processing for claims",
      "UI/UX improvements for mobile devices",
      "Performance optimizations"
    ]
  }
];

// Contact information
const contactInfo = {
  support: {
    email: "support@datascience.com.my",
    phone: "+60 3-1234 5678",
    hours: "Monday to Friday, 9:00 AM - 5:00 PM MYT"
  },
  office: {
    address: "Level 15, Menara JKR, Jalan Sultan Ismail, 50250 Kuala Lumpur, Malaysia",
    phone: "+60 3-8765 4321",
    fax: "+60 3-8765 4322"
  }
};

// Active tab
const activeTab = ref("about");

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
      <h1 class="text-2xl font-semibold">About System</h1>
      <p class="text-gray-600">
        Information about the JKR Claims Management System, features, and support
      </p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">

      <!-- Settings Content -->
      <div class="flex-1">
        <!-- About System Card -->
        <Card>
          <CardHeader>
            <CardTitle>{{ systemInfo.name }}</CardTitle>
            <CardDescription>Version {{ systemInfo.version }} - Last Updated: {{ systemInfo.lastUpdated }}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs v-model="activeTab">
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="releaseNotes">Release Notes</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>
              
              <!-- About Tab -->
              <TabsContent value="about">
                <div class="space-y-6 mt-4">
                  <div class="flex flex-col md:flex-row gap-6 items-center">
                    <div class="md:w-1/3 flex justify-center">
                      <img src="\assets\image\jkr_logo.png" alt="JKR Logo" class="h-48 object-contain" />
                    </div>
                    <div class="md:w-2/3">
                      <h3 class="text-xl font-medium mb-3">JKR Claims Management System</h3>
                      <p class="text-gray-700 mb-4">
                        The JKR Claims Management System is a comprehensive solution designed specifically for Jabatan Kerja Raya Malaysia to streamline and automate the claims processing workflow across all departments and branches nationwide.
                      </p>
                      <p class="text-gray-700 mb-4">
                        This system enables efficient management of financial claims, approval processes, and document handling while maintaining strict access controls and audit trails for compliance and transparency.
                      </p>
                      <div class="grid grid-cols-2 gap-4 mt-6">
                        <div>
                          <p class="text-sm text-gray-500">Developed by</p>
                          <p class="font-medium">{{ systemInfo.developer }}</p>
                        </div>
                        <div>
                          <p class="text-sm text-gray-500">Initial Release</p>
                          <p class="font-medium">{{ systemInfo.releaseDate }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>            
           <!-- Requirements Tab -->
              <TabsContent value="requirements">
                <div class="space-y-6 mt-4">
                  <div class="bg-muted/50 rounded-lg p-6">
                    <h3 class="text-lg font-medium mb-4">System Requirements</h3>
                    
                    <div class="space-y-4">
                      <div>
                        <h4 class="font-medium flex items-center gap-2">
                          <Icon name="mdi:web" class="w-5 h-5" />
                          Supported Browsers
                        </h4>
                        <ul class="mt-2 ml-6 list-disc text-gray-700">
                          <li v-for="(browser, index) in systemRequirements.browser" :key="index">
                            {{ browser }}
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 class="font-medium flex items-center gap-2">
                          <Icon name="mdi:monitor" class="w-5 h-5" />
                          Display Resolution
                        </h4>
                        <p class="mt-2 ml-6 text-gray-700">{{ systemRequirements.resolution }}</p>
                      </div>
                      
                      <div>
                        <h4 class="font-medium flex items-center gap-2">
                          <Icon name="mdi:wifi" class="w-5 h-5" />
                          Internet Connection
                        </h4>
                        <p class="mt-2 ml-6 text-gray-700">{{ systemRequirements.internet }}</p>
                      </div>
                      
                      <div>
                        <h4 class="font-medium flex items-center gap-2">
                          <Icon name="mdi:devices" class="w-5 h-5" />
                          Compatible Devices
                        </h4>
                        <p class="mt-2 ml-6 text-gray-700">{{ systemRequirements.devices }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <!-- Release Notes Tab -->
              <TabsContent value="releaseNotes">
                <div class="space-y-6 mt-4">
                  <div v-for="(release, index) in releaseNotes" :key="index" class="border-b pb-4 last:border-b-0">
                    <div class="flex justify-between items-center mb-2">
                      <h3 class="font-medium">Version {{ release.version }}</h3>
                      <span class="text-sm text-gray-500">{{ release.date }}</span>
                    </div>
                    <ul class="ml-6 list-disc text-gray-700">
                      <li v-for="(note, noteIndex) in release.notes" :key="noteIndex" class="mt-1">
                        {{ note }}
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <!-- Contact Tab -->
              <TabsContent value="contact">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div class="border rounded-lg p-6">
                    <h3 class="text-lg font-medium mb-4 flex items-center gap-2">
                      <Icon name="mdi:headset" class="w-5 h-5" />
                      Technical Support
                    </h3>
                    <div class="space-y-3">
                      <div class="flex items-start gap-3">
                        <Icon name="mdi:email" class="w-5 h-5 mt-0.5 text-gray-600" />
                        <div>
                          <p class="text-sm text-gray-500">Email</p>
                          <p>{{ contactInfo.support.email }}</p>
                        </div>
                      </div>
                      <div class="flex items-start gap-3">
                        <Icon name="mdi:phone" class="w-5 h-5 mt-0.5 text-gray-600" />
                        <div>
                          <p class="text-sm text-gray-500">Phone</p>
                          <p>{{ contactInfo.support.phone }}</p>
                        </div>
                      </div>
                      <div class="flex items-start gap-3">
                        <Icon name="mdi:clock" class="w-5 h-5 mt-0.5 text-gray-600" />
                        <div>
                          <p class="text-sm text-gray-500">Support Hours</p>
                          <p>{{ contactInfo.support.hours }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="border rounded-lg p-6">
                    <h3 class="text-lg font-medium mb-4 flex items-center gap-2">
                      <Icon name="mdi:office-building" class="w-5 h-5" />
                      Office Information
                    </h3>
                    <div class="space-y-3">
                      <div class="flex items-start gap-3">
                        <Icon name="mdi:map-marker" class="w-5 h-5 mt-0.5 text-gray-600" />
                        <div>
                          <p class="text-sm text-gray-500">Address</p>
                          <p>{{ contactInfo.office.address }}</p>
                        </div>
                      </div>
                      <div class="flex items-start gap-3">
                        <Icon name="mdi:phone" class="w-5 h-5 mt-0.5 text-gray-600" />
                        <div>
                          <p class="text-sm text-gray-500">Phone</p>
                          <p>{{ contactInfo.office.phone }}</p>
                        </div>
                      </div>
                      <div class="flex items-start gap-3">
                        <Icon name="mdi:fax" class="w-5 h-5 mt-0.5 text-gray-600" />
                        <div>
                          <p class="text-sm text-gray-500">Fax</p>
                          <p>{{ contactInfo.office.fax }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter class="flex justify-between">
            <p class="text-sm text-gray-500">© 2023 JKR Claims Management System. All rights reserved.</p>
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
