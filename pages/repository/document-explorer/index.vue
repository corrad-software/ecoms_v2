<script setup>
definePageMeta({
  layout: "admin",
});

const cawangan = ref([
  {
    id: 1,
    name: "JKR Cawangan Tebedu, Sarawak",
    units: [
      {
        id: 4,
        name: "JKR Bahagian Kewangan Cawangan Tebedu",
        projects: [
          { id: 7, name: "Pembinaan Pejabat Kewangan Tebedu", hasDiscipline: true },
          { id: 8, name: "Renovasi Pejabat Kewangan Tebedu", hasDiscipline: false },
        ],
      },
      {
        id: 5,
        name: "JKR Bahagian Kejuruteraan Awam Cawangan Tebedu",
        projects: [
          { id: 9, name: "Pembinaan Jambatan Tebedu", hasDiscipline: true },
          { id: 10, name: "Projek Jalan Raya Tebedu", hasDiscipline: false },
        ],
      },
      {
        id: 6,
        name: "JKR Bahagian Teknologi Maklumat Cawangan Tebedu",
        projects: [
          { id: 11, name: "Pembangunan Sistem IT Tebedu", hasDiscipline: true },
          { id: 12, name: "Peningkatan Infrastruktur IT Tebedu", hasDiscipline: false },
        ],
      },
    ],
    disciplines: [
      { id: 1, name: "Kewangan" },
      { id: 2, name: "Kejuruteraan Awam" },
      { id: 3, name: "Teknologi Maklumat" },
    ],
  },
  {
    id: 2,
    name: "JKR Cawangan Batu Kawan, Penang",
    units: [
      {
        id: 1,
        name: "JKR Bahagian Kewangan Cawangan Batu Kawan",
        projects: [
          { id: 1, name: "Pembinaan Pejabat Kewangan Batu Kawan", hasDiscipline: true },
          { id: 2, name: "Renovasi Pejabat Kewangan Batu Kawan", hasDiscipline: false },
        ],
      },
      {
        id: 2,
        name: "JKR Bahagian Kejuruteraan Awam Cawangan Batu Kawan",
        projects: [
          { id: 3, name: "Pembinaan Jambatan Batu Kawan", hasDiscipline: true },
          { id: 4, name: "Projek Jalan Raya Batu Kawan", hasDiscipline: false },
        ],
      },
      {
        id: 3,
        name: "JKR Bahagian Teknologi Maklumat Cawangan Batu Kawan",
        projects: [
          { id: 5, name: "Pembangunan Sistem IT Batu Kawan", hasDiscipline: true },
          { id: 6, name: "Peningkatan Infrastruktur IT Batu Kawan", hasDiscipline: false },
        ],
      },
    ],
    disciplines: [
      { id: 1, name: "Kewangan" },
      { id: 2, name: "Kejuruteraan Awam" },
      { id: 3, name: "Teknologi Maklumat" },
    ],
  },
  {
    id: 3,
    name: "JKR Cawangan Kota Bharu, Kelantan",
    units: [
      {
        id: 7,
        name: "JKR Bahagian Kewangan Cawangan Kota Bharu",
        projects: [
          { id: 13, name: "Pembinaan Pejabat Kewangan Kota Bharu", hasDiscipline: true },
          { id: 14, name: "Renovasi Pejabat Kewangan Kota Bharu", hasDiscipline: false },
        ],
      },
      {
        id: 8,
        name: "JKR Bahagian Kejuruteraan Awam Cawangan Kota Bharu",
        projects: [
          { id: 15, name: "Pembinaan Jambatan Kota Bharu", hasDiscipline: true },
          { id: 16, name: "Projek Jalan Raya Kota Bharu", hasDiscipline: false },
        ],
      },
      {
        id: 9,
        name: "JKR Bahagian Teknologi Maklumat Cawangan Kota Bharu",
        projects: [
          { id: 17, name: "Pembangunan Sistem IT Kota Bharu", hasDiscipline: true },
          { id: 18, name: "Peningkatan Infrastruktur IT Kota Bharu", hasDiscipline: false },
        ],
      },
    ],
    disciplines: [
      { id: 1, name: "Kewangan" },
      { id: 2, name: "Kejuruteraan Awam" },
      { id: 3, name: "Teknologi Maklumat" },
    ],
  },
  {
    id: 4,
    name: "JKR Cawangan Kuala Terengganu, Terengganu",
    units: [
      {
        id: 10,
        name: "JKR Bahagian Kewangan Cawangan Kuala Terengganu",
        projects: [
          { id: 19, name: "Pembinaan Pejabat Kewangan Kuala Terengganu", hasDiscipline: true },
          { id: 20, name: "Renovasi Pejabat Kewangan Kuala Terengganu", hasDiscipline: false },
        ],
      },
      {
        id: 11,
        name: "JKR Bahagian Kejuruteraan Awam Cawangan Kuala Terengganu",
        projects: [
          { id: 21, name: "Pembinaan Jambatan Kuala Terengganu", hasDiscipline: true },
          { id: 22, name: "Projek Jalan Raya Kuala Terengganu", hasDiscipline: false },
        ],
      },
      {
        id: 12,
        name: "JKR Bahagian Teknologi Maklumat Cawangan Kuala Terengganu",
        projects: [
          { id: 23, name: "Pembangunan Sistem IT Kuala Terengganu", hasDiscipline: true },
          { id: 24, name: "Peningkatan Infrastruktur IT Kuala Terengganu", hasDiscipline: false },
        ],
      },
    ],
    disciplines: [
      { id: 1, name: "Kewangan" },
      { id: 2, name: "Kejuruteraan Awam" },
      { id: 3, name: "Teknologi Maklumat" },
    ],
  },
  {
    id: 5,
    name: "JKR Cawangan Ipoh, Perak",
    units: [
      {
        id: 13,
        name: "JKR Bahagian Kewangan Cawangan Ipoh",
        projects: [
          { id: 25, name: "Pembinaan Pejabat Kewangan Ipoh", hasDiscipline: true },
          { id: 26, name: "Renovasi Pejabat Kewangan Ipoh", hasDiscipline: false },
        ],
      },
      {
        id: 14,
        name: "JKR Bahagian Kejuruteraan Awam Cawangan Ipoh",
        projects: [
          { id: 27, name: "Pembinaan Jambatan Ipoh", hasDiscipline: true },
          { id: 28, name: "Projek Jalan Raya Ipoh", hasDiscipline: false },
        ],
      },
      {
        id: 15,
        name: "JKR Bahagian Teknologi Maklumat Cawangan Ipoh",
        projects: [
          { id: 29, name: "Pembangunan Sistem IT Ipoh", hasDiscipline: true },
          { id: 30, name: "Peningkatan Infrastruktur IT Ipoh", hasDiscipline: false },
        ],
      },
    ],
    disciplines: [
      { id: 1, name: "Kewangan" },
      { id: 2, name: "Kejuruteraan Awam" },
      { id: 3, name: "Teknologi Maklumat" },
    ],
  },
  {
    id: 6,
    name: "JKR Cawangan Arkitek",
    units: [
      {
        id: 16,
        name: "Pre Approved Plan",
        projects: [
          { id: 31, name: "Pelan Pembinaan Hospital Mudah Alih", hasDiscipline: true },
          { id: 32, name: "Pelan Pembinaan Semula Sekolah Usang Bario", hasDiscipline: true },
        ],
      },
    ],
    disciplines: [
      { id: 1, name: "Arkitek" },
      { id: 2, name: "Struktur" },
      { id: 3, name: "Mekanikal" },
      { id: 4, name: "Elektrik" },
      { id: 5, name: "Ukur Bahan" },
    ],
  },
]);

