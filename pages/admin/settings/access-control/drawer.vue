<script setup>
definePageMeta({
  layout: "admin",
  title: "Drawer Management",
});

// Store and navigation setup
const layoutStore = useLayoutStore();
const { getAdminNavigation } = useNavigation();
const route = useRoute();

// Cabinet management
const cabinets = ref([
  { id: 1, name: "JKR Cawangan Batu Kawan" },
  { id: 2, name: "JKR Cawangan Kota Kinabalu" },
  { id: 3, name: "JKR Cawangan Kota Marudu" },
]);
const selectedCabinet = ref(null);

// Settings navigation items
const settingsNavigation = computed(() => {
  const adminNav = getAdminNavigation();
  return adminNav.find(section => section.title === "Settings")?.items[0]?.children || [];
});

// Active route helper
const isActiveRoute = (path) => route.path === path;

// Theme handling
const { currentTheme, setTheme } = useTheme();
const selectedTheme = computed({
  get: () => currentTheme.value === "dark",
  set: (value) => setTheme(value ? "dark" : "default")
});

// Font options
const fonts = [
  { value: "inter", label: "Inter" },
  { value: "roboto", label: "Roboto" },
  { value: "poppins", label: "Poppins" },
];
const selectedFont = ref("inter");

// Layout options
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

// Direction options
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

// UI state management
const activeTab = ref("drawer");
const searchQuery = ref('');
const collapsedDrawers = ref(new Set());
const collapsedFolders = ref(new Set());
const showDeleteButtons = ref(false);

// Drawer management
const drawers = ref([
  { id: 1, name: "JKR Bahagian Kewangan Cawangan Batu Kawan", allowFolders: true, cabinetId: 1 },
  { id: 2, name: "JKR Bahagian Kejuruteraan Awam Cawangan Batu Kawan", allowFolders: true, cabinetId: 1 },
  { id: 3, name: "JKR Bahagian Teknologi Maklumat Cawangan Kota Kinabalu", allowFolders: false, cabinetId: 2 },
  // ... other drawers
]);

// Folder (Project) management
const folders = ref({
  1: [
    { id: 1, name: "Pembinaan Pejabat Kewangan Batu Kawan", subfolders: [] },
    { id: 2, name: "Renovasi Pejabat Kewangan Batu Kawan", subfolders: [] },
  ],
  // ... other folders
});

// Subfolder (Discipline) management
const subfolders = ref([
  { id: 1, name: "Arkitek" },
  { id: 2, name: "Struktur" },
  { id: 3, name: "Mekanikal" },
  { id: 4, name: "Elektrik" },
  { id: 5, name: "Ukur Bahan" },
]);

// Group management
const groups = ref([
  { id: 1, name: "Kumpulan Kewangan", drawerId: 1, folderId: 1, subfolderId: 1 },
  { id: 2, name: "Kumpulan Kejuruteraan Awam", drawerId: 1, folderId: 1, subfolderId: 2 },
  // ... other groups
]);

// Selection state
const selectedDrawer = ref("");
const selectedProject = ref("");
const selectedDiscipline = ref("");
const selectedDrawerForProject = ref(null);
const selectedFolder = ref(null);

// Modal state
const showAddDrawerModal = ref(false);
const showAddProjectModal = ref(false);
const showAddFolderModal = ref(false);
const showAddGroupModal = ref(false);
const showDeleteGroupModal = ref(false);
const showDeleteDrawerModal = ref(false);
const showDeleteProjectModal = ref(false);
const showEditFolderModal = ref(false);
const showEditSubfolderModal = ref(false);
const showAddSubfolderModal = ref(false);

// Form state
const newDrawer = ref({ name: "", allowFolders: "no", cabinetId: null });
const newProject = ref({ name: "" });
const newFolder = ref({ name: "" });
const newGroup = ref({ name: "", drawerId: null, folderId: null, subfolderId: null });
const newSubfolder = ref({ name: "", permission: "default" });
const editingDrawer = ref(null);
const editDrawerData = ref({ name: "", allowFolders: "no" });
const editingFolder = ref(null);
const editingSubfolder = ref(null);
const groupToDelete = ref(null);
const drawerToDelete = ref({ id: null, name: "" });
const folderToDelete = ref(null);
const deleteDrawerName = ref("");
const errorMessage = ref("");

// Dropdown options
const folderOptions = [
  { value: "yes", label: "Folders Enabled" },
  { value: "no", label: "No Folders" }
];
const accessTypes = ["view", "edit", "download", "upload", "print", "delete"];

// Form validation state
const drawerErrors = ref({
  name: "",
  allowFolders: "",
  cabinet: ""
});

const folderErrors = ref({
  name: ""
});

const subfolderErrors = ref({
  name: ""
});

// Add this to the script setup section, near other ref declarations
const permissionOptions = [
  { value: "default", label: "Default" },
  { value: "view_only", label: "View Only" }
];

// Validation functions
const validateDrawerForm = () => {
  drawerErrors.value = {
    name: "",
    allowFolders: "",
    cabinet: ""
  };
  
  const name = editingDrawer.value ? editDrawerData.value.name : newDrawer.value.name;
  
  if (!name?.trim()) {
    drawerErrors.value.name = "Drawer name is required";
    return false;
  }
  
  if (name.trim().length < 3) {
    drawerErrors.value.name = "Drawer name must be at least 3 characters";
    return false;
  }
  
  return true;
};

