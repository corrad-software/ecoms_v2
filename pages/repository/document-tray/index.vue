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
  { fileName: "Document1.pdf", fileSize: "2 MB", fileType: "PDF", daysLeft: 5, metadata: { title: "Title 1", matter: "Matter 1", state: "State 1", date: "2023-01-01", name: "John Doe", fulltext: "Fulltext 1", storeDate: "2023-01-10", fileName: "Document1.pdf", user: "User1" } },
  { fileName: "Image1.png", fileSize: "1.5 MB", fileType: "Image", daysLeft: 3, metadata: { title: "Title 2", matter: "Matter 2", state: "State 2", date: "2023-02-01", name: "Jane Smith", fulltext: "Fulltext 2", storeDate: "2023-02-05", fileName: "Image1.png", user: "User2" } },
  { fileName: "Presentation.pptx", fileSize: "5 MB", fileType: "Presentation", daysLeft: 7, metadata: { title: "Title 3", matter: "Matter 3", state: "State 3", date: "2023-03-01", name: "Alice Johnson", fulltext: "Fulltext 3", storeDate: "2023-03-15", fileName: "Presentation.pptx", user: "User3" } },
  { fileName: "Spreadsheet.xlsx", fileSize: "3 MB", fileType: "Spreadsheet", daysLeft: 2, metadata: { title: "Title 4", matter: "Matter 4", state: "State 4", date: "2023-04-01", name: "Bob Brown", fulltext: "Fulltext 4", storeDate: "2023-04-10", fileName: "Spreadsheet.xlsx", user: "User4" } },
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
  toggleView: "Toggle between grid and list view",
  sortData: "Sort documents by name",
  addData: "Add new document",
  transferToCabinet: "Transfer to cabinet"
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
      title: formData.value.title,
      matter: formData.value.matter,
      state: formData.value.state,
      date: format(new Date(formData.value.date), 'dd/MM/yyyy'),
      name: formData.value.user,
      fulltext: formData.value.fulltext,
      storeDate: format(new Date(formData.value.storeDate), 'dd/MM/yyyy'),
      fileName: formData.value.fileName,
      user: formData.value.user
    }
  });
  closeModal();
};

const formData = ref({
  documentName: '',
  title: '',
  matter: '',
  state: '',
  date: '',
  fileName: '',
  user: '',
  fulltext: '',
  storeDate: ''
});

const statesInMalaysia = [
  'Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 'Perlis', 'Putrajaya', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu'
];