const selectedCawangan = ref("");
const selectedUnit = ref("");
const selectedProject = ref("");
const selectedDiscipline = ref("");

watch(selectedCawangan, () => {
  selectedUnit.value = "";
  selectedProject.value = "";
  selectedDiscipline.value = "";
});

watch(selectedUnit, () => {
  selectedProject.value = "";
  selectedDiscipline.value = "";
});

watch(selectedProject, () => {
  selectedDiscipline.value = "";
});

const filteredUnits = computed(() => {
  if (selectedCawangan.value) {
    return cawangan.value.find(c => c.id === selectedCawangan.value).units;
  }
  return [];
});

const filteredProjects = computed(() => {
  if (selectedUnit.value) {
    return filteredUnits.value.find(unit => unit.id === selectedUnit.value).projects;
  }
  return [];
});

const filteredDisciplines = computed(() => {
  if (selectedProject.value) {
    const project = filteredProjects.value.find(p => p.id === selectedProject.value);
    if (project && project.hasDiscipline) {
      return cawangan.value.find(c => c.id === selectedCawangan.value).disciplines;
    }
  }
  return [];
});

const searchQuery = ref("");
const sortAscending = ref(true);

const toggleSort = () => {
  sortAscending.value = !sortAscending.value;
};

const documents = ref([
  { id: 1, name: "Laporan Kewangan 2023", cawangan: 1, unit: 4, project: 7, discipline: 1, fileName: "Laporan_Kewangan_2023.pdf", fileSize: "2MB", fileType: "PDF", daysLeft: 10 },
  { id: 1, name: "Laporan Kewangan 2023 Copy", cawangan: 1, unit: 4, project: 7, discipline: 1, fileName: "Laporan_Kewangan_2023 Copy.pdf", fileSize: "2MB", fileType: "PDF", daysLeft: 10 },
  { id: 2, name: "Pelan Projek Jambatan Batu Kawan", cawangan: 2, unit: 1, project: 3, discipline: 2, fileName: "Pelan_Projek_Jambatan_Batu_Kawan.pdf", fileSize: "3MB", fileType: "PDF", daysLeft: 5 },
  { id: 3, name: "Renovasi Pejabat Kewangan 2022", cawangan: 2, unit: 2, project: 2, discipline: 3, fileName: "Renovasi_Pejabat_Kewangan_2022.pdf", fileSize: "1MB", fileType: "PDF", daysLeft: 15 },
  { id: 4, name: "Pembangunan Sistem IT 2021", cawangan: 3, unit: 7, project: 13, discipline: 4, fileName: "Pembangunan_Sistem_IT_2021.pdf", fileSize: "4MB", fileType: "PDF", daysLeft: 7 },
  { id: 5, name: "Projek Jalan Raya Kota Bharu", cawangan: 3, unit: 8, project: 15, discipline: 5, fileName: "Projek_Jalan_Raya_Kota_Bharu.pdf", fileSize: "5MB", fileType: "PDF", daysLeft: 3 },
  { id: 6, name: "Pelan Pembinaan Hospital Mudah Alih", cawangan: 6, unit: 16, project: 31, discipline: 1, fileName: "Pelan_Pembinaan_Hospital_Mudah_Alih.pdf", fileSize: "6MB", fileType: "PDF", daysLeft: 20 },
  { id: 7, name: "Pelan Pembinaan Semula Sekolah Usang Bario", cawangan: 6, unit: 16, project: 32, discipline: 2, fileName: "Pelan_Pembinaan_Semula_Sekolah_Usang_Bario.pdf", fileSize: "7MB", fileType: "PDF", daysLeft: 25 },
  // Add more documents as needed
]);

