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

// Add user access control data
const userAccess = ref({
  // Format: documentId: hasAccess (boolean)
  1: true,
  2: false,
  3: true,
  4: false,
  5: true,
  6: false,
  7: true,
  8: false,
});

// Add pending access requests
const pendingRequests = ref([2, 6]);

// Add tree view state
const expandedNodes = ref({
  cawangan: {},
  units: {},
  projects: {},
});

// Toggle tree node expansion
const toggleNode = (type, id) => {
  if (type === 'cawangan') {
    expandedNodes.value.cawangan[id] = !expandedNodes.value.cawangan[id];
  } else if (type === 'unit') {
    expandedNodes.value.units[id] = !expandedNodes.value.units[id];
  } else if (type === 'project') {
    expandedNodes.value.projects[id] = !expandedNodes.value.projects[id];
  }
};

// Modify the selectNode function to handle public cabinet
const selectNode = (type, id, parentId = null, grandParentId = null) => {
  if (type === 'cawangan') {
    selectedCawangan.value = id;
    selectedUnit.value = "";
    selectedProject.value = "";
    selectedDiscipline.value = "";
    
    // If selecting a special cabinet, expand it
    if (id === 'public' || id === 'assigned') {
      expandedNodes.value.cawangan[id] = true;
    }
  } else if (type === 'unit') {
    selectedCawangan.value = parentId;
    selectedUnit.value = id;
    selectedProject.value = "";
    selectedDiscipline.value = "";
  } else if (type === 'project') {
    selectedCawangan.value = grandParentId;
    selectedUnit.value = parentId;
    selectedProject.value = id;
    selectedDiscipline.value = "";
  } else if (type === 'discipline') {
    selectedDiscipline.value = id;
  }
  
  // Update last visited if it's a branch
  if (type === 'cawangan' && typeof id === 'number') {
    const branch = cawangan.value.find(c => c.id === id);
    if (branch) {
      lastVisitedCabinet.value = {
        id: id,
        name: branch.name,
        path: `Assigned Cabinet > ${branch.name}`
      };
    }
  }
};

// Request access to document
const requestAccess = (documentId) => {
  if (!pendingRequests.value.includes(documentId)) {
    pendingRequests.value.push(documentId);
    alert(`Permohonan akses untuk dokumen ID ${documentId} telah dihantar.`);
  } else {
    alert('Permohonan akses untuk dokumen ini sedang diproses.');
  }
};

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

// Add public documents
const publicDocuments = ref([
  { id: 101, name: "JKR Standard Operating Procedures", fileName: "JKR_SOP_2023.pdf", fileType: "PDF", fileSize: "5MB", isPublic: true },
  { id: 102, name: "Construction Guidelines 2023", fileName: "Construction_Guidelines_2023.pdf", fileType: "PDF", fileSize: "3MB", isPublic: true },
  { id: 103, name: "Safety Regulations", fileName: "Safety_Regulations_2023.pdf", fileType: "PDF", fileSize: "2MB", isPublic: true },
  { id: 104, name: "Project Management Templates", fileName: "PM_Templates.zip", fileType: "ZIP", fileSize: "8MB", isPublic: true },
]);

// Add templates
const templateDocuments = ref([
  { id: 201, name: "Project Proposal Template", fileName: "Project_Proposal_Template.docx", fileType: "Word", fileSize: "1MB", isTemplate: true },
  { id: 202, name: "Budget Planning Template", fileName: "Budget_Planning_Template.xlsx", fileType: "Excel", fileSize: "2MB", isTemplate: true },
  { id: 203, name: "Project Timeline Template", fileName: "Project_Timeline_Template.pptx", fileType: "PowerPoint", fileSize: "3MB", isTemplate: true },
  { id: 204, name: "Construction Report Template", fileName: "Construction_Report_Template.docx", fileType: "Word", fileSize: "1MB", isTemplate: true },
]);

// Last visited cabinet
const lastVisitedCabinet = ref({
  id: 'last-visited',
  name: 'JKR Cawangan Tebedu, Sarawak',
  path: 'Assigned Cabinet > JKR Cawangan Tebedu, Sarawak'
});