const validateFolderForm = () => {
  folderErrors.value = {
    name: ""
  };
  
  const name = editingFolder.value ? editingFolder.value.name : newFolder.value.name;
  
  if (!name?.trim()) {
    folderErrors.value.name = "Folder name is required";
    return false;
  }
  
  if (name.trim().length < 3) {
    folderErrors.value.name = "Folder name must be at least 3 characters";
    return false;
  }
  
  return true;
};

const validateSubfolderForm = () => {
  subfolderErrors.value = {
    name: ""
  };
  
  const name = editingSubfolder.value ? editingSubfolder.value.name : newSubfolder.value.name;
  
  if (!name?.trim()) {
    subfolderErrors.value.name = "Subfolder name is required";
    return false;
  }
  
  if (name.trim().length < 3) {
    subfolderErrors.value.name = "Subfolder name must be at least 3 characters";
    return false;
  }
  
  return true;
};

// Computed properties
const drawerName = computed({
  get: () => editingDrawer.value ? editDrawerData.value.name : newDrawer.value.name,
  set: (value) => {
    if (editingDrawer.value) {
      editDrawerData.value.name = value;
    } else {
      newDrawer.value.name = value;
    }
  }
});

const filteredDrawers = computed(() => {
  if (!selectedCabinet.value) return [];
  
  const query = searchQuery.value.toLowerCase();
  const cabinetDrawers = drawers.value.filter(drawer => drawer.cabinetId === selectedCabinet.value);
  
  if (!query) return cabinetDrawers;
  
  return cabinetDrawers.filter(drawer => {
    if (drawer.name.toLowerCase().includes(query)) return true;
    
    const drawerFolders = folders.value[drawer.id] || [];
    return drawerFolders.some(folder => 
      folder.name.toLowerCase().includes(query) ||
      folder.subfolders?.some(sub => sub.name.toLowerCase().includes(query))
    );
  });
});

const filteredGroups = computed(() => {
  if (!selectedDrawer.value || !selectedProject.value || !selectedDiscipline.value) return [];
  
  return groups.value.filter(group => 
    group.drawerId === selectedDrawer.value &&
    group.folderId === selectedProject.value &&
    group.subfolderId === selectedDiscipline.value
  );
});

const drawerTree = computed(() => {
  return drawers.value.map(drawer => ({
    ...drawer,
    folders: drawer.allowFolders ? folders.value[drawer.id]?.map(folder => ({
      ...folder,
      subfolders: subfolders.value
    })) : []
  }));
});

// Watchers
watch(selectedDrawer, (newVal) => {
  if (!newVal) return;
  
  const folderList = folders.value[newVal] || [];
  selectedProject.value = folderList[0]?.id || null;
  selectedDiscipline.value = subfolders.value[0]?.id || null;
});

watch(selectedProject, () => {
  selectedDiscipline.value = subfolders.value[0]?.id || null;
});

// Initialize collapsed drawers on mounted
onMounted(() => {
  // Initialize all drawers and folders as collapsed
  collapsedDrawers.value = new Set(drawers.value.map(d => d.id));
  
  // Initialize collapsed folders
  const allFolderIds = [];
  Object.values(folders.value).forEach(folderList => {
    folderList.forEach(folder => {
      allFolderIds.push(folder.id);
    });
  });
  collapsedFolders.value = new Set(allFolderIds);
});

// Helper functions
const toggleDrawer = (drawerId) => {
  if (collapsedDrawers.value.has(drawerId)) {
    collapsedDrawers.value.delete(drawerId);
  } else {
    collapsedDrawers.value.add(drawerId);
  }
};

const isDrawerCollapsed = (drawerId) => {
  return collapsedDrawers.value.has(drawerId);
};

const toggleFolder = (folderId) => {
  if (collapsedFolders.value.has(folderId)) {
    collapsedFolders.value.delete(folderId);
  } else {
    collapsedFolders.value.add(folderId);
  }
};

const isFolderCollapsed = (folderId) => {
  return collapsedFolders.value.has(folderId);
};

const toggleDeleteButtons = () => {
  showDeleteButtons.value = !showDeleteButtons.value;
};

// Drawer CRUD operations
const openAddDrawerModal = () => {
  newDrawer.value = { name: "", allowFolders: "no", cabinetId: null };
  editingDrawer.value = null; // Ensure we're not in edit mode
  showAddDrawerModal.value = true;
};

const addDrawer = () => {
  if (!validateDrawerForm()) return;
  if (!selectedCabinet.value) {
    drawerErrors.value.cabinet = "Please select a cabinet first";
    return;
  }
  
  const newId = Math.max(0, ...drawers.value.map(d => d.id)) + 1;
  drawers.value.push({ 
    id: newId, 
    name: newDrawer.value.name.trim(),
    allowFolders: newDrawer.value.allowFolders === "yes",
    cabinetId: selectedCabinet.value
  });
  
  if (newDrawer.value.allowFolders === "yes") {
    folders.value[newId] = [];
  }
  
  newDrawer.value = { name: "", allowFolders: "no", cabinetId: selectedCabinet.value };
  showAddDrawerModal.value = false;
  
  const toast = useToast();
  toast.add({
    title: "Success",
    description: "Drawer has been created successfully",
    type: "success",
  });
};

const openEditDrawerModal = (drawer) => {
  editingDrawer.value = drawer.id;
  editDrawerData.value = { 
    name: drawer.name, 
    allowFolders: drawer.allowFolders ? "yes" : "no" 
  };
  showAddDrawerModal.value = true; // Reuse the drawer modal for editing
};