const filteredDocuments = computed(() => {
  if (!selectedCawangan.value || !selectedUnit.value || !selectedProject.value || (filteredDisciplines.value.length > 0 && !selectedDiscipline.value)) {
    return [];
  }
  
  let filtered = documents.value;
  filtered = filtered.filter(doc => doc.cawangan === selectedCawangan.value);
  filtered = filtered.filter(doc => doc.unit === selectedUnit.value);
  filtered = filtered.filter(doc => doc.project === selectedProject.value);
  if (filteredDisciplines.value.length > 0) {
    filtered = filtered.filter(doc => doc.discipline === selectedDiscipline.value);
  }
  
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
                  <p class="text-sm">Cari dokumen dengan memilih penapis yang sesuai.</p>
                </HoverCardContent>
              </HoverCard>
            </div>
            <div class="flex flex-col space-y-4 h-full">
              <div>
                <label for="archiveCawangan" class="block text-sm font-medium text-gray-700">Cawangan JKR / Negeri</label>
                <select id="archiveCawangan" name="archiveCawangan" v-model="selectedCawangan" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md cursor-pointer">
                  <option disabled value="">Pilih Cawangan </option>
                  <option v-for="c in cawangan" :key="c.id" :value="c.id">{{ c.name }}</option>
                </select>
              </div>
              <div>
                <label for="units" class="block text-sm font-medium text-gray-700">Bahagian / Unit</label>
                <select id="units" name="units" v-model="selectedUnit" :disabled="!selectedCawangan" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" :class="{'cursor-pointer': selectedCawangan}">
                  <option disabled value="">Pilih bahagian / unit</option>
                  <option v-for="unit in filteredUnits" :key="unit.id" :value="unit.id">{{ unit.name }}</option>
                </select>
              </div>
              <div>
                <label for="projects" class="block text-sm font-medium text-gray-700">Projek</label>
                <select id="projects" name="projects" v-model="selectedProject" :disabled="!selectedUnit" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" :class="{'cursor-pointer': selectedUnit}">
                  <option disabled value="">Pilih projek</option>
                  <option v-for="project in filteredProjects" :key="project.id" :value="project.id">{{ project.name }}</option>
                </select>
              </div>
              <div v-if="filteredDisciplines.length > 0">
                <label for="disciplines" class="block text-sm font-medium text-gray-700">Disiplin</label>
                <select id="disciplines" name="disciplines" v-model="selectedDiscipline" :disabled="!selectedProject" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" :class="{'cursor-pointer': selectedProject}">
                  <option disabled value="">Pilih disiplin</option>
                  <option v-for="discipline in filteredDisciplines" :key="discipline.id" :value="discipline.id">{{ discipline.name }}</option>
                </select>
              </div>

              <div v-if="selectedDocument" class="mt-2 p-4 border rounded bg-gray-50">
                <div class="flex items-center space-x-1 mb-2">
                  <Icon name="mdi:document" class="h-4 w-4" />
                  <p class="text-xs font-semibold">Metadata Dokumen</p>
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
                placeholder="Cari..."
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
          <ModalTitle>Lihat Dokumen</ModalTitle>
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
          <FormKit type="text" name="user" label="Pengguna" :value="selectedDocument.value?.user || 'Said Abdullah'" disabled />
          <FormKit type="textarea" name="fulltext" label="Teks Penuh" :value="selectedDocument.value?.fulltext || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'" disabled />
          <FormKit type="date" name="tarikhSimpan" label="Tarikh Simpan" :value="selectedDocument.value?.storeDate || '2023-01-10'" disabled />
        </div>
        <div class="col-span-7">
          <iframe :src="googleDocsViewerUrl" width="100%" class="h-full"></iframe>
        </div>
      </div>
    </ModalBody>
  </Modal>
</template>
