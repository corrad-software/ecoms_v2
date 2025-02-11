<script setup>
definePageMeta({
  layout: "admin",
});

const rooms = ref([
  { id: 1, name: "JKR Cawangan Tebedu, Sarawak", cabinets: [4, 5, 6] },
  { id: 2, name: "JKR Cawangan Batu Kawan, Penang", cabinets: [1, 2, 3] },
  { id: 3, name: "JKR Cawangan Kota Bharu, Kelantan", cabinets: [7, 8, 9] },
  { id: 4, name: "JKR Cawangan Kuala Terengganu, Terengganu", cabinets: [10, 11, 12] },
  { id: 5, name: "JKR Cawangan Ipoh, Perak", cabinets: [13, 14, 15] },
]);

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

const disciplines = ref([
  { id: 1, name: "Arkitek" },
  { id: 2, name: "Struktur" },
  { id: 3, name: "Mekanikal" },
  { id: 4, name: "Elektrik" },
  { id: 5, name: "Ukur Bahan" },
]);

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

const selectedRoom = ref("");
const selectedCabinet = ref("");
const selectedProject = ref("");
const selectedDiscipline = ref("");

const filteredCabinets = computed(() => {
  if (selectedRoom.value) {
    return cabinets.value.filter(cabinet => rooms.value.find(room => room.id === selectedRoom.value).cabinets.includes(cabinet.id));
  }
  return [];
});

const filteredProjects = computed(() => {
  if (selectedCabinet.value) {
    return projects.value[selectedCabinet.value] || [];
  }
  return [];
});

const filteredDisciplines = computed(() => {
  return disciplines.value;
});

const searchQuery = ref("");
const sortAscending = ref(true);

const toggleSort = () => {
  sortAscending.value = !sortAscending.value;
};

const documents = ref([
  { id: 1, name: "Laporan Kewangan 2023", room: 1, cabinet: 4, project: 7, discipline: 1, fileName: "Laporan_Kewangan_2023.pdf", fileSize: "2MB", fileType: "PDF", daysLeft: 10 },
  { id: 1, name: "Laporan Kewangan 2023 Copy", room: 1, cabinet: 4, project: 7, discipline: 1, fileName: "Laporan_Kewangan_2023 Copy.pdf", fileSize: "2MB", fileType: "PDF", daysLeft: 10 },
  { id: 2, name: "Pelan Projek Jambatan Batu Kawan", room: 2, cabinet: 1, project: 3, discipline: 2, fileName: "Pelan_Projek_Jambatan_Batu_Kawan.pdf", fileSize: "3MB", fileType: "PDF", daysLeft: 5 },
  { id: 3, name: "Renovasi Pejabat Kewangan 2022", room: 2, cabinet: 2, project: 2, discipline: 3, fileName: "Renovasi_Pejabat_Kewangan_2022.pdf", fileSize: "1MB", fileType: "PDF", daysLeft: 15 },
  { id: 4, name: "Pembangunan Sistem IT 2021", room: 3, cabinet: 7, project: 13, discipline: 4, fileName: "Pembangunan_Sistem_IT_2021.pdf", fileSize: "4MB", fileType: "PDF", daysLeft: 7 },
  { id: 5, name: "Projek Jalan Raya Kota Bharu", room: 3, cabinet: 8, project: 15, discipline: 5, fileName: "Projek_Jalan_Raya_Kota_Bharu.pdf", fileSize: "5MB", fileType: "PDF", daysLeft: 3 },
  // Add more documents as needed
]);

