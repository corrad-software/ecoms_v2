<script setup>
definePageMeta({
  layout: "admin",
});

import { ref, computed, onMounted } from 'vue';
import PdfViewer from "./components/PdfViewer.vue";

const viewer = ref(null);

onMounted(async () => {
  const WebViewer = (await import('@pdftron/webviewer')).default;
  
  if (!viewer.value) {
    console.error('Viewer element not found');
    return;
  }

  WebViewer(
    {
      path: '/pdftron',
      initialDoc: '/pdf/ACFrOgDnI38nHOu8yjKkBZpA5lIJ_ImGLXx67w0Ju7nVj_SGznwL7VX6MWNCJuJs7PzNwjdyoXE4_VzpZTYv0PyGE678nP4HCLGuCl35awoknybqVSrcBVcmbcPvVyBSY4Mr7DvEbrN4nRs9Wwt9.pdf',
      licenseKey: 'demo:1741050364197:614a2141030000000080772b27d2263ea9e59f4e777868bbdfb442ce4e',
      enableFilePicker: true,
      fullAPI: false,
      enableRedaction: true, // Enable redaction tools
      enableMeasurement: false, // Enable measurement tools
      enableAnnotations: true, // Enable annotation tools
      showToolbarControl: true, // Show the toolbar
      annotationUser: 'Current User', // Set the current user for annotations
    },
    viewer.value
  ).then((instance) => {
    const { documentViewer, annotationManager, Tools, Annotations } = instance.Core;

    instance.UI.setLayoutMode(instance.UI.LayoutMode.Single);
    instance.UI.closeElements(['printModal']);


    

    // Add error handling
    documentViewer.addEventListener('documentLoadFailure', function(error) {
      console.error('Error loading document:', error);
    });


    // Add success handling
    documentViewer.addEventListener('documentLoaded', function() {
      console.log('Document loaded successfully');

      setTimeout(() => {
        instance.UI.closeElements(['printModal']);
      }, 500);
    });

    

    // Enable all annotation tools
    instance.UI.enableFeatures([instance.UI.Feature.Annotations]);

    // Enable features for editing
    instance.UI.enableElements(['downloadButton', 'printButton', 'saveButton']);

    // Add custom save button handler
    instance.UI.setHeaderItems((header) => {
      header.push({
        type: 'actionButton',
        img: 'icon-save',
        onClick: async () => {
          const doc = documentViewer.getDocument();
          const xfdfString = await annotationManager.exportAnnotations();
          const data = await doc.getFileData({
            // Include annotations in saved file
            xfdfString,
            // Include any document modifications
            incremental: true,
            // Save as PDF
            downloadType: 'pdf'
          });
          // Handle the saved data here
          console.log('PDF saved:', data);
        }
      });
    });
  })
  .catch(error => {
    console.error('Error initializing WebViewer:', error);
  });
});


const recentActivity = ref([
  { fileName: "Document1.pdf", fileSize: "2 MB", fileType: "PDF", daysLeft: 5, metadata: { tajuk: "Tajuk 1", perkara: "Perkara 1", negeri: "Negeri 1", tarikh: "2023-01-01", nama: "John Doe", fulltext: "Fulltext 1", storeDate: "2023-01-10", namaFail: "Document1.pdf", user: "User1" } },
  { fileName: "Image1.png", fileSize: "1.5 MB", fileType: "Image", daysLeft: 3, metadata: { tajuk: "Tajuk 2", perkara: "Perkara 2", negeri: "Negeri 2", tarikh: "2023-02-01", nama: "Jane Smith", fulltext: "Fulltext 2", storeDate: "2023-02-05", namaFail: "Image1.png", user: "User2" } },
  { fileName: "Presentation.pptx", fileSize: "5 MB", fileType: "Presentation", daysLeft: 7, metadata: { tajuk: "Tajuk 3", perkara: "Perkara 3", negeri: "Negeri 3", tarikh: "2023-03-01", nama: "Alice Johnson", fulltext: "Fulltext 3", storeDate: "2023-03-15", namaFail: "Presentation.pptx", user: "User3" } },
  { fileName: "Spreadsheet.xlsx", fileSize: "3 MB", fileType: "Spreadsheet", daysLeft: 2, metadata: { tajuk: "Tajuk 4", perkara: "Perkara 4", negeri: "Negeri 4", tarikh: "2023-04-01", nama: "Bob Brown", fulltext: "Fulltext 4", storeDate: "2023-04-10", namaFail: "Spreadsheet.xlsx", user: "User4" } },
]);

