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
  { id: 1, name: "JKR Bahagian Kewangan Cawangan Batu Kawan" },
  { id: 2, name: "JKR Bahagian Kejuruteraan Awam Cawangan Batu Kawan" },
  { id: 3, name: "JKR Bahagian Teknologi Maklumat Cawangan Batu Kawan" },
  { id: 4, name: "JKR Bahagian Kewangan Cawangan Tebedu" },
  { id: 5, name: "JKR Bahagian Kejuruteraan Awam Cawangan Tebedu" },
  { id: 6, name: "JKR Bahagian Teknologi Maklumat Cawangan Tebedu" },
  { id: 7, name: "JKR Bahagian Kewangan Cawangan Kota Bharu" },
  { id: 8, name: "JKR Bahagian Kejuruteraan Awam Cawangan Kota Bharu" },
  { id: 9, name: "JKR Bahagian Teknologi Maklumat Cawangan Kota Bharu" },
  { id: 10, name: "JKR Bahagian Kewangan Cawangan Kuala Terengganu" },
  { id: 11, name: "JKR Bahagian Kejuruteraan Awam Cawangan Kuala Terengganu" },
  { id: 12, name: "JKR Bahagian Teknologi Maklumat Cawangan Kuala Terengganu" },
  { id: 13, name: "JKR Bahagian Kewangan Cawangan Ipoh" },
  { id: 14, name: "JKR Bahagian Kejuruteraan Awam Cawangan Ipoh" },
  { id: 15, name: "JKR Bahagian Teknologi Maklumat Cawangan Ipoh" },
]);

const selectedCabinet = ref("");

const groups = ref([
  { id: 1, name: "Kumpulan Kewangan", cabinetId: 1, projectId: 1, disciplineId: 1 },
  { id: 2, name: "Kumpulan Kejuruteraan Awam", cabinetId: 1, projectId: 1, disciplineId: 2 },
  { id: 3, name: "Kumpulan Teknologi Maklumat", cabinetId: 2, projectId: 3, disciplineId: 3 },
  { id: 4, name: "Kumpulan Kewangan", cabinetId: 2, projectId: 3, disciplineId: 4 },
  { id: 5, name: "Kumpulan Kejuruteraan Awam", cabinetId: 3, projectId: 5, disciplineId: 5 },
  { id: 6, name: "Kumpulan Teknologi Maklumat", cabinetId: 3, projectId: 5, disciplineId: 1 },
  { id: 7, name: "Kumpulan Kewangan", cabinetId: 1, projectId: 2, disciplineId: 2 },
  { id: 8, name: "Kumpulan Kejuruteraan Awam", cabinetId: 2, projectId: 4, disciplineId: 3 },
  { id: 9, name: "Kumpulan Teknologi Maklumat", cabinetId: 3, projectId: 6, disciplineId: 4 },
  { id: 10, name: "Kumpulan Kewangan", cabinetId: 1, projectId: 1, disciplineId: 5 },
]);

const newGroup = ref({ name: "", cabinetId: null, projectId: null, disciplineId: null });

const showAddGroupModal = ref(false);

const openAddGroupModal = () => {
  newGroup.value.cabinetId = selectedCabinet.value;
  newGroup.value.projectId = selectedProject.value;
  newGroup.value.disciplineId = selectedDiscipline.value;
  showAddGroupModal.value = true;
};

const showDeleteGroupModal = ref(false);
const groupToDelete = ref(null);