// Add public cabinet structure
const publicCabinet = ref({
  id: 'public',
  name: 'Public Cabinet',
  cabinets: [
    {
      id: 'general',
      name: 'General Documents',
      documents: [
        { 
          id: 101, 
          name: "JKR Standard Operating Procedures", 
          fileName: "JKR_SOP_2023.pdf", 
          fileType: "PDF", 
          fileSize: "5MB", 
          isPublic: true,
          tajuk: "Standard Operating Procedures JKR 2023",
          perkara: "Prosedur operasi standard untuk semua cawangan JKR",
          negeri: "Federal",
          tarikh: "2023-01-01",
          user: "Admin JKR",
          storeDate: "2023-01-01",
          fulltext: "Dokumen ini mengandungi prosedur operasi standard untuk semua cawangan JKR..."
        },
        { 
          id: 102, 
          name: "Construction Guidelines 2023", 
          fileName: "Construction_Guidelines_2023.pdf", 
          fileType: "PDF", 
          fileSize: "3MB", 
          isPublic: true,
          tajuk: "Garis Panduan Pembinaan 2023",
          perkara: "Garis panduan pembinaan untuk projek JKR",
          negeri: "Federal",
          tarikh: "2023-01-15",
          user: "Admin JKR",
          storeDate: "2023-01-15",
          fulltext: "Garis panduan ini merangkumi aspek pembinaan untuk projek JKR..."
        }
      ]
    },
    {
      id: 'templates',
      name: 'Templates',
      documents: [
        { 
          id: 201, 
          name: "Project Proposal Template", 
          fileName: "Project_Proposal_Template.docx", 
          fileType: "Word", 
          fileSize: "1MB", 
          isTemplate: true,
          tajuk: "Template Cadangan Projek",
          perkara: "Template standard untuk cadangan projek baru",
          negeri: "Federal",
          tarikh: "2023-03-01",
          user: "Admin JKR",
          storeDate: "2023-03-01",
          fulltext: "Template ini mengandungi format standard untuk cadangan projek baru..."
        },
        { 
          id: 202, 
          name: "Budget Planning Template", 
          fileName: "Budget_Planning_Template.xlsx", 
          fileType: "Excel", 
          fileSize: "2MB", 
          isTemplate: true,
          tajuk: "Template Perancangan Bajet",
          perkara: "Template standard untuk perancangan bajet",
          negeri: "Federal",
          tarikh: "2023-03-15",
          user: "Admin JKR",
          storeDate: "2023-03-15",
          fulltext: "Template ini mengandungi format standard untuk perancangan bajet projek..."
        }
      ]
    }
  ]
});