const saveDrawerEdit = () => {
  if (!validateDrawerForm()) return;
  
  const drawerIndex = drawers.value.findIndex(d => d.id === editingDrawer.value);
  if (drawerIndex === -1) return;
  
  drawers.value[drawerIndex] = {
    ...drawers.value[drawerIndex],
    name: editDrawerData.value.name.trim(),
    allowFolders: editDrawerData.value.allowFolders === "yes"
  };
  
  editingDrawer.value = null;
  editDrawerData.value = { name: "", allowFolders: "no" };
  showAddDrawerModal.value = false;
  
  const toast = useToast();
  toast.add({
    title: "Success",
    description: "Drawer has been updated successfully",
    type: "success",
  });
};

const confirmDeleteDrawer = (drawerId, drawerName) => {
  errorMessage.value = "";
  drawerToDelete.value = { id: drawerId, name: drawerName };
  showDeleteDrawerModal.value = true;
  deleteDrawerName.value = ""; // Clear input on opening modal
};

const deleteDrawer = () => {
  if (deleteDrawerName.value.trim() !== drawerToDelete.value.name) {
    errorMessage.value = "You need to fill the drawer name for deletion.";
    return;
  }
  
  const index = drawers.value.findIndex(d => d.id === drawerToDelete.value.id);
  if (index !== -1) {
    drawers.value.splice(index, 1); // Remove the drawer
    
    // Also clean up related data
    delete folders.value[drawerToDelete.value.id];
    groups.value = groups.value.filter(g => g.drawerId !== drawerToDelete.value.id);
  }
  
  drawerToDelete.value = { id: null, name: "" }; // Reset
  deleteDrawerName.value = ""; // Clear input
  showDeleteDrawerModal.value = false; // Close modal
};

// Group CRUD operations
const openAddGroupModal = () => {
  newGroup.value = {
    name: "",
    drawerId: selectedDrawer.value,
    folderId: selectedProject.value,
    subfolderId: selectedDiscipline.value
  };
  showAddGroupModal.value = true;
};

const addGroup = () => {
  if (!newGroup.value.name || !newGroup.value.drawerId || 
      !newGroup.value.folderId || !newGroup.value.subfolderId) return;
  
  const newId = Math.max(0, ...groups.value.map(g => g.id)) + 1;
  groups.value.push({ 
    id: newId,
    ...newGroup.value 
  });
  
  newGroup.value = { name: "", drawerId: null, folderId: null, subfolderId: null };
  showAddGroupModal.value = false;
};

const confirmDeleteGroup = (index) => {
  groupToDelete.value = index;
  showDeleteGroupModal.value = true;
};

const deleteGroup = () => {
  if (groupToDelete.value === null) return;
  
  groups.value.splice(groupToDelete.value, 1);
  groupToDelete.value = null;
  showDeleteGroupModal.value = false;
};

// Preference updates
const handleThemeChange = (isDark) => {
  selectedTheme.value = isDark;
};

const handleLayoutChange = (layoutId) => {
  if (layoutStore.sidebarLayout !== layoutId) {
    layoutStore.toggleSidebarLayout();
  }
};

const handleDirectionChange = () => {
  layoutStore.toggleDirection();
};

const updatePreferences = () => {
  setTheme(selectedTheme.value ? "dark" : "default");
  // You might want to add font updating logic here

  const toast = useToast();
  toast.add({
    title: "Preferences Updated",
    description: "Your theme settings have been saved successfully.",
    type: "success",
  });
};

// Edit Subfolder Modal
const openEditSubfolderModal = (drawer, folder, subfolder) => {
  editingSubfolder.value = { 
    id: subfolder.id,
    name: subfolder.name,
    permission: subfolder.permission || "default",
    folderId: folder.id,
    drawerId: drawer.id
  };
  subfolderErrors.value = { name: "" };
  showEditSubfolderModal.value = true;
};

const updateSubfolder = () => {
  if (!validateSubfolderForm()) return;
  
  if (!editingSubfolder.value) return;
  
  const folderList = folders.value[editingSubfolder.value.drawerId];
  if (!folderList) return;
  
  const folder = folderList.find(f => f.id === editingSubfolder.value.folderId);
  if (!folder || !folder.subfolders) return;
  
  const subfolderIndex = folder.subfolders.findIndex(s => s.id === editingSubfolder.value.id);
  if (subfolderIndex === -1) return;
  
  folder.subfolders[subfolderIndex] = {
    ...folder.subfolders[subfolderIndex],
    name: editingSubfolder.value.name.trim(),
    permission: editingSubfolder.value.permission
  };
  
  editingSubfolder.value = null;
  showEditSubfolderModal.value = false;
  
  const toast = useToast();
  toast.add({
    title: "Success",
    description: "Subfolder has been updated successfully",
    type: "success",
  });
};

// Add these to the script section
const selectedFolderForSubfolder = ref(null);

// Update the openAddSubfolderModal function
const openAddSubfolderModal = (drawerId, folderId) => {
  newSubfolder.value = { name: "", permission: "default" };
  subfolderErrors.value = { name: "" }; // Reset errors
  selectedDrawerForProject.value = drawerId;
  selectedFolderForSubfolder.value = folderId;
  showAddSubfolderModal.value = true;
};