const filteredDocuments = computed(() => {
  if (!selectedRoom.value || !selectedCabinet.value || !selectedProject.value || !selectedDiscipline.value) {
    return [];
  }
  
  let filtered = documents.value;
  filtered = filtered.filter(doc => doc.room === selectedRoom.value);
  filtered = filtered.filter(doc => doc.cabinet === selectedCabinet.value);
  filtered = filtered.filter(doc => doc.project === selectedProject.value);
  filtered = filtered.filter(doc => doc.discipline === selectedDiscipline.value);
  
  if (searchQuery.value) {
    filtered = filtered.filter(doc => doc.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }
  if (!sortAscending.value) {
    filtered = filtered.reverse();
  }
  return filtered;
});

const selectedDocument = ref(null);

const selectDocument = (document) => {
  selectedDocument.value = {
    tajuk: "Laporan Kewangan Pembinaan Cawangan Tebedu 2024",
    perkara: "Laporan melibatkan perbelanjaan pembinaan pejabat kewangan cawangan tebedu bagi tahun 2024",
    negeri: "Sarawak",
    tarikh: "2023-01-01",
    nama: "Abdul Rahman",
    fulltext: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    storeDate: "2023-01-10",
    namaFail: document.fileName,
    user: "Said Abdullah",
  };
};

const viewDocument = (fileName) => {
  selectedDocument.value = documents.value.find(doc => doc.fileName === fileName);
  openModal();
};

const isOpen = ref(false);

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

const downloadDocument = (fileName) => {
  // Logic to download the document
};

const printDocument = (fileName) => {
  // Logic to print the document
};

const googleDocsViewerUrl = "https://docs.google.com/viewer?url=https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf&embedded=true";
</script>

<template>
  <div>
    <div class="flex h-screen">
      <!-- Sidebar (20%) -->
      <div class="w-1/5 pr-4 h-[calc(100vh-200px)]">
        <Card class="h-full">
          <CardContent class="p-4 h-full">
            <div class="mb-6 flex items-center space-x-2 mt-4">
              <h1 class="text-2xl font-semibold">Carian Dokumen</h1>
              <HoverCard>
                <HoverCardTrigger>
                  <Button variant="ghost">
                    <Icon name="mdi:information-outline" class="h-4 w-4" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent side="right" align="start">
                  <p class="text-sm">Search for documents by selecting the appropriate filters.</p>
                </HoverCardContent>
              </HoverCard>
            </div>
            <div class="flex flex-col space-y-4 h-full">
              <div>
                <label for="archiveRooms" class="block text-sm font-medium text-gray-700">Archive Rooms</label>
                <select id="archiveRooms" name="archiveRooms" v-model="selectedRoom" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md cursor-pointer">
                  <option disabled value="">Select a room</option>
                  <option v-for="room in rooms" :key="room.id" :value="room.id">{{ room.name }}</option>
                </select>
              </div>
              <div>
                <label for="cabinets" class="block text-sm font-medium text-gray-700">Cabinets</label>
                <select id="cabinets" name="cabinets" v-model="selectedCabinet" :disabled="!selectedRoom" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" :class="{'cursor-pointer': selectedRoom}">
                  <option disabled value="">Select a Cabinet</option>
                  <option v-for="cabinet in filteredCabinets" :key="cabinet.id" :value="cabinet.id">{{ cabinet.name }}</option>
                </select>
              </div>
              <div>
                <label for="projects" class="block text-sm font-medium text-gray-700">Projects</label>
                <select id="projects" name="projects" v-model="selectedProject" :disabled="!selectedCabinet" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" :class="{'cursor-pointer': selectedCabinet}">
                  <option disabled value="">Select a Project</option>
                  <option v-for="project in filteredProjects" :key="project.id" :value="project.id">{{ project.name }}</option>
                </select>
              </div>
              <div>
                <label for="disciplines" class="block text-sm font-medium text-gray-700">Disciplines</label>
                <select id="disciplines" name="disciplines" v-model="selectedDiscipline" :disabled="!selectedProject" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" :class="{'cursor-pointer': selectedProject}">
                  <option disabled value="">Select a Discipline</option>
                  <option v-for="discipline in filteredDisciplines" :key="discipline.id" :value="discipline.id">{{ discipline.name }}</option>
                </select>
              </div>

              <div v-if="selectedDocument" class="mt-2 p-4 border rounded bg-gray-50">
                <div class="flex items-center space-x-1 mb-2">
                  <Icon name="mdi:document" class="h-4 w-4" />
                  <p class="text-xs font-semibold">Document Metadata</p>
                </div>
                <p><strong>Tajuk:</strong> {{ selectedDocument.tajuk }}</p>
                <p><strong>Perkara:</strong> {{ selectedDocument.perkara }}</p>
                <p><strong>Fulltext:</strong> {{ selectedDocument.fulltext }}</p>
              </div>

            </div>
            
          </CardContent>
        </Card>
      </div>

      <!-- Main Content (80%) -->
      <div class="w-4/5 h-[calc(100vh-200px)]">
        <Card class="h-full">
          <CardContent>
            <div class="flex justify-between items-center mb-4 overflow-y-auto">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search..."
                class="input input-bordered w-full max-w-lg text-sm py-1 px-2 mt-4"
              />
              <div class="flex space-x-2 mt-4">
                <Button @click="toggleSort" class="btn btn-secondary text-white text-sm py-1 px-2">
                  <Icon name="mdi:sort" class="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div class="divide-y divide-border overflow-y-auto h-[calc(100vh-300px)] bg-gray-100">
              <div
                v-for="document in filteredDocuments"
                :key="document.fileName"
                class="py-3 flex items-center justify-between cursor-pointer ml-4"
                @click="selectDocument(document)"
              >
                <div class="flex items-center">
                  <Icon :name="`mdi:file-${document.fileType.toLowerCase() === 'presentation' ? 'powerpoint' : document.fileType.toLowerCase() === 'spreadsheet' ? 'excel' : document.fileType.toLowerCase()}`" class="h-6 w-6 mr-2" />
                  <div>
                    <p class="font-medium">{{ document.fileName }}</p>
                    <p class="text-sm text-muted-foreground">{{ document.fileSize }} - {{ document.fileType }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2 mr-2">
                  <Button @click.stop="viewDocument(document.fileName)" variant="primary" class="text-sm py-1 px-2">
                    <Icon name="mdi:eye" class="h-6 w-6" />
                  </Button>
                  <Button @click.stop="downloadDocument(document.fileName)" variant="primary" class="text-sm py-1 px-2">
                    <Icon name="mdi:download" class="h-6 w-6" />
                  </Button>
                  <Button @click.stop="printDocument(document.fileName)" variant="primary" class="text-sm py-1 px-2">
                    <Icon name="mdi:printer" class="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>

  <Modal v-model:open="isOpen" size="5xl" class="h-[calc(100vh-100px)]">
    <ModalHeader>
      <div class="flex justify-between items-center w-full">
        <div>
          <ModalTitle>View Document</ModalTitle>
        </div>
        <Button variant="ghost" @click="closeModal">
          <Icon name="mdi:close" class="h-6 w-6" />
        </Button>
      </div>
    </ModalHeader>
    <ModalBody>
      <div class="grid grid-cols-10 gap-4 h-full">
        <div class="col-span-3">
          <FormKit type="text" name="tajuk" label="Tajuk" :value="selectedDocument.value?.tajuk || 'Laporan Kewangan Pembinaan Cawangan Tebedu 2024'" disabled />
          <FormKit type="text" name="perkara" label="Perkara" :value="selectedDocument.value?.perkara || 'Laporan melibatkan perbelanjaan pembinaan pejabat kewangan cawangan tebedu bagi tahun 2024'" disabled />
          <FormKit type="text" name="negeri" label="Negeri" :value="selectedDocument.value?.negeri || 'Sarawak'" disabled />
          <FormKit type="date" name="tarikh" label="Tarikh" :value="selectedDocument.value?.tarikh || '2023-01-01'" disabled />
          <FormKit type="text" name="namaFail" label="Nama Fail" :value="selectedDocument.value?.namaFail || 'Dummy_Nama_Fail.pdf'" disabled />
          <FormKit type="text" name="user" label="User" :value="selectedDocument.value?.user || 'Said Abdullah'" disabled />
          <FormKit type="textarea" name="fulltext" label="Fulltext" :value="selectedDocument.value?.fulltext || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'" disabled />
          <FormKit type="date" name="tarikhSimpan" label="Tarikh Simpan" :value="selectedDocument.value?.storeDate || '2023-01-10'" disabled />
        </div>
        <div class="col-span-7">
          <iframe :src="googleDocsViewerUrl" width="100%" class="h-full"></iframe>
        </div>
      </div>
    </ModalBody>
  </Modal>
</template>