// Modify the filteredDocuments computed property
const filteredDocuments = computed(() => {
  if (searchQuery.value) {
    let allDocs = [
      ...documents.value,
      ...publicCabinet.value.cabinets.flatMap(cabinet => cabinet.documents)
    ];
    
    let filtered = allDocs.filter(doc => 
      doc.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      doc.fileName.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
    
    if (!sortAscending.value) {
      filtered = [...filtered].reverse();
    }
    
    return filtered;
  }
  
  // Handle public cabinet
  if (selectedCawangan.value === 'public') {
    const selectedCabinet = publicCabinet.value.cabinets.find(
      cabinet => cabinet.id === selectedUnit.value
    );
    return selectedCabinet ? selectedCabinet.documents : [];
  }
  
  // Handle regular documents (existing logic)
  if (!selectedCawangan.value || (selectedCawangan.value === 'assigned' && !selectedUnit.value)) {
    return [];
  }
  
  let filtered = [...documents.value];
  
  if (typeof selectedCawangan.value === 'number') {
    filtered = filtered.filter(doc => doc.cawangan === selectedCawangan.value);
    
    if (selectedUnit.value) {
      filtered = filtered.filter(doc => doc.unit === selectedUnit.value);
    }
    
    if (selectedProject.value) {
      filtered = filtered.filter(doc => doc.project === selectedProject.value);
    }
    
    if (filteredDisciplines.value.length > 0 && selectedDiscipline.value) {
      filtered = filtered.filter(doc => doc.discipline === selectedDiscipline.value);
    }
  }
  
  if (!sortAscending.value) {
    filtered = filtered.reverse();
  }
  
  return filtered;
});

const selectedDocument = ref(null);

const selectDocument = (document) => {
  selectedDocument.value = {
    id: document.id,
    tajuk: document.tajuk || document.name,
    perkara: document.perkara || "No description available",
    negeri: document.negeri || "Federal",
    tarikh: document.tarikh || new Date().toISOString().split('T')[0],
    nama: document.name,
    fulltext: document.fulltext || "No content available",
    storeDate: document.storeDate || new Date().toISOString().split('T')[0],
    namaFail: document.fileName,
    user: document.user || "System",
    fileType: document.fileType,
    fileSize: document.fileSize,
    isPublic: document.isPublic,
    isTemplate: document.isTemplate,
    // Add a default viewer URL for public documents
    viewerUrl: document.isPublic || document.isTemplate ? 
      `https://docs.google.com/viewer?url=${encodeURIComponent(document.fileName)}&embedded=true` : 
      googleDocsViewerUrl
  };

  // Automatically open the modal when a document is selected
  openModal();
};

const viewDocument = (fileName) => {
  let document;
  
  // Search in all document sources
  document = documents.value.find(doc => doc.fileName === fileName) ||
            publicCabinet.value.cabinets.flatMap(cabinet => cabinet.documents)
              .find(doc => doc.fileName === fileName);
  
  if (document) {
    selectDocument(document);
  }
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

// Add state for UI toggles
const showNavbar = ref(true);
const showDetails = ref(true);

// Toggle navbar visibility
const toggleNavbar = () => {
  showNavbar.value = !showNavbar.value;
};

// Toggle details panel visibility
const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};

// View type (list, icons, details)
const viewType = ref('list');

// Navigation history
const history = ref({
  back: [],
  forward: [],
  current: null
});

// Navigate back
const goBack = () => {
  if (history.value.back.length > 0) {
    const previous = history.value.back.pop();
    history.value.forward.push(history.value.current);
    history.value.current = previous;
    
    // Restore state from history
    selectedCawangan.value = previous.cawangan;
    selectedUnit.value = previous.unit;
    selectedProject.value = previous.project;
    selectedDiscipline.value = previous.discipline;
  }
};

// Navigate forward
const goForward = () => {
  if (history.value.forward.length > 0) {
    const next = history.value.forward.pop();
    history.value.back.push(history.value.current);
    history.value.current = next;
    
    // Restore state from history
    selectedCawangan.value = next.cawangan;
    selectedUnit.value = next.unit;
    selectedProject.value = next.project;
    selectedDiscipline.value = next.discipline;
  }
};

// Navigate up
const goUp = () => {
  if (selectedDiscipline.value) {
    selectedDiscipline.value = "";
  } else if (selectedProject.value) {
    selectedProject.value = "";
  } else if (selectedUnit.value) {
    selectedUnit.value = "";
  } else if (selectedCawangan.value) {
    selectedCawangan.value = "";
  }
};

// Update history when selection changes
watch([selectedCawangan, selectedUnit, selectedProject, selectedDiscipline], () => {
  const currentState = {
    cawangan: selectedCawangan.value,
    unit: selectedUnit.value,
    project: selectedProject.value,
    discipline: selectedDiscipline.value
  };
  
  if (history.value.current) {
    history.value.back.push(history.value.current);
  }
  
  history.value.current = currentState;
  history.value.forward = [];
});

// Function to navigate to last visited cabinet
const goToLastVisited = () => {
  if (lastVisitedCabinet.value && lastVisitedCabinet.value.id !== 'last-visited') {
    selectNode('cawangan', lastVisitedCabinet.value.id);
    expandedNodes.value.cawangan[lastVisitedCabinet.value.id] = true;
  }
};
</script>

<template>
  <div>
    <div class="flex flex-col h-screen">
      <!-- Navigation Bar (like Windows Explorer address bar) -->
      <div v-if="showNavbar" class="bg-gray-100 border-b p-2 flex items-center space-x-2">
        <Button variant="ghost" class="p-1" @click="goBack" :disabled="history.back.length === 0">
          <Icon name="mdi:arrow-left" class="h-5 w-5" :class="{'text-gray-400': history.back.length === 0}" />
        </Button>
        <Button variant="ghost" class="p-1" @click="goForward" :disabled="history.forward.length === 0">
          <Icon name="mdi:arrow-right" class="h-5 w-5" :class="{'text-gray-400': history.forward.length === 0}" />
        </Button>
        <Button variant="ghost" class="p-1" @click="goUp" :disabled="!selectedCawangan">
          <Icon name="mdi:arrow-up" class="h-5 w-5" :class="{'text-gray-400': !selectedCawangan}" />
        </Button>
        <div class="flex-1 flex items-center bg-white border rounded px-2 py-1">
          <Icon name="mdi:folder-outline" class="h-4 w-4 mr-2 text-gray-500" />
          <span class="text-sm truncate">
            {{ selectedProject ? 
              `${cawangan.find(c => c.id === selectedCawangan)?.name} > ${filteredUnits.find(u => u.id === selectedUnit)?.name} > ${filteredProjects.find(p => p.id === selectedProject)?.name}` : 
              selectedUnit ? 
                `${cawangan.find(c => c.id === selectedCawangan)?.name} > ${filteredUnits.find(u => u.id === selectedUnit)?.name}` : 
                selectedCawangan ? 
                  cawangan.find(c => c.id === selectedCawangan)?.name : 
                  'Dokumen' 
            }}
          </span>
        </div>
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari..."
            class="input input-bordered w-48 md:w-64 text-sm py-1 px-2 pl-8 flex-shrink-0"
          />
          <Icon name="mdi:magnify" class="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      
      <!-- Main Content Area -->
      <div class="flex flex-1 overflow-hidden">
        <!-- Left Sidebar (like Windows Explorer navigation pane) -->
        <div class="w-1/4 border-r bg-gray-50 overflow-y-auto">
          <div class="p-2">
            <div class="mb-2">
              <div class="flex items-center p-2 bg-blue-50 rounded">
                <Icon name="mdi:folder-multiple" class="h-5 w-5 mr-2 text-blue-600" />
                <span class="font-medium truncate">Document Explorer</span>
              </div>
            </div>
            
            <!-- Public Cabinet Section -->
            <div class="mb-2">
              <div class="flex items-center px-2 py-1">
                <Icon name="mdi:folder-open-outline" class="h-4 w-4 mr-2 text-green-600" />
                <span class="text-sm font-medium truncate">Public Cabinet</span>
              </div>
              
              <div class="tree-view pl-2">
                <ul class="space-y-1">
                  <li class="tree-item">
                    <div 
                      class="flex items-center py-1 px-2 rounded hover:bg-gray-200 cursor-pointer"
                      :class="{'bg-blue-100': selectedCawangan === 'public'}"
                      @click="selectNode('cawangan', 'public')"
                    >
                      <button @click.stop="toggleNode('cawangan', 'public')" class="mr-1 w-5 text-center">
                        <Icon 
                          :name="expandedNodes.cawangan['public'] ? 'mdi:chevron-down' : 'mdi:chevron-right'" 
                          class="h-4 w-4" 
                        />
                      </button>
                      <Icon :name="expandedNodes.cawangan['public'] ? 'mdi:folder-open' : 'mdi:folder'" class="h-4 w-4 mr-1 text-green-500" />
                      <span class="text-sm truncate">Public Cabinet</span>
                    </div>
                    
                    <!-- Public Cabinet Units -->
                    <ul v-if="expandedNodes.cawangan['public']" class="pl-6 space-y-1 mt-1">
                      <li v-for="cabinet in publicCabinet.cabinets" :key="`cabinet-${cabinet.id}`" class="tree-item">
                        <div 
                          class="flex items-center py-1 px-2 rounded hover:bg-gray-200 cursor-pointer"
                          :class="{'bg-blue-100': selectedUnit === cabinet.id && selectedCawangan === 'public'}"
                          @click="selectNode('unit', cabinet.id, 'public')"
                        >
                          <Icon name="mdi:folder" class="h-4 w-4 mr-1 text-blue-500" />
                          <span class="text-sm truncate">{{ cabinet.name }}</span>
                          <Badge 
                            v-if="cabinet.documents.length > 0" 
                            variant="secondary" 
                            class="ml-2"
                          >
                            {{ cabinet.documents.length }}
                          </Badge>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            
            <!-- Assigned Cabinets Section -->
            <div class="mb-2">
              <div class="flex items-center px-2 py-1">
                <Icon name="mdi:folder-network" class="h-4 w-4 mr-2 text-blue-600" />
                <span class="text-sm font-medium truncate">Assigned Cabinets</span>
              </div>
            </div>
            
            <div class="tree-view pl-2">
              <ul class="space-y-1">
                <li v-for="c in cawangan" :key="`cawangan-${c.id}`" class="tree-item">
                  <div 
                    class="flex items-center py-1 px-2 rounded hover:bg-gray-200 cursor-pointer"
                    :class="{'bg-blue-100': selectedCawangan === c.id}"
                    @click="selectNode('cawangan', c.id)"
                  >
                    <button @click.stop="toggleNode('cawangan', c.id)" class="mr-1 w-5 text-center">
                      <Icon 
                        :name="expandedNodes.cawangan[c.id] ? 'mdi:chevron-down' : 'mdi:chevron-right'" 
                        class="h-4 w-4" 
                      />
                    </button>
                    <Icon :name="expandedNodes.cawangan[c.id] ? 'mdi:folder-open' : 'mdi:folder'" class="h-4 w-4 mr-1 text-yellow-500" />
                    <span class="text-sm truncate">{{ c.name }}</span>
                  </div>
                  
                  <!-- Units -->
                  <ul v-if="expandedNodes.cawangan[c.id]" class="pl-6 space-y-1 mt-1">
                    <li v-for="unit in c.units" :key="`unit-${unit.id}`" class="tree-item">
                      <div 
                        class="flex items-center py-1 px-2 rounded hover:bg-gray-200 cursor-pointer"
                        :class="{'bg-blue-100': selectedUnit === unit.id && selectedCawangan === c.id}"
                        @click="selectNode('unit', unit.id, c.id)"
                      >
                        <button @click.stop="toggleNode('unit', unit.id)" class="mr-1 w-5 text-center">
                          <Icon 
                            :name="expandedNodes.units[unit.id] ? 'mdi:chevron-down' : 'mdi:chevron-right'" 
                            class="h-4 w-4" 
                          />
                        </button>
                        <Icon :name="expandedNodes.units[unit.id] ? 'mdi:folder-open' : 'mdi:folder'" class="h-4 w-4 mr-1 text-blue-500" />
                        <span class="text-sm truncate">{{ unit.name }}</span>
                      </div>
                      
                      <!-- Projects -->
                      <ul v-if="expandedNodes.units[unit.id]" class="pl-6 space-y-1 mt-1">
                        <li v-for="project in unit.projects" :key="`project-${project.id}`" class="tree-item">
                          <div 
                            class="flex items-center py-1 px-2 rounded hover:bg-gray-200 cursor-pointer"
                            :class="{'bg-blue-100': selectedProject === project.id && selectedUnit === unit.id && selectedCawangan === c.id}"
                            @click="selectNode('project', project.id, unit.id, c.id)"
                          >
                            <button v-if="project.hasDiscipline" @click.stop="toggleNode('project', project.id)" class="mr-1 w-5 text-center">
                              <Icon 
                                :name="expandedNodes.projects[project.id] ? 'mdi:chevron-down' : 'mdi:chevron-right'" 
                                class="h-4 w-4" 
                              />
                            </button>
                            <span v-else class="mr-1 w-5"></span>
                            <Icon :name="expandedNodes.projects[project.id] ? 'mdi:folder-open' : 'mdi:folder'" class="h-4 w-4 mr-1 text-green-500" />
                            <span class="text-sm truncate">{{ project.name }}</span>
                          </div>
                          
                          <!-- Disciplines -->
                          <ul v-if="project.hasDiscipline && expandedNodes.projects[project.id]" class="pl-6 space-y-1 mt-1">
                            <li v-for="discipline in c.disciplines" :key="`discipline-${discipline.id}`" class="tree-item">
                              <div 
                                class="flex items-center py-1 px-2 rounded hover:bg-gray-200 cursor-pointer"
                                :class="{'bg-blue-100': selectedDiscipline === discipline.id && selectedProject === project.id}"
                                @click="selectNode('discipline', discipline.id, project.id, unit.id)"
                              >
                                <span class="mr-1 w-5"></span>
                                <Icon name="mdi:tag" class="h-4 w-4 mr-1 text-purple-500" />
                                <span class="text-sm truncate">{{ discipline.name }}</span>
                              </div>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Main Content and Details Panel -->
        <div class="flex-1 flex">
          <!-- Right Content Area (like Windows Explorer file list) -->
          <div class="flex-1 flex flex-col">
            <!-- Toolbar -->
            <div class="bg-gray-100 border-b p-2 flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  class="text-xs"
                  :class="{'bg-blue-100': viewType === 'list'}"
                  @click="setViewType('list')"
                >
                  <Icon name="mdi:view-list" class="h-4 w-4 mr-1" />
                  <span class="hidden sm:inline">List View</span>
                </Button>

              </div>
              <div class="flex items-center space-x-2">
                <Button @click="toggleSort" variant="ghost" size="sm" class="text-xs">
                  <Icon :name="sortAscending ? 'mdi:sort-ascending' : 'mdi:sort-descending'" class="h-4 w-4 mr-1" />
                  <span class="hidden sm:inline">Sort</span>
                </Button>
                <Button v-if="!showDetails" @click="toggleDetails" variant="ghost" size="sm" class="text-xs">
                  <Icon name="mdi:chevron-left" class="h-4 w-4 mr-1" />
                  <span class="hidden sm:inline">Open Panel</span>
                </Button>
              </div>
            </div>
            
            <!-- Column Headers (like Windows Explorer) -->
            <div class="bg-gray-50 border-b flex text-xs font-medium text-gray-600 py-2">
              <div class="w-3/5 px-4 truncate">Nama</div>
              <div class="w-1/5 px-2 truncate">Jenis</div>
              <div class="w-1/5 px-2 truncate">Saiz</div>
            </div>
            
            <!-- File List -->
            <div class="flex-1 overflow-y-auto bg-white">
              <div v-if="filteredDocuments.length === 0 && searchQuery" class="py-8 text-center text-gray-500">
                <Icon name="mdi:magnify-off" class="h-12 w-12 mx-auto mb-2" />
                <p class="px-4">No documents found for search "{{ searchQuery }}".</p>
              </div>
              <div v-else-if="filteredDocuments.length === 0" class="py-8 text-center text-gray-500">
                <Icon name="mdi:folder-open-outline" class="h-12 w-12 mx-auto mb-2" />
                <p class="px-4">No documents found. Please select a category from the left menu.</p>
              </div>
              
              <!-- List View -->
              <template v-if="viewType === 'list'">
                <div
                  v-for="document in filteredDocuments"
                  :key="document.id"
                  class="flex items-center border-b hover:bg-blue-50 cursor-pointer"
                  :class="{'bg-blue-100': selectedDocument && selectedDocument.fileName === document.fileName}"
                  @click="selectDocument(document)"
                >
                  <div class="w-3/5 px-4 py-2 flex items-center">
                    <Icon 
                      :name="`mdi:file-${document.fileType.toLowerCase() === 'presentation' ? 'powerpoint' : 
                             document.fileType.toLowerCase() === 'spreadsheet' ? 'excel' : 
                             document.fileType.toLowerCase() === 'word' ? 'word' : 
                             document.fileType.toLowerCase()}`" 
                      class="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" 
                    />
                    <span class="truncate">{{ document.fileName }}</span>
                    <Badge 
                      v-if="document.isPublic" 
                      variant="success" 
                      class="ml-2"
                    >
                      Public
                    </Badge>
                    <Badge 
                      v-if="document.isTemplate" 
                      variant="info" 
                      class="ml-2"
                    >
                      Template
                    </Badge>
                  </div>
                  <div class="w-1/5 px-2 py-2 text-sm text-gray-600 truncate">{{ document.fileType }}</div>
                  <div class="w-1/5 px-2 py-2 text-sm text-gray-600 truncate">{{ document.fileSize }}</div>
                </div>
              </template>
              

              
              <!-- Details View -->
              <template v-else>
                <div
                  v-for="document in filteredDocuments"
                  :key="document.id"
                  class="border-b hover:bg-blue-50 cursor-pointer p-3"
                  :class="{'bg-blue-100': selectedDocument && selectedDocument.fileName === document.fileName}"
                  @click="selectDocument(document)"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <Icon :name="`mdi:file-${document.fileType?.toLowerCase() === 'presentation' ? 'powerpoint' : document.fileType?.toLowerCase() === 'spreadsheet' ? 'excel' : document.fileType?.toLowerCase()}`" class="h-8 w-8 mr-3 text-blue-600 flex-shrink-0" />
                      <div class="min-w-0">
                        <div class="font-medium truncate">{{ document.fileName }}</div>
                        <div class="text-sm text-gray-500 truncate">
                          {{ document.fileType }} • {{ document.fileSize }}
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <Badge v-if="userAccess[document.id]" variant="success" class="text-xs">Allowed Access</Badge>
                      <Badge v-if="pendingRequests.includes(document.id)" variant="warning" class="text-xs">Pending Request</Badge>
                      <Badge v-else variant="destructive" class="text-xs">No Access</Badge>
                    
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          
          <!-- Right Details Panel -->
          <div v-if="showDetails && selectedDocument" class="w-1/3 border-l bg-gray-50 overflow-y-auto flex flex-col">
            <div class="p-4">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-2">
                  <Icon :name="`mdi:file-${selectedDocument.fileType?.toLowerCase() === 'presentation' ? 'powerpoint' : selectedDocument.fileType?.toLowerCase() === 'spreadsheet' ? 'excel' : selectedDocument.fileType?.toLowerCase()}`" class="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <h3 class="font-medium truncate">{{ selectedDocument.namaFail }}</h3>
                </div>
                <Button variant="ghost" size="sm" @click="toggleDetails" class="p-1">
                  <Icon name="mdi:close" class="h-4 w-4" />
                </Button>
              </div>
              
              <div class="space-y-4">
                <div class="bg-white border rounded-md p-3">
                  <h4 class="text-sm font-medium mb-2">Document Information</h4>
                  <div class="grid grid-cols-1 gap-2 text-sm">
                    <div class="flex">
                      <div class="w-1/3 text-gray-600 truncate">Title:</div>
                      <div class="w-2/3 truncate">{{ selectedDocument.tajuk }}</div>
                    </div>
                    <div class="flex">
                      <div class="w-1/3 text-gray-600 truncate">Subject:</div>
                      <div class="w-2/3 truncate">{{ selectedDocument.perkara }}</div>
                    </div>
                    <div class="flex">
                      <div class="w-1/3 text-gray-600 truncate">State:</div>
                      <div class="w-2/3 truncate">{{ selectedDocument.negeri }}</div>
                    </div>
                    <div class="flex">
                      <div class="w-1/3 text-gray-600 truncate">Date:</div>
                      <div class="w-2/3 truncate">{{ selectedDocument.tarikh }}</div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white border rounded-md p-3">
                  <h4 class="text-sm font-medium mb-2">Document Details</h4>
                  <div class="grid grid-cols-1 gap-2 text-sm">
                    <div class="flex">
                      <div class="w-1/3 text-gray-600 truncate">File Name:</div>
                      <div class="w-2/3 truncate">{{ selectedDocument.namaFail }}</div>
                    </div>
                    <div class="flex">
                      <div class="w-1/3 text-gray-600 truncate">User:</div>
                      <div class="w-2/3 truncate">{{ selectedDocument.user }}</div>
                    </div>
                    <div class="flex">
                      <div class="w-1/3 text-gray-600 truncate">Store Date:</div>
                      <div class="w-2/3 truncate">{{ selectedDocument.storeDate }}</div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white border rounded-md p-3">
                  <h4 class="text-sm font-medium mb-2">Full Text</h4>
                  <div class="text-sm bg-gray-50 p-2 rounded border max-h-32 overflow-y-auto">
                    {{ selectedDocument.fulltext }}
                  </div>
                </div>
              </div>
            </div>
            
            <div class="p-4 border-t bg-gray-100">
              <div class="flex justify-center space-x-2">
                <Button variant="outline" size="sm" @click="viewDocument(selectedDocument.namaFail)">
                  <Icon name="mdi:eye" class="h-4 w-4 mr-1" />
                  <span class="truncate">View</span>
                </Button>
                <Button variant="outline" size="sm" @click="downloadDocument(selectedDocument.namaFail)">
                  <Icon name="mdi:download" class="h-4 w-4 mr-1" />
                  <span class="truncate">Download</span>
                </Button>
                <Button variant="outline" size="sm" @click="printDocument(selectedDocument.namaFail)">
                  <Icon name="mdi:printer" class="h-4 w-4 mr-1" />
                  <span class="truncate">Print</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Document Viewer Modal -->
  <Modal v-model:open="isOpen" size="3xl" class="h-[calc(100vh-400px)]">
    <ModalHeader>
      <div class="flex justify-between items-center w-full">
        <div>
          <ModalTitle class="truncate">{{ selectedDocument?.namaFail || 'View Document' }}</ModalTitle>
        </div>
        <div class="flex items-center space-x-2">
          <Button variant="outline" @click="downloadDocument(selectedDocument?.namaFail)">
            <Icon name="mdi:download" class="h-5 w-5 mr-1" />
            <span class="truncate">Download</span>
          </Button>
          <Button variant="outline" @click="printDocument(selectedDocument?.namaFail)">
            <Icon name="mdi:printer" class="h-5 w-5 mr-1" />
            <span class="truncate">Print</span>
          </Button>
          <Button variant="ghost" @click="closeModal">
            <Icon name="mdi:close" class="h-6 w-6" />
          </Button>
        </div>
      </div>
    </ModalHeader>
    <ModalBody>
      <div class="grid grid-cols-10 gap-4 h-full">
        <div class="col-span-3 overflow-y-auto">
          <div class="bg-gray-50 p-3 rounded-md mb-3">
            <h3 class="font-semibold mb-2">Document Information</h3>
            <FormKit type="text" name="tajuk" label="Tajuk" :value="selectedDocument?.tajuk" disabled />
            <FormKit type="text" name="perkara" label="Perkara" :value="selectedDocument?.perkara" disabled />
            <FormKit type="text" name="negeri" label="Negeri" :value="selectedDocument?.negeri" disabled />
            <FormKit type="date" name="tarikh" label="Tarikh" :value="selectedDocument?.tarikh" disabled />
            <FormKit type="text" name="namaFail" label="Nama Fail" :value="selectedDocument?.namaFail" disabled />
            <FormKit type="text" name="user" label="Pengguna" :value="selectedDocument?.user" disabled />
            
            <!-- Add badges for public/template documents -->
            <div class="mt-2 flex gap-2">
              <Badge v-if="selectedDocument?.isPublic" variant="success">Public Document</Badge>
              <Badge v-if="selectedDocument?.isTemplate" variant="info">Template</Badge>
            </div>
          </div>
          
          <div class="bg-gray-50 p-3 rounded-md">
            <h3 class="font-semibold mb-2">Full Text</h3>
            <FormKit type="textarea" name="fulltext" :value="selectedDocument?.fulltext" disabled />
            <FormKit type="date" name="tarikhSimpan" label="Tarikh Simpan" :value="selectedDocument?.storeDate" disabled />
          </div>
        </div>
        <div class="col-span-7">
          <iframe 
            :src="selectedDocument?.viewerUrl || googleDocsViewerUrl" 
            width="100%" 
            class="h-full border rounded-md"
          ></iframe>
        </div>
      </div>
    </ModalBody>
  </Modal>
</template>

<style scoped>
.tree-item {
  transition: all 0.2s;
}
</style>