// Update the addSubfolder function to include permission
const addSubfolder = () => {
  if (!validateSubfolderForm()) return;
  
  if (!selectedDrawerForProject.value || !selectedFolderForSubfolder.value) return;
  
  const folderList = folders.value[selectedDrawerForProject.value];
  if (!folderList) return;
  
  const folder = folderList.find(f => f.id === selectedFolderForSubfolder.value);
  if (!folder) return;
  
  if (!folder.subfolders) {
    folder.subfolders = [];
  }
  
  const existingIds = folder.subfolders.map(s => s.id);
  const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
  
  folder.subfolders.push({
    id: newId,
    name: newSubfolder.value.name.trim(),
    permission: newSubfolder.value.permission
  });
  
  newSubfolder.value = { name: "", permission: "default" };
  subfolderErrors.value = { name: "" };
  showAddSubfolderModal.value = false;
  
  const toast = useToast();
  toast.add({
    title: "Success",
    description: "Subfolder has been created successfully",
    type: "success",
  });
};

// Add confirmDeleteSubfolder function
const showDeleteSubfolderModal = ref(false);
const subfolderToDelete = ref(null);

const confirmDeleteSubfolder = (drawerId, folderId, subfolderId) => {
  subfolderToDelete.value = { drawerId, folderId, subfolderId };
  showDeleteSubfolderModal.value = true;
};

// Update the deleteSubfolder function
const deleteSubfolder = () => {
  if (!subfolderToDelete.value) return;
  
  const { drawerId, folderId, subfolderId } = subfolderToDelete.value;
  const folderList = folders.value[drawerId];
  if (!folderList) return;
  
  const folder = folderList.find(f => f.id === folderId);
  if (!folder || !folder.subfolders) return;
  
  const subfolderIndex = folder.subfolders.findIndex(s => s.id === subfolderId);
  if (subfolderIndex !== -1) {
    folder.subfolders.splice(subfolderIndex, 1);
    
    // Clean up related groups
    groups.value = groups.value.filter(g => 
      !(g.drawerId === drawerId && g.folderId === folderId && g.subfolderId === subfolderId)
    );
  }
  
  subfolderToDelete.value = null;
  showDeleteSubfolderModal.value = false;
  
  const toast = useToast();
  toast.add({
    title: "Success",
    description: "Subfolder has been deleted successfully",
    type: "success",
  });
};

// Folder CRUD operations
const openEditFolderModal = (drawerId, folder) => {
  editingFolder.value = { 
    id: folder.id,
    name: folder.name,
    drawerId: drawerId
  };
  folderErrors.value = { name: "" };
  showEditFolderModal.value = true;
};

const updateFolder = () => {
  if (!validateFolderForm()) return;
  
  if (!editingFolder.value?.drawerId) return;
  
  const folderList = folders.value[editingFolder.value.drawerId];
  if (!folderList) return;
  
  const folderIndex = folderList.findIndex(f => f.id === editingFolder.value.id);
  if (folderIndex === -1) return;
  
  // Create a new folder object with updated name
  folderList[folderIndex] = {
    ...folderList[folderIndex],
    name: editingFolder.value.name.trim()
  };
  
  editingFolder.value = null;
  showEditFolderModal.value = false;
  
  const toast = useToast();
  toast.add({
    title: "Success",
    description: "Folder has been updated successfully",
    type: "success",
  });
};

const openAddFolderModal = (drawerId) => {
  newFolder.value = { name: "" };
  selectedDrawerForProject.value = drawerId;
  folderErrors.value = { name: "" }; // Reset errors
  showAddFolderModal.value = true;
};

const addFolder = () => {
  if (!validateFolderForm()) return;
  
  if (!selectedDrawerForProject.value) return;
  
  // Initialize the folders array for this drawer if it doesn't exist
  if (!folders.value[selectedDrawerForProject.value]) {
    folders.value[selectedDrawerForProject.value] = [];
  }
  
  const folderList = folders.value[selectedDrawerForProject.value];
  const existingIds = folderList.map(f => f.id);
  const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
  
  // Add the new folder
  folderList.push({
    id: newId,
    name: newFolder.value.name.trim(),
    subfolders: []
  });
  
  // Reset form
  newFolder.value = { name: "" };
  showAddFolderModal.value = false;
  
  const toast = useToast();
  toast.add({
    title: "Success",
    description: "Folder has been created successfully",
    type: "success",
  });
};

const confirmDeleteFolder = (drawerId, folderId) => {
  folderToDelete.value = { drawerId, folderId };
  showDeleteProjectModal.value = true;
};

