<script setup>
definePageMeta({
  layout: "admin",
});

import { ref, computed } from 'vue';


const recentActivity = ref([
  { fileName: "Document1.pdf", fileSize: "2 MB", fileType: "PDF", daysLeft: 5, metadata: { tajuk: "Tajuk 1", perkara: "Perkara 1", negeri: "Negeri 1", tarikh: "2023-01-01", nama: "John Doe", fulltext: "Fulltext 1", storeDate: "2023-01-10", namaFail: "Document1.pdf", user: "User1" } },
  { fileName: "Image1.png", fileSize: "1.5 MB", fileType: "Image", daysLeft: 3, metadata: { tajuk: "Tajuk 2", perkara: "Perkara 2", negeri: "Negeri 2", tarikh: "2023-02-01", nama: "Jane Smith", fulltext: "Fulltext 2", storeDate: "2023-02-05", namaFail: "Image1.png", user: "User2" } },
  { fileName: "Presentation.pptx", fileSize: "5 MB", fileType: "Presentation", daysLeft: 7, metadata: { tajuk: "Tajuk 3", perkara: "Perkara 3", negeri: "Negeri 3", tarikh: "2023-03-01", nama: "Alice Johnson", fulltext: "Fulltext 3", storeDate: "2023-03-15", namaFail: "Presentation.pptx", user: "User3" } },
  { fileName: "Spreadsheet.xlsx", fileSize: "3 MB", fileType: "Spreadsheet", daysLeft: 2, metadata: { tajuk: "Tajuk 4", perkara: "Perkara 4", negeri: "Negeri 4", tarikh: "2023-04-01", nama: "Bob Brown", fulltext: "Fulltext 4", storeDate: "2023-04-10", namaFail: "Spreadsheet.xlsx", user: "User4" } },
]);

const googleDocsViewerUrl = "https://docs.google.com/viewer?url=https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf&embedded=true";

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
  addData: "Add a new document",
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
      tajuk: formData.value.tajuk,
      perkara: formData.value.perkara,
      negeri: formData.value.negeri,
      tarikh: formData.value.tarikh,
      nama: formData.value.user,
      fulltext: formData.value.fulltext,
      storeDate: formData.value.tarikhSimpan,
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

</script>

<template>
  <div class="grid grid-cols-5 gap-4 h-[calc(100vh-140px)]">
    <div class="col-span-4 grid grid-cols-10 gap-4">
      <div class="col-span-6 flex flex-col h-full">
        <!-- Recent Activity -->
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
                  <p class="text-sm">Unassigned documents are placed here.</p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </CardHeader>
          <CardContent>
            <div class="flex justify-between items-center mb-4 overflow-y-auto">
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
                  <Badge>{{ activity.daysLeft }} days left</Badge>
                  <Button @click.stop="transferToCabinet(activity.fileName)" variant="ghost" class="text-sm py-1 px-2">
                    <Icon name="mdi:folder-move" class="h-4 w-4 text-default" />
                  </Button>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 overflow-y-auto h-[calc(100vh-300px)]" v-else>
              <div
                v-for="activity in filteredActivity"
                :key="activity.fileName"
                class="p-4 border rounded cursor-pointer"
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
                  <Badge>{{ activity.daysLeft }} days left</Badge>
                  <Button @click.stop="transferToCabinet(activity.fileName)" variant="ghost" class="text-sm py-1 px-2">
                    <Icon name="mdi:folder-move" class="h-4 w-4 text-info" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div class="col-span-4 flex flex-col h-full">
        <!-- Add any additional content or cards here for the 40% column -->
        <Card class="flex-grow h-full">
          <!-- Document Viewer Section -->
          <iframe :src="googleDocsViewerUrl" width="100%" class="h-full"></iframe>
        </Card>
      </div>
    </div>
    <div class="col-span-1 flex flex-col h-full">
      <!-- Cabinet Section -->
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
              <option disabled value="Select a Cabinet">Select a Cabinet</option>
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
  <Modal v-model:open="isOpen" size="5xl" class="h-3/4">
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
    <ModalBody>
      <div class="grid grid-cols-10 gap-4 h-full">
        <div class="col-span-3">
            <FormKit type="file" name="documentName" label="Document Name" validation="required" />
            <FormKit type="text" name="tajuk" label="Tajuk" validation="required" />
            <FormKit type="text" name="perkara" label="Perkara" validation="required" />
            <FormKit type="select" name="negeri" label="Negeri" :options="statesInMalaysia" validation="required" />
            <FormKit type="date" name="tarikh" label="Tarikh" validation="required" />
            <FormKit type="text" name="namaFail" label="Nama Fail" validation="required" />
            <FormKit type="text" name="user" label="User" validation="required" />
            <FormKit type="textarea" name="fulltext" label="Fulltext" validation="required" />
            <FormKit type="date" name="tarikhSimpan" label="Tarikh Simpan" validation="required" />
            <div class="flex justify-end space-x-2 mt-4">
              <Button variant="outline" @click="closeModal">Cancel</Button>
              <Button @click="addDocument">Add Document</Button>
            </div>
        </div>
        <div class="col-span-7">
          <iframe :src="googleDocsViewerUrl" width="100%" class="h-full"></iframe>
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