const googleDocsViewerUrl = "https://docs.google.com/viewer?url=https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf&embedded=true";
const googleDocsViewerUrl2 = "https://app.luminpdf.com/viewer/67bb310ea62eacba01700e66?action=upload&from=functional-landing-page";
const isGridView = ref(false);

const toggleView = () => {
  isGridView.value = !isGridView.value;
};

const sortData = () => {
  recentActivity.value.sort((a, b) => a.fileName.localeCompare(b.fileName));
};

const addData = () => {
  recentActivity.value.push({
    fileName: "NewDocument.docx",
    fileSize: "1 MB",
    fileType: "Document",
    daysLeft: 10,
  });
};

const searchQuery = ref('');

const filteredActivity = computed(() => {
  return recentActivity.value.filter(activity =>
    activity.fileName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    activity.fileType.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const transferToCabinet = (fileName) => {
  console.log(`Transferring ${fileName} to cabinet`);
};

const buttonTooltips = {
  toggleView: "Tukar antara paparan grid dan senarai",
  sortData: "Susun dokumen mengikut nama",
  addData: "Tambah dokumen baru",
  transferToCabinet: "Pindahkan ke kabinet"
};

const selectedDocument = ref(null);

const selectDocument = (document) => {
  selectedDocument.value = document;
};

const isOpen = ref(false);

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

const addDocument = () => {
  recentActivity.value.push({
    fileName: formData.value.documentName,
    fileSize: "1 MB", // You can adjust this value as needed
    fileType: "Document", // You can adjust this value as needed
    daysLeft: 10, // You can adjust this value as needed
    metadata: {
      tajuk: formData.value.tajuk,
      perkara: formData.value.perkara,
      negeri: formData.value.negeri,
      tarikh: format(new Date(formData.value.tarikh), 'dd/MM/yyyy'),
      nama: formData.value.user,
      fulltext: formData.value.fulltext,
      storeDate: format(new Date(formData.value.tarikhSimpan), 'dd/MM/yyyy'),
      namaFail: formData.value.namaFail,
      user: formData.value.user
    }
  });
  closeModal();
};

const formData = ref({
  documentName: '',
  tajuk: '',
  perkara: '',
  negeri: '',
  tarikh: '',
  namaFail: '',
  user: '',
  fulltext: '',
  tarikhSimpan: ''
});

const statesInMalaysia = [
  'Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 'Perlis', 'Putrajaya', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu'
];

const cabinetActivity = ref([
  { fileName: "ArchivedDocument1.pdf", fileSize: "2 MB", fileType: "PDF", metadata: { tajuk: "Tajuk A", perkara: "Perkara A", negeri: "Negeri A", tarikh: "2022-01-01", nama: "John Doe", fulltext: "Fulltext A", storeDate: "2022-01-10", namaFail: "ArchivedDocument1.pdf", user: "UserA" } },
  { fileName: "ArchivedImage1.png", fileSize: "1.5 MB", fileType: "Image", metadata: { tajuk: "Tajuk B", perkara: "Perkara B", negeri: "Negeri B", tarikh: "2022-02-01", nama: "Jane Smith", fulltext: "Fulltext B", storeDate: "2022-02-05", namaFail: "ArchivedImage1.png", user: "UserB" } },
  { fileName: "ArchivedPresentation.pptx", fileSize: "5 MB", fileType: "Presentation", metadata: { tajuk: "Tajuk C", perkara: "Perkara C", negeri: "Negeri C", tarikh: "2022-03-01", nama: "Alice Johnson", fulltext: "Fulltext C", storeDate: "2022-03-15", namaFail: "ArchivedPresentation.pptx", user: "UserC" } },
  { fileName: "ArchivedSpreadsheet.xlsx", fileSize: "3 MB", fileType: "Spreadsheet", metadata: { tajuk: "Tajuk D", perkara: "Perkara D", negeri: "Negeri D", tarikh: "2022-04-01", nama: "Bob Brown", fulltext: "Fulltext D", storeDate: "2022-04-10", namaFail: "ArchivedSpreadsheet.xlsx", user: "UserD" } },
]);

const removeFromCabinet = (fileName) => {
  console.log(`Removing ${fileName} from cabinet`);
  // Implement the logic to remove the document from the cabinet
};

const selectedCabinet = ref("Select a Cabinet");
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

const cabinetSearchQuery = ref('');

const filteredCabinetActivity = computed(() => {
  return cabinetActivity.value.filter(activity =>
    activity.fileName.toLowerCase().includes(cabinetSearchQuery.value.toLowerCase()) ||
    activity.fileType.toLowerCase().includes(cabinetSearchQuery.value.toLowerCase())
  );
});

const totalFiles = computed(() => recentActivity.value.length);
const filesNeedingAction = computed(() => recentActivity.value.filter(activity => activity.daysLeft <= 5).length);
const trayClearanceDate = ref('31/12/2023'); // Contoh tarikh, sesuaikan mengikut keperluan

// Modify catalogue items structure
const catalogueItems = ref([
  {
    id: 1,
    planName: "PAP SIRI 2 EDISI 1",
    description: "Standard residential plan series 2 edition 1",
    flipbookUrl: "https://online.fliphtml5.com/example1/flip.html",
    status: "Active",
    lastUpdated: "2024-01-15"
  },
  {
    id: 2,
    planName: "PAP SIRI 2 EDISI 2",
    description: "Standard residential plan series 2 edition 2",
    flipbookUrl: "https://online.fliphtml5.com/example2/flip.html",
    status: "Active",
    lastUpdated: "2024-01-15"
  },
]);

// Modify form data structure
const catalogueFormData = ref({
  planName: '',
  description: '',
  flipbookUrl: '',
  status: 'Active'
});

// Add selected plan state
const selectedPlan = ref(null);
const showCatalogueModal = ref(false);
const modalMode = ref('add');
const selectedItem = ref(null);
const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const selectPlan = (plan) => {
  selectedPlan.value = plan;
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false;
  }
};

// Modify reset form function
const resetCatalogueForm = () => {
  catalogueFormData.value = {
    planName: '',
    description: '',
    flipbookUrl: '',
    status: 'Active'
  };
};

// Add new state management for catalogue items
const categories = [
  'Residential',
  'Commercial',
  'Industrial',
  'Mixed Development',
  'Public Infrastructure'
];

// Catalogue management functions
const openCatalogueModal = (mode, item = null) => {
  modalMode.value = mode;
  if (item && (mode === 'edit' || mode === 'delete')) {
    selectedItem.value = item;
    catalogueFormData.value = { ...item };
  } else {
    resetCatalogueForm();
  }
  showCatalogueModal.value = true;
};

const handleCatalogueSubmit = () => {
  if (modalMode.value === 'add') {
    catalogueItems.value.push({
      id: Date.now(),
      ...catalogueFormData.value,
      lastUpdated: new Date().toISOString().split('T')[0]
    });
  } else if (modalMode.value === 'edit') {
    const index = catalogueItems.value.findIndex(item => item.id === selectedItem.value.id);
    catalogueItems.value[index] = {
      ...catalogueFormData.value,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
  } else if (modalMode.value === 'delete') {
    catalogueItems.value = catalogueItems.value.filter(item => item.id !== selectedItem.value.id);
  }
  showCatalogueModal.value = false;
  resetCatalogueForm();
};

// Search and filter functionality
const catalogueSearch = ref('');
const filteredCatalogue = computed(() => {
  return catalogueItems.value.filter(item => 
    item.planName.toLowerCase().includes(catalogueSearch.value.toLowerCase()) ||
    item.description.toLowerCase().includes(catalogueSearch.value.toLowerCase())
  );
});
</script>

<template>
  <div class="h-screen flex flex-col">
    <!-- Header -->
    <div class="bg-white border-b px-4 py-4 flex justify-between items-center">
      <div class="flex items-center">
        <button @click="toggleSidebar" class="p-2 hover:bg-gray-100 rounded-lg mr-4">
          <Icon :name="isSidebarOpen ? 'mdi:menu-open' : 'mdi:menu'" size="24" />
        </button>
        <h1 class="text-xl font-bold">Building Plans Catalogue</h1>
      </div>
      <Button @click="openCatalogueModal('add')" class="bg-primary text-white px-4 py-2 rounded-lg">
        <Icon name="mdi:plus" class="mr-2" />
        Add New Plan
      </Button>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Sidebar -->
      <div
        class="bg-white border-r transition-all duration-300 flex flex-col"
        :class="isSidebarOpen ? 'w-80' : 'w-0'"
      >
        <div class="p-4 border-b" v-show="isSidebarOpen">
          <div class="relative">
            <input
              v-model="catalogueSearch"
              type="text"
              placeholder="Search plans..."
              class="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <Icon name="mdi:magnify" class="absolute left-3 top-2.5 text-gray-400" size="20" />
          </div>
        </div>
        <div class="flex-1 overflow-y-auto" v-show="isSidebarOpen">
          <div
            v-for="item in filteredCatalogue"
            :key="item.id"
            @click="selectPlan(item)"
            class="p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b"
            :class="{'bg-gray-50': selectedPlan?.id === item.id}"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-medium">{{ item.planName }}</h3>
                <p class="text-sm text-gray-600">{{ item.description }}</p>
              </div>
              <div class="flex gap-2">
                <button
                  @click.stop="openCatalogueModal('edit', item)"
                  class="text-blue-600 hover:text-blue-800"
                >
                  <Icon name="mdi:pencil" size="18" />
                </button>
                <button
                  @click.stop="openCatalogueModal('delete', item)"
                  class="text-red-600 hover:text-red-800"
                >
                  <Icon name="mdi:delete" size="18" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 bg-gray-50 overflow-hidden">
        <div v-if="selectedPlan" class="h-full">
          <div class="bg-white border-b px-4 py-3">
            <h2 class="text-lg font-semibold">{{ selectedPlan.planName }}</h2>
            <p class="text-sm text-gray-600">{{ selectedPlan.description }}</p>
          </div>
          <iframe
            :src="selectedPlan.flipbookUrl"
            class="w-full h-[calc(100%-4rem)]"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
        <div v-else class="h-full flex items-center justify-center text-gray-500">
          <div class="text-center">
            <Icon name="mdi:book-open-page-variant" size="48" class="mb-2" />
            <p>Select a plan from the list to view its details</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal remains the same -->
    <Modal v-model:open="showCatalogueModal">
      <ModalHeader>
        <ModalTitle>
          {{ modalMode === 'add' ? 'Add New Plan' : modalMode === 'edit' ? 'Edit Plan' : 'Delete Plan' }}
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <form v-if="modalMode !== 'delete'" @submit.prevent="handleCatalogueSubmit" class="space-y-4">
          <div class="space-y-4">
            <FormKit
              type="text"
              v-model="catalogueFormData.planName"
              label="Plan Name"
              validation="required"
            />
            <FormKit
              type="select"
              v-model="catalogueFormData.status"
              :options="['Active', 'Inactive']"
              label="Status"
            />
            <FormKit
              type="textarea"
              v-model="catalogueFormData.description"
              label="Description"
              validation="required"
            />
            <FormKit
              type="url"
              v-model="catalogueFormData.flipbookUrl"
              label="Flipbook URL"
              validation="required|url"
              placeholder="https://online.fliphtml5.com/example/flip.html"
            />
          </div>
          <div class="flex justify-end space-x-2">
            <Button variant="outline" @click="showCatalogueModal = false">Cancel</Button>
            <Button type="submit" class="bg-primary text-white">
              {{ modalMode === 'add' ? 'Add Plan' : 'Save Changes' }}
            </Button>
          </div>
        </form>
        <div v-else class="text-center py-4">
          <p class="mb-4">Are you sure you want to delete this plan?</p>
          <div class="flex justify-center space-x-2">
            <Button variant="outline" @click="showCatalogueModal = false">Cancel</Button>
            <Button @click="handleCatalogueSubmit" class="bg-red-600 text-white">Delete</Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  </div>
</template>

<style scoped>
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
</style>