const addGroup = () => {
  if (newGroup.value.name && newGroup.value.cabinetId && newGroup.value.projectId && newGroup.value.disciplineId) {
    groups.value.push({ ...newGroup.value });
    newGroup.value = { name: "", cabinetId: null, projectId: null, disciplineId: null };
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

const projects = ref({
  1: [
    { id: 1, name: "Pembinaan Pejabat Kewangan Batu Kawan" },
    { id: 2, name: "Renovasi Pejabat Kewangan Batu Kawan" },
  ],
  2: [
    { id: 3, name: "Pembinaan Jambatan Batu Kawan" },
    { id: 4, name: "Projek Jalan Raya Batu Kawan" },
  ],
  3: [
    { id: 5, name: "Pembangunan Sistem IT Batu Kawan" },
    { id: 6, name: "Peningkatan Infrastruktur IT Batu Kawan" },
  ],
  4: [
    { id: 7, name: "Pembinaan Pejabat Kewangan Tebedu" },
    { id: 8, name: "Renovasi Pejabat Kewangan Tebedu" },
  ],
  5: [
    { id: 9, name: "Pembinaan Jambatan Tebedu" },
    { id: 10, name: "Projek Jalan Raya Tebedu" },
  ],
  6: [
    { id: 11, name: "Pembangunan Sistem IT Tebedu" },
    { id: 12, name: "Peningkatan Infrastruktur IT Tebedu" },
  ],
  7: [
    { id: 13, name: "Pembinaan Pejabat Kewangan Kota Bharu" },
    { id: 14, name: "Renovasi Pejabat Kewangan Kota Bharu" },
  ],
  8: [
    { id: 15, name: "Pembinaan Jambatan Kota Bharu" },
    { id: 16, name: "Projek Jalan Raya Kota Bharu" },
  ],
  9: [
    { id: 17, name: "Pembangunan Sistem IT Kota Bharu" },
    { id: 18, name: "Peningkatan Infrastruktur IT Kota Bharu" },
  ],
  10: [
    { id: 19, name: "Pembinaan Pejabat Kewangan Kuala Terengganu" },
    { id: 20, name: "Renovasi Pejabat Kewangan Kuala Terengganu" },
  ],
  11: [
    { id: 21, name: "Pembinaan Jambatan Kuala Terengganu" },
    { id: 22, name: "Projek Jalan Raya Kuala Terengganu" },
  ],
  12: [
    { id: 23, name: "Pembangunan Sistem IT Kuala Terengganu" },
    { id: 24, name: "Peningkatan Infrastruktur IT Kuala Terengganu" },
  ],
  13: [
    { id: 25, name: "Pembinaan Pejabat Kewangan Ipoh" },
    { id: 26, name: "Renovasi Pejabat Kewangan Ipoh" },
  ],
  14: [
    { id: 27, name: "Pembinaan Jambatan Ipoh" },
    { id: 28, name: "Projek Jalan Raya Ipoh" },
  ],
  15: [
    { id: 29, name: "Pembangunan Sistem IT Ipoh" },
    { id: 30, name: "Peningkatan Infrastruktur IT Ipoh" },
  ],
});

const disciplines = ref([
  { id: 1, name: "Arkitek" },
  { id: 2, name: "Struktur" },
  { id: 3, name: "Mekanikal" },
  { id: 4, name: "Elektrik" },
  { id: 5, name: "Ukur Bahan" },
]);

const selectedProject = ref("");
const selectedDiscipline = ref(disciplines.value[0]?.id || null);

// Watch for changes in selectedCabinet to reset selectedProject and selectedDiscipline
watch(selectedCabinet, (newVal) => {
  selectedProject.value = projects.value[newVal][0]?.id || null;
  selectedDiscipline.value = disciplines.value[0]?.id || null;
});

watch(selectedProject, () => {
  selectedDiscipline.value = disciplines.value[0]?.id || null;
});

const filteredGroups = computed(() => {
  return groups.value.filter(group => 
    group.cabinetId === selectedCabinet.value &&
    group.projectId === selectedProject.value &&
    group.disciplineId === selectedDiscipline.value
  );
});

const showDeleteButtons = ref(false);

const toggleDeleteButtons = () => {
  showDeleteButtons.value = !showDeleteButtons.value;
};

const accessTypes = ["view", "edit", "download", "upload", "print", "delete"];

const activeTab = ref("accessControl");

const newCabinet = ref({ name: "" });
const showAddCabinetModal = ref(false);

const openAddCabinetModal = () => {
  newCabinet.value.name = "";
  showAddCabinetModal.value = true;
};

const addCabinet = () => {
  if (newCabinet.value.name) {
    cabinets.value.push({ id: cabinets.value.length + 1, name: newCabinet.value.name });
    newCabinet.value.name = "";
    showAddCabinetModal.value = false;
  }
};

const newProject = ref({ name: "", cabinetId: null });
const showAddProjectModal = ref(false);

const openAddProjectModal = () => {
  newProject.value.name = "";
  newProject.value.cabinetId = selectedCabinet.value;
  showAddProjectModal.value = true;
};

const addProject = () => {
  if (newProject.value.name && newProject.value.cabinetId) {
    const projectList = projects.value[newProject.value.cabinetId] || [];
    projectList.push({ id: projectList.length + 1, name: newProject.value.name });
    projects.value[newProject.value.cabinetId] = projectList;
    newProject.value = { name: "", cabinetId: null };
    showAddProjectModal.value = false;
  }
};

const showDeleteProjectModal = ref(false);
const projectToDelete = ref(null);

const confirmDeleteProject = (cabinetId, index) => {
  projectToDelete.value = { cabinetId, index };
  showDeleteProjectModal.value = true;
};

const deleteProject = () => {
  if (projectToDelete.value !== null) {
    const { cabinetId, index } = projectToDelete.value;
    projects.value[cabinetId].splice(index, 1);
    projectToDelete.value = null;
    showDeleteProjectModal.value = false;
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
            <Tabs v-model="activeTab">
              <TabsList>
                <TabsTrigger value="cabinet">Cabinet</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="accessControl">Access Control</TabsTrigger>
              </TabsList>
              <TabsContent value="cabinet">
                <div class="space-y-8 mt-4">
                  <!-- Cabinet Content -->
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
              <TabsContent value="accessControl">
                <div class="space-y-8 mt-4">
                  <!-- Access Control Content -->
                  <!-- Cabinet Dropdown -->
                  <div>
                    <label for="cabinet" class="block text-sm font-medium text-gray-700">Select Cabinet</label>
                    <select id="cabinet" v-model="selectedCabinet" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option disabled value="">Select a Cabinet</option>
                      <option v-for="cabinet in cabinets" :key="cabinet.id" :value="cabinet.id">{{ cabinet.name }}</option>
                    </select>
                  </div>

                  <!-- Project and Discipline Dropdowns -->
                  <div v-if="selectedCabinet" class="flex gap-4">
                    <!-- Project Dropdown -->
                    <div class="flex-1">
                      <label for="project" class="block text-sm font-medium text-gray-700">Select Project</label>
                      <select id="project" v-model="selectedProject" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option disabled value="">Select a Project</option>
                        <option v-for="project in projects[selectedCabinet]" :key="project.id" :value="project.id">{{ project.name }}</option>
                      </select>
                    </div>

                    <!-- Discipline Dropdown -->
                    <div v-if="selectedProject" class="flex-1">
                      <label for="discipline" class="block text-sm font-medium text-gray-700">Select Discipline</label>
                      <select id="discipline" v-model="selectedDiscipline" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option disabled value="">Select a Discipline</option>
                        <option v-for="discipline in disciplines" :key="discipline.id" :value="discipline.id">{{ discipline.name }}</option>
                      </select>
                    </div>
                  </div>

                  <!-- Groups Table -->
                  <div v-if="selectedCabinet && selectedDiscipline">
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
              <TabsContent value="projects">
                <div class="space-y-8 mt-4">
                  <!-- Projects Content -->
                  <div class="flex justify-between items-center mb-2">
                    <h3 class="text-lg font-medium">Projects</h3>
                    <div class="flex space-x-2">
                      <Button @click="openAddProjectModal" class="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2">
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
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                          <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only"><Icon name="mdi:delete"></Icon></span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <template v-for="(projectList, cabinetId) in projects" :key="cabinetId">
                          <tr v-for="(project, index) in projectList" :key="project.id">
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ project.name }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button v-if="showDeleteButtons" @click="confirmDeleteProject(cabinetId, index)" variant="danger">
                                <Icon name="mdi:trash-can"></Icon>
                              </Button>
                            </td>
                          </tr>
                        </template>
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
          <!-- Hide Cabinet, Project, and Discipline dropdowns -->
          <div v-if="false">
            <label for="cabinetId" class="block text-sm font-medium text-gray-700">Cabinet</label>
            <select id="cabinetId" v-model="newGroup.cabinetId" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option disabled value="">Select a Cabinet</option>
              <option v-for="cabinet in cabinets" :key="cabinet.id" :value="cabinet.id">{{ cabinet.name }}</option>
            </select>
          </div>
          <div v-if="false">
            <label for="projectId" class="block text-sm font-medium text-gray-700">Project</label>
            <select id="projectId" v-model="newGroup.projectId" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option disabled value="">Select a Project</option>
              <option v-for="project in projects[selectedCabinet]" :key="project.id" :value="project.id">{{ project.name }}</option>
            </select>
          </div>
          <div v-if="false" class="mb-4">
            <label for="disciplineId" class="block text-sm font-medium text-gray-700">Discipline</label>
            <select id="disciplineId" v-model="newGroup.disciplineId" class="mt-1 mb-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option disabled value="">Select a Discipline</option>
              <option v-for="discipline in disciplines" :key="discipline.id" :value="discipline.id">{{ discipline.name }}</option>
            </select>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button @click="addGroup" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Group</Button>
        <Button @click="showAddGroupModal = false" class=" mt-4 ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</Button>
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

    <!-- Add Project Modal -->
    <Modal v-model:open="showAddProjectModal">
      <ModalHeader>
        <ModalTitle>Add Project</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div class="space-y-4">
          <div>
            <label for="projectName" class="block text-sm font-medium text-gray-700">Project Name</label>
            <input id="projectName" v-model="newProject.name" type="text" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          </div>
          <div>
            <label for="projectCabinetId" class="block text-sm font-medium text-gray-700">Cabinet</label>
            <select id="projectCabinetId" v-model="newProject.cabinetId" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option disabled value="">Select a Cabinet</option>
              <option v-for="cabinet in cabinets" :key="cabinet.id" :value="cabinet.id">{{ cabinet.name }}</option>
            </select>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button @click="addProject" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Project</Button>
        <Button @click="showAddProjectModal = false" class="mt-4 ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</Button>
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

    <!-- Delete Project Confirmation Modal -->
    <Modal v-model:open="showDeleteProjectModal">
      <ModalHeader>
        <ModalTitle>Confirm Delete</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>Are you sure you want to delete this project?</p>
      </ModalBody>
      <ModalFooter>
        <Button @click="deleteProject" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</Button>
        <Button @click="showDeleteProjectModal = false" class="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</Button>
      </ModalFooter>
    </Modal>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply text-foreground font-medium;
}
</style>