const cabinetActivity = ref([
  { fileName: "ArchivedDocument1.pdf", fileSize: "2 MB", fileType: "PDF", metadata: { title: "Title A", matter: "Matter A", state: "State A", date: "2022-01-01", name: "John Doe", fulltext: "Fulltext A", storeDate: "2022-01-10", fileName: "ArchivedDocument1.pdf", user: "UserA" } },
  { fileName: "ArchivedImage1.png", fileSize: "1.5 MB", fileType: "Image", metadata: { title: "Title B", matter: "Matter B", state: "State B", date: "2022-02-01", name: "Jane Smith", fulltext: "Fulltext B", storeDate: "2022-02-05", fileName: "ArchivedImage1.png", user: "UserB" } },
  { fileName: "ArchivedPresentation.pptx", fileSize: "5 MB", fileType: "Presentation", metadata: { title: "Title C", matter: "Matter C", state: "State C", date: "2022-03-01", name: "Alice Johnson", fulltext: "Fulltext C", storeDate: "2022-03-15", fileName: "ArchivedPresentation.pptx", user: "UserC" } },
  { fileName: "ArchivedSpreadsheet.xlsx", fileSize: "3 MB", fileType: "Spreadsheet", metadata: { title: "Title D", matter: "Matter D", state: "State D", date: "2022-04-01", name: "Bob Brown", fulltext: "Fulltext D", storeDate: "2022-04-10", fileName: "ArchivedSpreadsheet.xlsx", user: "UserD" } },
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
const trayClearanceDate = ref('31/12/2023'); // Example date, adjust as needed

</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 h-[calc(100vh-140px)]">
    <div class="col-span-1 lg:col-span-4 grid grid-cols-1 lg:grid-cols-10 gap-4">
      <div class="col-span-1 lg:col-span-6 flex flex-col h-full">
        <!-- Bahagian Visualisasi -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
          <Card class="flex items-center justify-between p-2">
            <div class="flex items-center space-x-2">
              <Icon name="mdi:file-document-outline" class="h-6 w-6 text-primary" />
              <p class="text-sm font-semibold">File Left</p>
            </div>
            <p class="text-lg">{{ totalFiles }}</p>
          </Card>
          <Card class="flex items-center justify-between p-2">
            <div class="flex items-center space-x-2">
              <Icon name="mdi:calendar-clock" class="h-6 w-6 text-info" />
              <p class="text-sm font-semibold">Next Cleaning Date</p>
            </div>
            <p class="text-lg">{{ trayClearanceDate }}</p>
          </Card>
        </div>
        <!-- Aktiviti Terkini -->
        <Card class="flex-grow h-full">
          <CardHeader class="flex flex-row justify-between">
            <div class="flex items-center space-x-2">
              <CardTitle>Document Tray</CardTitle>
              <HoverCard>
                <HoverCardTrigger>
                  <Button variant="ghost">
                    <Icon name="mdi:information-outline" class="h-4 w-4" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent side="right" align="start">
                  <p class="text-sm">Documents that have not been organized are placed here.</p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </CardHeader>
          <CardContent>
            <div class="flex flex-col sm:flex-row justify-between items-center mb-4 overflow-y-auto">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search..."
                class="input input-bordered w-full max-w-xs text-sm py-1 px-2"
              />
              <div class="flex space-x-2">
                <Button @click="toggleView" class="btn btn-primary text-white text-sm py-1 px-2">
                  <Icon :name="isGridView ? 'mdi:view-list' : 'mdi:view-grid'" class="h-4 w-4" />
                </Button>
                <Button @click="sortData" class="btn btn-secondary text-white text-sm py-1 px-2">
                  <Icon name="mdi:sort" class="h-4 w-4" />
                </Button>
                <Button @click="openModal" class="btn btn-success text-white text-sm py-1 px-2">
                  <Icon name="mdi:plus" class="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div class="divide-y divide-border overflow-y-auto h-[calc(100vh-300px)]" v-if="!isGridView">
              <div
                v-for="activity in filteredActivity"
                :key="activity.fileName"
                class="py-2 flex items-center justify-between cursor-pointer"
                @click="selectDocument(activity)"
              >
                <div class="flex items-center space-x-2">
                  <Icon :name="`mdi:file-${activity.fileType.toLowerCase() === 'presentation' ? 'powerpoint' : activity.fileType.toLowerCase() === 'spreadsheet' ? 'excel' : activity.fileType.toLowerCase()}`" class="h-5 w-5" />
                  <p class="font-medium text-sm">{{ activity.fileName }}</p>
                  <p class="text-xs text-muted-foreground">{{ activity.fileSize }} - {{ activity.fileType }}</p>
                </div>
                <div class="flex items-center space-x-2">
                  <Badge class="text-xs">{{ activity.daysLeft }} days left</Badge>
                  <Button @click.stop="transferToCabinet(activity.fileName)" variant="ghost" class="text-xs py-1 px-2">
                    <Icon name="mdi:folder-move" class="h-4 w-4 text-default" />
                  </Button>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto h-[calc(100vh-300px)]" v-else>
              <div
                v-for="activity in filteredActivity"
                :key="activity.fileName"
                class="p-2 border rounded cursor-pointer"
                @click="selectDocument(activity)"
              >
                <div class="flex items-center space-x-2">
                  <Icon :name="`mdi:file-${activity.fileType.toLowerCase() === 'presentation' ? 'powerpoint' : activity.fileType.toLowerCase() === 'spreadsheet' ? 'excel' : activity.fileType.toLowerCase()}`" class="h-5 w-5" />
                  <p class="font-medium text-sm">{{ activity.fileName }}</p>
                  <p class="text-xs text-muted-foreground">{{ activity.fileSize }} - {{ activity.fileType }}</p>
                </div>
                <div class="flex items-center space-x-2">
                  <Badge class="text-xs">{{ activity.daysLeft }} days left</Badge>
                  <Button @click.stop="transferToCabinet(activity.fileName)" variant="ghost" class="text-xs py-1 px-2">
                    <Icon name="mdi:folder-move" class="h-4 w-4 text-info" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div class="col-span-1 lg:col-span-4 flex flex-col h-full">
        <Card class="flex-grow h-full">
          <!-- Remove or comment out these lines -->
          <!-- <iframe :src="googleDocsViewerUrl2" width="100%" class="h-full min-h-[300px] lg:min-h-[500px]"></iframe> -->
          <!-- <PdfViewer /> -->
          
          <!-- Add this line -->
          <div ref="viewer" class="h-full"></div>

        </Card>
      </div>
    </div>
    <div class="col-span-1 flex flex-col h-full">
      <!-- Bahagian Kabinet -->
      <Card class="flex-grow h-full">
        <CardHeader class="flex flex-row justify-between">
          <div class="flex items-center space-x-2">
            <CardTitle>Cabinet</CardTitle>
            <HoverCard>
              <HoverCardTrigger>
                <Button variant="ghost">
                  <Icon name="mdi:information-outline" class="h-4 w-4" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent side="right" align="start">
                <p class="text-sm">Documents in the cabinet are stored here.</p>
              </HoverCardContent>
            </HoverCard>
          </div>
        </CardHeader>
        <CardContent>
          <div class="flex flex-col space-y-2 mb-4 overflow-y-auto">
            <select v-model="selectedCabinet" class="select select-bordered w-full max-w-xs text-sm py-1 px-2">
              <option disabled value="Select a Cabinet">Select Cabinet</option>
              <option v-for="cabinet in cabinets" :key="cabinet.id" :value="cabinet.name">{{ cabinet.name }}</option>
            </select>
            <div class="flex space-x-2">
              <input
                v-model="cabinetSearchQuery"
                type="text"
                placeholder="Search..."
                class="input input-bordered w-full max-w-xs text-sm py-1 px-2"
              />
              <Button @click="sortData" class="btn btn-secondary text-white text-sm py-1 px-2">
                <Icon name="mdi:sort" class="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div class="divide-y divide-border overflow-y-auto h-[calc(100vh-300px)]">
            <div
              v-for="activity in filteredCabinetActivity"
              :key="activity.fileName"
              class="py-3 flex items-center justify-between cursor-pointer"
              @click="selectDocument(activity)"
            >
              <div class="flex items-center">
                <Icon :name="`mdi:file-${activity.fileType.toLowerCase() === 'presentation' ? 'powerpoint' : activity.fileType.toLowerCase() === 'spreadsheet' ? 'excel' : activity.fileType.toLowerCase()}`" class="h-6 w-6 mr-2" />
                <div>
                  <p class="font-medium">{{ activity.fileName }}</p>
                  <p class="text-sm text-muted-foreground">{{ activity.fileSize }} - {{ activity.fileType }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <Button @click.stop="removeFromCabinet(activity.fileName)" variant="ghost" class="text-sm py-1 px-2">
                  <Icon name="mdi:folder-remove" class="h-4 w-4 text-default" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
  <Modal v-model:open="isOpen" size="5xl" class="max-h-[90vh] overflow-hidden">
    <ModalHeader>
      <div class="flex justify-between items-center w-full">
        <div>
          <ModalTitle>Add New Document</ModalTitle>
          <ModalDescription>Fill in the details below to add a new document.</ModalDescription>
        </div>
        <Button variant="ghost" @click="closeModal">
          <Icon name="mdi:close" class="h-6 w-6" />
        </Button>
      </div>
    </ModalHeader>
    <ModalBody class="overflow-y-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
        <!-- Form Section -->
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <FormKit
              type="file"
              name="documentName"
              label="Document"
              validation="required"
              help="Upload your document file"
            />
            
            <div class="grid grid-cols-2 gap-4">
              <FormKit
                type="text"
                name="title"
                label="Title"
                validation="required"
                placeholder="Enter document title"
              />
              <FormKit
                type="text"
                name="matter"
                label="Matter"
                validation="required"
                placeholder="Enter matter"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <FormKit
                type="select"
                name="state"
                label="State"
                :options="statesInMalaysia"
                validation="required"
                placeholder="Select state"
              />
              <FormKit
                type="date"
                name="date"
                label="Date"
                validation="required"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <FormKit
                type="text"
                name="fileName"
                label="File Name"
                validation="required"
                placeholder="Enter file name"
              />
              <FormKit
                type="text"
                name="user"
                label="User"
                validation="required"
                placeholder="Enter user name"
              />
            </div>

            <FormKit
              type="textarea"
              name="fulltext"
              label="Full Text"
              validation="required"
              placeholder="Enter full text"
              rows="3"
            />

            <FormKit
              type="date"
              name="storeDate"
              label="Store Date"
              validation="required"
            />

            <div class="flex justify-end space-x-2 mt-4">
              <Button variant="outline" @click="closeModal">Cancel</Button>
              <Button @click="addDocument">Add Document</Button>
            </div>
          </div>
        </div>

        <!-- Preview Section -->
        <div class="h-[600px] border rounded-lg overflow-hidden">
          <iframe 
            :src="googleDocsViewerUrl" 
            width="100%" 
            height="100%" 
            class="border-0"
          ></iframe>
        </div>
      </div>
    </ModalBody>
  </Modal>
</template>

<style scoped>

.text-gray-700 {
  color: #4a5568;
}


</style>