const deleteFolder = () => {
  if (!folderToDelete.value) return;
  
  const { drawerId, folderId } = folderToDelete.value;
  const folderList = folders.value[drawerId];
  if (!folderList) return;
  
  const folderIndex = folderList.findIndex(f => f.id === folderId);
  if (folderIndex !== -1) {
    folderList.splice(folderIndex, 1);
    
    // Clean up related groups
    groups.value = groups.value.filter(g => 
      !(g.drawerId === drawerId && g.folderId === folderId)
    );
  }
  
  folderToDelete.value = null;
  showDeleteProjectModal.value = false;
  
  const toast = useToast();
  toast.add({
    title: "Success",
    description: "Folder has been deleted successfully",
    type: "success",
  });
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
            <CardTitle>Drawer Management</CardTitle>
            <CardDescription>Manage settings for your drawers</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs v-model="activeTab">
              <TabsList>
                <TabsTrigger value="drawer">Drawer</TabsTrigger>
                <TabsTrigger value="accessControl">Access Control</TabsTrigger>
              </TabsList>
              <TabsContent value="drawer" class="h-[calc(100vh-200px)] overflow-hidden flex flex-col">
                <!-- Cabinet Selection -->
                <div class="bg-white z-20 p-4 border-b sticky top-0">
                  <div class="mb-4">
                    <Label for="cabinetSelect">Select Cabinet</Label>
                    <select
                      id="cabinetSelect"
                      v-model="selectedCabinet"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option :value="null">Select a cabinet</option>
                      <option v-for="cabinet in cabinets" :key="cabinet.id" :value="cabinet.id">
                        {{ cabinet.name }}
                      </option>
                    </select>
                  </div>

                  <!-- Search and Actions Bar -->
                  <div v-if="selectedCabinet" class="flex items-center gap-4">
                    <div class="flex-1 relative">
                      <Icon 
                        name="mdi:magnify" 
                        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                      />
                      <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search drawers, folders, or subfolders..."
                        class="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <Button @click="openAddDrawerModal" class="inline-flex items-center gap-2">
                      <Icon name="mdi:plus" />
                      New Drawer
                    </Button>
                  </div>
                </div>

                <!-- No Cabinet Selected Message -->
                <div v-if="!selectedCabinet" class="flex-1 flex items-center justify-center">
                  <div class="text-center text-gray-500">
                    <Icon name="mdi:cabinet" class="w-12 h-12 mx-auto mb-4" />
                    <p class="text-lg font-medium">Please select a cabinet</p>
                    <p class="text-sm">Choose a cabinet to view and manage its drawers</p>
                  </div>
                </div>

                <!-- Scrollable Content Area -->
                <div v-else class="flex-1 overflow-y-auto">
                  <div class="p-4 space-y-2">
                    <div 
                      v-for="drawer in filteredDrawers" 
                      :key="drawer.id" 
                      class="border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <!-- Drawer Header -->
                      <div 
                        class="flex items-center gap-3 p-3 bg-gray-50 rounded-t-lg cursor-pointer group"
                        @click="toggleDrawer(drawer.id)"
                      >
                        <Icon 
                          :name="isDrawerCollapsed(drawer.id) ? 'mdi:chevron-right' : 'mdi:chevron-down'" 
                          class="w-5 h-5 text-gray-500"
                        />
                        <Icon 
                          :name="drawer.allowFolders ? 'mdi:folder' : 'mdi:folder-off'" 
                          class="w-5 h-5 text-blue-500"
                        />
                        <span class="font-medium flex-1">{{ drawer.name }}</span>
                        <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button @click.stop="openEditDrawerModal(drawer)" variant="ghost" size="sm">
                            <Icon name="mdi:pencil" class="w-4 h-4" />
                          </Button>
                          <Button 
                            @click.stop="confirmDeleteDrawer(drawer.id, drawer.name)" 
                            variant="ghost" 
                            size="sm"
                          >
                            <Icon name="mdi:trash-can" class="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                        <Badge :variant="drawer.allowFolders ? 'default' : 'secondary'">
                          {{ drawer.allowFolders ? 'Folders Enabled' : 'No Folders' }}
                        </Badge>
                      </div>

                      <!-- Drawer Content -->
                      <div v-show="!isDrawerCollapsed(drawer.id)" class="border-t">
                        <div class="p-4">
                          <!-- Folder Section -->
                          <div v-if="drawer.allowFolders" class="space-y-2">
                            <!-- Folder Actions -->
                            <div class="flex justify-end mb-2">
                              <Button 
                                @click.stop="openAddFolderModal(drawer.id)" 
                                variant="ghost" 
                                size="sm"
                                class="inline-flex items-center gap-2"
                              >
                                <Icon name="mdi:plus" class="w-4 h-4" />
                                New Folder
                              </Button>
                            </div>
                            
                            <!-- Folder List -->
                            <div class="pl-8">
                              <div 
                                v-for="folder in folders[drawer.id] || []" 
                                :key="folder.id"
                                class="border rounded-lg mb-2 shadow-sm hover:shadow-md transition-shadow"
                              >
                                <!-- Folder Header -->
                                <div 
                                  class="flex items-center gap-3 p-3 bg-gray-50 rounded-t-lg cursor-pointer group"
                                  @click="toggleFolder(folder.id)"
                                >
                                  <Icon 
                                    :name="collapsedFolders.has(folder.id) ? 'mdi:chevron-right' : 'mdi:chevron-down'" 
                                    class="w-5 h-5 text-gray-500"
                                  />
                                  <Icon 
                                    name="mdi:folder" 
                                    class="w-5 h-5 text-yellow-500"
                                  />
                                  <span class="font-medium flex-1">{{ folder.name }}</span>
                                  <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button @click.stop="openEditFolderModal(drawer.id, folder)" variant="ghost" size="sm">
                                      <Icon name="mdi:pencil" class="w-4 h-4" />
                                    </Button>
                                    <Button 
                                      @click.stop="confirmDeleteFolder(drawer.id, folder.id)" 
                                      variant="ghost" 
                                      size="sm"
                                    >
                                      <Icon name="mdi:trash-can" class="w-4 h-4 text-red-500" />
                                    </Button>
                                  </div>
                                </div>

                                <!-- Folder Content (Subfolders) -->
                                <div v-show="!collapsedFolders.has(folder.id)" class="border-t">
                                  <div class="p-4">
                                    <!-- Subfolder Actions -->
                                    <div class="flex justify-end mb-2">
                                      <Button 
                                        @click.stop="openAddSubfolderModal(drawer.id, folder.id)" 
                                        variant="ghost" 
                                        size="sm"
                                        class="inline-flex items-center gap-2"
                                      >
                                        <Icon name="mdi:plus" class="w-4 h-4" />
                                        New Subfolder
                                      </Button>
                                    </div>

                                    <!-- Subfolder List -->
                                    <div class="pl-8">
                                      <div 
                                        v-for="subfolder in folder.subfolders || []" 
                                        :key="subfolder.id"
                                        class="border rounded-lg mb-2 shadow-sm hover:shadow-md transition-shadow"
                                      >
                                        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer group">
                                          <Icon 
                                            name="mdi:folder" 
                                            class="w-5 h-5 text-green-500"
                                          />
                                          <span class="font-medium flex-1">{{ subfolder.name }}</span>
                                          <Badge 
                                            :variant="subfolder.permission === 'view_only' ? 'secondary' : 'default'"
                                            class="mr-2"
                                          >
                                            {{ subfolder.permission === 'view_only' ? 'View Only' : 'Default' }}
                                          </Badge>
                                          <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button @click.stop="openEditSubfolderModal(drawer, folder, subfolder)" variant="ghost" size="sm">
                                              <Icon name="mdi:pencil" class="w-4 h-4" />
                                            </Button>
                                            <Button 
                                              @click.stop="confirmDeleteSubfolder(drawer.id, folder.id, subfolder.id)" 
                                              variant="ghost" 
                                              size="sm"
                                            >
                                              <Icon name="mdi:trash-can" class="w-4 h-4 text-red-500" />
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-else class="text-center text-gray-500 py-4">
                            Folders are disabled for this drawer
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="accessControl">
                <div class="space-y-8 mt-4">
                  <!-- General SettingsContent -->
                  <!-- Drawer Dropdown -->
                  <div>
                    <label for="drawer" class="block text-sm font-medium text-gray-700">Select Drawer</label>
                    <select id="drawer" v-model="selectedDrawer" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option disabled value="">Select a Drawer</option>
                      <option v-for="drawer in drawers" :key="drawer.id" :value="drawer.id">{{ drawer.name }}</option>
                    </select>
                  </div>

                  <!-- Conditional Folder and Subfolder Dropdowns -->
                  <div v-if="selectedDrawer && drawers.find(d => d.id === selectedDrawer)?.allowFolders" class="flex gap-4">
                    <!-- Folder Dropdown (previously Project) -->
                    <div class="flex-1">
                      <label for="folder" class="block text-sm font-medium text-gray-700">Select Folder</label>
                      <select id="folder" v-model="selectedProject" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option disabled value="">Select a Folder</option>
                        <option v-for="folder in folders[selectedDrawer]" :key="folder.id" :value="folder.id">
                          {{ folder.name }}
                        </option>
                      </select>
                    </div>

                    <!-- Subfolder Dropdown (previously Discipline) -->
                    <div v-if="selectedProject" class="flex-1">
                      <label for="subfolder" class="block text-sm font-medium text-gray-700">Select Subfolder</label>
                      <select id="subfolder" v-model="selectedDiscipline" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option disabled value="">Select a Subfolder</option>
                        <option v-for="subfolder in subfolders" :key="subfolder.id" :value="subfolder.id">
                          {{ subfolder.name }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <!-- Groups Table -->
                  <div v-if="selectedDrawer && selectedDiscipline">
                    <div class="flex justify-between items-center mb-2">
                      <h3 class="text-lg font-medium">Groups</h3>
                      <div class="flex gap-x-1">
                        <Button @click="openAddGroupModal" class="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 "><Icon name="mdi:plus"></Icon></Button>
                        <Button @click="toggleDeleteButtons" class="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white  focus:outline-none focus:ring-2 focus:ring-offset-2"><Icon name="mdi:minus"></Icon></Button>
                      </div>
                    </div>
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
                          <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only"><Icon name ="mdi:delete"></Icon></span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(group, index) in filteredGroups" :key="index">
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ group.name }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button v-if="showDeleteButtons" @click="confirmDeleteGroup(index)" variant="danger"><Icon name="mdi:trash-can"></Icon></Button>
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

    <!-- Add Group Modal -->
    <Modal v-model:open="showAddGroupModal">
      <ModalHeader>
        <ModalTitle>Add Group</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div class="space-y-4">
          <div>
            <label for="groupName" class="block text-sm font-medium text-gray-700">Group Name</label>
            <select id="groupName" v-model="newGroup.name" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option disabled value="">Select a Group</option>
              <option v-for="group in groups" :key="group.id" :value="group.name">{{ group.name }}</option>
            </select>
          </div>
          <!-- Hide Drawer, Project, and Discipline dropdowns -->
          <div v-if="false">
            <label for="drawerId" class="block text-sm font-medium text-gray-700">Drawer</label>
            <select id="drawerId" v-model="newGroup.drawerId" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option disabled value="">Select a Drawer</option>
              <option v-for="drawer in drawers" :key="drawer.id" :value="drawer.id">{{ drawer.name }}</option>
            </select>
          </div>
          <div v-if="false">
            <label for="folderId" class="block text-sm font-medium text-gray-700">Project</label>
            <select id="folderId" v-model="newGroup.folderId" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option disabled value="">Select a Project</option>
              <option v-for="folder in folders[selectedDrawer]" :key="folder.id" :value="folder.id">{{ folder.name }}</option>
            </select>
          </div>
          <div v-if="false" class="mb-4">
            <label for="subfolderId" class="block text-sm font-medium text-gray-700">Discipline</label>
            <select id="subfolderId" v-model="newGroup.subfolderId" class="mt-1 mb-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option disabled value="">Select a Discipline</option>
              <option v-for="subfolder in subfolders" :key="subfolder.id" :value="subfolder.id">{{ subfolder.name }}</option>
            </select>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button @click="addGroup" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Group</Button>
        <Button @click="showAddGroupModal = false" class=" mt-4 ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</Button>
      </ModalFooter>
    </Modal>

    <!-- Add Drawer Modal -->
    <Modal v-model:open="showAddDrawerModal">
      <ModalHeader>
        <ModalTitle>{{ editingDrawer ? 'Edit Drawer' : 'Add New Drawer' }}</ModalTitle>
        <ModalDescription>
          {{ editingDrawer ? 'Update the drawer details below.' : 'Create a new drawer by filling out the form below.' }}
        </ModalDescription>
      </ModalHeader>
      <ModalBody>
        <div class="space-y-4">
          <!-- Cabinet Selection (only for new drawers) -->
          <div v-if="!editingDrawer">
            <Label for="drawerCabinet">Cabinet</Label>
            <select 
              id="drawerCabinet" 
              v-model="newDrawer.cabinetId"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              :class="{ 'border-red-500': drawerErrors.cabinet }"
            >
              <option :value="null">Select a cabinet</option>
              <option v-for="cabinet in cabinets" :key="cabinet.id" :value="cabinet.id">
                {{ cabinet.name }}
              </option>
            </select>
            <p v-if="drawerErrors.cabinet" class="mt-1 text-sm text-red-500">{{ drawerErrors.cabinet }}</p>
            <p class="mt-1 text-sm text-gray-500">
              Select the cabinet where this drawer will be created.
            </p>
          </div>

          <div>
            <Label for="drawerName">Drawer Name</Label>
            <Input 
              id="drawerName" 
              :value="editingDrawer ? editDrawerData.name : newDrawer.name"
              @input="e => editingDrawer ? (editDrawerData.name = e.target.value) : (newDrawer.name = e.target.value)"
              placeholder="Enter drawer name"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              :class="{ 'border-red-500': drawerErrors.name }"
            />
            <p v-if="drawerErrors.name" class="mt-1 text-sm text-red-500">{{ drawerErrors.name }}</p>
            <p class="mt-1 text-sm text-gray-500">
              This will be the main identifier for your drawer.
            </p>
          </div>

          <div>
            <Label for="folderOption">Folder Settings</Label>
            <select 
              id="folderOption" 
              :value="editingDrawer ? editDrawerData.allowFolders : newDrawer.allowFolders" 
              @change="editingDrawer ? (editDrawerData.allowFolders = $event.target.value) : (newDrawer.allowFolders = $event.target.value)"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="yes">Folders Enabled</option>
              <option value="no">No Folders</option>
            </select>
            <p class="mt-1 text-sm text-gray-500">
              Choose whether this drawer can contain folders. This setting cannot be changed after creation if folders exist.
            </p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter class="flex justify-end gap-2">
        <Button @click="showAddDrawerModal = false" variant="outline">Cancel</Button>
        <Button 
          @click="editingDrawer ? saveDrawerEdit() : addDrawer()"
          variant="default"
        >
          {{ editingDrawer ? 'Save Changes' : 'Create Drawer' }}
        </Button>
      </ModalFooter>
    </Modal>

    <!-- Add Folder Modal -->
    <Modal v-model:open="showAddFolderModal">
      <ModalHeader>
        <ModalTitle>Add New Folder</ModalTitle>
        <ModalDescription>Create a new folder in the selected drawer.</ModalDescription>
      </ModalHeader>
      <ModalBody>
        <div class="space-y-4">
          <div>
            <Label for="folderName">Folder Name</Label>
            <Input 
              id="folderName" 
              :value="newFolder.name"
              @input="e => newFolder.name = e.target.value"
              placeholder="Enter folder name"
              :class="{ 'border-red-500': folderErrors.name }"
            />
            <p v-if="folderErrors.name" class="mt-1 text-sm text-red-500">{{ folderErrors.name }}</p>
            <p class="mt-1 text-sm text-gray-500">This folder will be created in the selected drawer.</p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter class="flex justify-end gap-2">
        <Button @click="showAddFolderModal = false" variant="outline">Cancel</Button>
        <Button @click="addFolder" variant="default">Create Folder</Button>
      </ModalFooter>
    </Modal>

    <!-- Add Subfolder Modal -->
    <Modal v-model:open="showAddSubfolderModal">
      <ModalHeader>
        <ModalTitle>Add New Subfolder</ModalTitle>
        <ModalDescription>Create a new subfolder in the selected folder.</ModalDescription>
      </ModalHeader>
      <ModalBody>
        <div class="space-y-4">
          <div>
            <Label for="subfolderName">Subfolder Name</Label>
            <Input 
              id="subfolderName" 
              :value="newSubfolder.name"
              @input="e => newSubfolder.name = e.target.value"
              placeholder="Enter subfolder name"
              :class="{ 'border-red-500': subfolderErrors.name }"
            />
            <p v-if="subfolderErrors.name" class="mt-1 text-sm text-red-500">{{ subfolderErrors.name }}</p>
          </div>
          <div>
            <Label for="subfolderPermission">Permission Level</Label>
            <select 
              id="subfolderPermission" 
              :value="newSubfolder.permission"
              @change="e => newSubfolder.permission = e.target.value"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option v-for="option in permissionOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <p class="mt-1 text-sm text-gray-500">Choose the permission level for this subfolder.</p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter class="flex justify-end gap-2">
        <Button @click="showAddSubfolderModal = false" variant="outline">Cancel</Button>
        <Button @click="addSubfolder" variant="default">Create Subfolder</Button>
      </ModalFooter>
    </Modal>

    <!-- Edit Folder Modal -->
    <Modal v-model:open="showEditFolderModal">
      <ModalHeader>
        <ModalTitle>Edit Folder</ModalTitle>
        <ModalDescription>Update the folder details below.</ModalDescription>
      </ModalHeader>
      <ModalBody>
        <div class="space-y-4">
          <div>
            <Label for="editFolderName">Folder Name</Label>
            <Input 
              id="editFolderName" 
              :value="editingFolder?.name"
              @input="e => editingFolder.name = e.target.value"
              placeholder="Enter folder name"
              :class="{ 'border-red-500': folderErrors.name }"
            />
            <p v-if="folderErrors.name" class="mt-1 text-sm text-red-500">{{ folderErrors.name }}</p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter class="flex justify-end gap-2">
        <Button variant="outline" @click="showEditFolderModal = false">Cancel</Button>
        <Button @click="updateFolder" variant="default">Save Changes</Button>
      </ModalFooter>
    </Modal>

    <!-- Edit Subfolder Modal -->
    <Modal v-model:open="showEditSubfolderModal">
      <ModalHeader>
        <ModalTitle>Edit Subfolder</ModalTitle>
        <ModalDescription>Update the subfolder details below.</ModalDescription>
      </ModalHeader>
      <ModalBody>
        <div class="space-y-4">
          <div>
            <Label for="editSubfolderName">Subfolder Name</Label>
            <Input 
              id="editSubfolderName" 
              :value="editingSubfolder?.name"
              @input="e => editingSubfolder.name = e.target.value"
              placeholder="Enter subfolder name"
              :class="{ 'border-red-500': subfolderErrors.name }"
            />
            <p v-if="subfolderErrors.name" class="mt-1 text-sm text-red-500">{{ subfolderErrors.name }}</p>
          </div>
          <div>
            <Label for="editSubfolderPermission">Permission Level</Label>
            <select 
              id="editSubfolderPermission" 
              :value="editingSubfolder?.permission"
              @change="e => editingSubfolder.permission = e.target.value"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option v-for="option in permissionOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <p class="mt-1 text-sm text-gray-500">Choose the permission level for this subfolder.</p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter class="flex justify-end gap-2">
        <Button variant="outline" @click="showEditSubfolderModal = false">Cancel</Button>
        <Button @click="updateSubfolder" variant="default">Save Changes</Button>
      </ModalFooter>
    </Modal>

    <!-- Delete Group Confirmation Modal -->
    <Modal v-model:open="showDeleteGroupModal">
      <ModalHeader>
        <ModalTitle>Confirm Delete</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>Are you sure you want to delete this drawer?</p>
      </ModalBody>
      <ModalFooter>
        <Button @click="deleteGroup" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</Button>
        <Button @click="showDeleteGroupModal = false" class="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</Button>
      </ModalFooter>
    </Modal>

    <!-- Delete Drawer Confirmation Modal -->
    <Modal v-model:open="showDeleteDrawerModal">
      <ModalHeader>
        <ModalTitle>Confirm Delete</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>Please enter the drawer name to delete?</p>
        <input
          id="deleteDrawerName"
          v-model="deleteDrawerName"
          type="text"
          class="mt-1 mb-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
          :placeholder="`'${drawerToDelete.name}'`"
        />
        <p v-if="errorMessage" class="text-red-500 text-sm mt-1">{{ errorMessage }}</p>
      </ModalBody>
      <ModalFooter>
        <Button @click="deleteDrawer" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</Button>
        <Button @click="showDeleteDrawerModal = false" class="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</Button>
      </ModalFooter>
    </Modal>

    <!-- Delete Project Confirmation Modal -->
    <Modal v-model:open="showDeleteProjectModal">
      <ModalHeader>
        <ModalTitle>Confirm Delete</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>Are you sure you want to delete this folder? This will also delete all subfolders and associated groups.</p>
      </ModalBody>
      <ModalFooter>
        <Button @click="deleteFolder" variant="destructive">Delete</Button>
        <Button @click="showDeleteProjectModal = false" variant="outline">Cancel</Button>
      </ModalFooter>
    </Modal>

    <!-- Add Delete Subfolder Confirmation Modal -->
    <Modal v-model:open="showDeleteSubfolderModal">
      <ModalHeader>
        <ModalTitle>Confirm Delete</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>Are you sure you want to delete this subfolder? This will also delete all associated groups.</p>
      </ModalBody>
      <ModalFooter class="flex justify-end gap-2">
        <Button @click="showDeleteSubfolderModal = false" variant="outline">Cancel</Button>
        <Button @click="deleteSubfolder" variant="destructive">Delete</Button>
      </ModalFooter>
    </Modal>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply text-foreground font-medium;
}

/* Add smooth transition for collapse/expand */
[v-show] {
  transition: all 0.3s ease-in-out;
}

.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E0 #F7FAFC;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #F7FAFC;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #CBD5E0;
  border-radius: 3px;
}

/* Add these new styles */
.sticky {
  position: sticky;
  top: 0;
  background: white;
}

.overflow-y-auto {
  height: calc(100vh - 280px);
  overflow-y: auto;
}
</style>
