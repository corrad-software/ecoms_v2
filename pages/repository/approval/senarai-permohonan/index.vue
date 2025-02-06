<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold">Senarai Permohonan Pengguna Pre-Approval Plan</h1>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
      <div class="bg-white p-2 rounded shadow cursor-pointer flex items-center" @click="filterRequests('new')">
        <div class="bg-gray-700 text-gray-200 p-2 rounded mr-2">
          <Icon name="mdi:new-box" class="h-6 w-6" />
        </div>
        <div>
          <p class="text-lg font-semibold">Baharu</p>
          <p class="text-xl">{{ newRequestsCount }}</p>
        </div>
      </div>
      <div class="bg-white p-2 rounded shadow cursor-pointer flex items-center" @click="filterRequests('approved')">
        <div class="bg-gray-700 text-gray-200 p-2 rounded mr-2">
          <Icon name="mdi:check-circle" class="h-6 w-6" />
        </div>
        <div>
          <p class="text-lg font-semibold">Diluluskan</p>
          <p class="text-xl">{{ approvedRequestsCount }}</p>
        </div>
      </div>
      <div class="bg-white p-2 rounded shadow cursor-pointer flex items-center" @click="filterRequests('pending')">
        <div class="bg-gray-700 text-gray-200 p-2 rounded mr-2">
          <Icon name="mdi:clock-outline" class="h-6 w-6" />
        </div>
        <div>
          <p class="text-lg font-semibold">Menunggu Pengesahan</p>
          <p class="text-xl">{{ pendingRequestsCount }}</p>
        </div>
      </div>
      <div class="bg-white p-2 rounded shadow cursor-pointer flex items-center" @click="filterRequests('rejected')">
        <div class="bg-gray-700 text-gray-200 p-2 rounded mr-2">
          <Icon name="mdi:close-circle" class="h-6 w-6" />
        </div>
        <div>
          <p class="text-lg font-semibold">Ditolak</p>
          <p class="text-xl">{{ rejectedRequestsCount }}</p>
        </div>
      </div>
      <div class="bg-white p-2 rounded shadow cursor-pointer flex items-center" @click="filterRequests('closed')">
        <div class="bg-gray-700 text-gray-200 p-2 rounded mr-2">
          <Icon name="mdi:lock" class="h-6 w-6" />
        </div>
        <div>
          <p class="text-lg font-semibold">Ditutup</p>
          <p class="text-xl">{{ closedRequestsCount }}</p>
        </div>
      </div>
      <div class="bg-white p-2 rounded shadow cursor-pointer flex items-center" @click="filterRequests('almostExpired')">
        <div class="bg-gray-700 text-gray-200 p-2 rounded mr-2">
          <Icon name="mdi:alert-circle" class="h-6 w-6" />
        </div>
        <div>
          <p class="text-lg font-semibold">Hampir Tamat</p>
          <p class="text-xl">{{ almostExpiredRequestsCount }}</p>
        </div>
      </div>
      <!-- Add more cards as needed -->
    </div>
    <div class="flex justify-between mb-4 space-x-2">
      <div class="flex space-x-2 flex-grow">
        <FormKit
        type="text"
        v-model="searchQuery"
        placeholder="Search..."
        class="border rounded p-2 flex-grow "
      />
        <Dropdown class="mt-1">
          <DropdownTrigger>
            <Button variant="outline" size="sm"><Icon name="mdi:filter" class="mr-2"></Icon>Filter</Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem @click="filterRequests('all')">All</DropdownItem>
            <DropdownItem @click="filterRequests('new')">Baharu</DropdownItem>
            <DropdownItem @click="filterRequests('approved')">Diluluskan</DropdownItem>
            <DropdownItem @click="filterRequests('pending')">Menunggu Pengesahan</DropdownItem>
            <DropdownItem @click="filterRequests('rejected')">Ditolak</DropdownItem>
            <DropdownItem @click="filterRequests('closed')">Ditutup</DropdownItem>
            <DropdownItem @click="filterRequests('almostExpired')">Hampir Tamat</DropdownItem>
            <DropdownItem @click="filterRequests('accessPeriod3')">Tempoh Akses: 3 bulan</DropdownItem>
            <DropdownItem @click="filterRequests('accessPeriod6')">Tempoh Akses: 6 bulan</DropdownItem>
            <DropdownItem @click="filterRequests('remainingDaysTiada')">Baki Tempoh: Tiada</DropdownItem>
            <DropdownItem @click="filterRequests('remainingDaysLuput')">Baki Tempoh: Luput</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
      <div class="flex space-x-2 mt-1">
        <Button variant="outline" size="sm" @click="printTable"><Icon name="mdi:printer" class="mr-2"></Icon>Print</Button>
        <Button variant="outline" size="sm" @click="openExportModal('excel')"><Icon name="mdi:file-excel" class="mr-2"></Icon>Export to Excel</Button>
        <Button variant="outline" size="sm" @click="openExportModal('pdf')"><Icon name="mdi:file-pdf" class="mr-2"></Icon>Export to PDF</Button>
      </div>
    </div>
    <div class="overflow-y-auto overflow-x-auto max-h-[560px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead @click="sortTable('name')">
              Nama
              <Icon name="mdi:sort" class="ml-1 h-4 w-4" />
            </TableHead>
            <TableHead class="w-[100px]" @click="sortTable('email')">
              Email
              <Icon name="mdi:sort" class="ml-1 h-4 w-4" />
            </TableHead>
            <TableHead class="w-[150px]" @click="sortTable('status')">
              Status Permohonan
              <Icon name="mdi:sort" class="ml-1 h-4 w-4" />
            </TableHead>
            <TableHead>Komen</TableHead>
            <TableHead class="w-[100px]" @click="sortTable('requestDate')">
              Tarikh Permohonan
              <Icon name="mdi:sort" class="ml-1 h-4 w-4" />
            </TableHead>
            <TableHead class="w-[100px]" @click="sortTable('updatedAt')">
              Tarikh Kemaskini
              <Icon name="mdi:sort" class="ml-1 h-4 w-4" />
            </TableHead>
            <TableHead class="w-[100px]">Tempoh Akses</TableHead>
            <TableHead class="w-[100px]" @click="sortTable('remainingDays')">
              Baki Tempoh
              <Icon name="mdi:sort" class="ml-1 h-4 w-4" />
            </TableHead>
            <TableHead class="text-right sticky right-0 ">Tindakan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="request in paginatedRequests" :key="request.email">
            <TableCell class="font-medium">{{ request.name }}</TableCell>
            <TableCell>{{ request.email }}</TableCell>
            <TableCell>
              <Badge :variant="getBadgeVariant(request.status, request)">
                <Icon :name="getBadgeIcon(request.status)" class="mr-1 h-3 w-3" />
                {{ getStatusLabel(request) }}
              </Badge>
            </TableCell>
            <TableCell>{{ request.comment }}</TableCell>
            <TableCell>{{ request.requestDate }}</TableCell>
            <TableCell>{{ request.status === 'Pending' ? 'Tiada' : request.updatedAt }}</TableCell>
            <TableCell>{{ request.accessPeriod }} bulan</TableCell>
            <TableCell>{{ calculateRemainingDays(request.updatedAt, request.accessPeriod) }}</TableCell>
            <TableCell class=" space-x-2 sticky right-0">
              <Button variant="outline" size="sm" @click="viewDetails(request)"><Icon name="material-symbols:multimodal-hand-eye" class="mr-2"></Icon>Lihat</Button>
              <template v-if="getStatusLabel(request) === 'Menunggu Pengesahan'">
                <Button variant="outline" size="sm" @click="approveRequest(request)" class="hover:bg-green-500 hover:text-white"> <Icon name="material-symbols:check-box-outline" class="mr-2" ></Icon>Lulus</Button>
                <Button variant="outline" size="sm" @click="rejectRequest(request)" class="hover:bg-red-500 hover:text-white"> <Icon name="icon-park-outline:reject" class="mr-2"></Icon>Tolak</Button>
              </template>
              <template v-if="getStatusLabel(request) === 'Diluluskan'">
                <Button variant="outline" size="sm" @click="blockRequest(request)" class="hover:bg-yellow-500 hover:text-white"> <Icon name="material-symbols:block" class="mr-2"></Icon>Sekat</Button>
              </template>
              <template v-if="getStatusLabel(request) === 'Ditolak'">
                <Button variant="outline" size="sm" @click="sendRejectionEmail(request)" class="hover:bg-blue-500 hover:text-white"> <Icon name="mdi:email-alert" class="mr-2"></Icon>Hantar Email</Button>
              </template>
              <template v-if="getStatusLabel(request) === 'Ditutup'">
                <Button variant="outline" size="sm" @click="reopenRequest(request)" class="hover:bg-blue-500 hover:text-white"> <Icon name="mdi:email-check" class="mr-2"></Icon>Buka Permohonan</Button>
              </template>
              <template v-if="getStatusLabel(request) === 'Baharu'">
                <Button variant="outline" size="sm" @click="confirmRequest(request)" class="hover:bg-blue-500 hover:text-white"> <Icon name="mdi:check-circle" class="mr-2"></Icon>Sahkan</Button>
              </template>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <div class="flex justify-between items-center mt-4">
      <div>
        Showing {{ startItem }} to {{ endItem }} of
        <Dropdown>
          <DropdownTrigger>
            <Button variant="outline" size="sm">{{ itemsPerPage }}</Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem v-for="option in itemsPerPageOptions" :key="option" @click="setItemsPerPage(option)">
              {{ option }}
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
      <div class="flex items-center space-x-2">
        <Button @click="prevPage" :disabled="currentPage === 1" class="rounded-md">Previous</Button>
        <Button v-for="page in totalPages" :key="page" @click="goToPage(page)" :variant="currentPage === page ? 'secondary' : 'primary'" class="cursor-pointer rounded-md">
          {{ page }}
        </Button>
        <Button @click="nextPage" :disabled="currentPage === totalPages" class="rounded-md">Next</Button>
      </div>
    </div>
    <Modal v-model:open="isExportModalOpen">
      <ModalHeader>
        <ModalTitle>Export Report</ModalTitle>
        <ModalDescription>Select the type of report to export.</ModalDescription>
      </ModalHeader>
      <ModalBody>
        <FormKit type="form" :actions="false" v-model="exportFormData">
          <FormKit
            type="select"
            name="reportType"
            label="Report Type"
            :options="reportTypeOptions"
            validation="required"
          />
        </FormKit>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" @click="isExportModalOpen = false">Cancel</Button>
        <Button @click="downloadReport"><Icon name="material-symbols:download" class="mr-2" ></Icon>Download</Button>
      </ModalFooter>
    </Modal>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

import { ref, computed } from 'vue';
import { FormKit } from '@formkit/vue';

const requests = ref([
  { name: 'Ahmad bin Ali', email: 'ahmad.ali@jkr.gov.my', status: 'New', comment:'Permohonan baru diterima', requestDate: '2023-10-01', updatedAt: 'Tiada', accessPeriod: 3 },
  { name: 'Siti binti Abu', email: 'siti.abu@jkr.gov.my', status: 'Approved', comment:'Permohonan berjaya dikemaskini', requestDate: '2023-09-25', updatedAt: '2025-10-01', accessPeriod: 6 },
  { name: 'Ali bin Abu', email: 'ali.abu@jkr.gov.my', status: 'Rejected', comment:'Permohonan ditolak', requestDate: '2023-09-20', updatedAt: '2025-09-25', accessPeriod: 3 },
  { name: 'Fatimah binti Ali', email: 'fatimah.ali@jkr.gov.my', status: 'Pending', comment:'Menunggu kelulusan', requestDate: '2023-09-15', updatedAt: 'Tiada', accessPeriod: 6 },
  { name: 'Abu bin Ahmad', email: 'abu.ahmad@jkr.gov.my', status: 'Pending', comment:'Menunggu kelulusan', requestDate: '2023-09-10', updatedAt: 'Tiada', accessPeriod: 3 },
  { name: 'Ali bin Siti', email: 'ali.siti@jkr.gov.my', status: 'Approved', comment:'Permohonan berjaya dikemaskini', requestDate: '2023-09-05', updatedAt: '2025-10-02', accessPeriod: 6 },
  { name: 'Siti binti Ali', email: 'siti.ali@jkr.gov.my', status: 'Rejected', comment:'Permohonan ditolak', requestDate: '2023-09-01', updatedAt: '2025-09-30', accessPeriod: 3 },
  { name: 'Ahmad bin Abu', email: 'ahmad.abu@jkr.gov.my', status: 'Approved', comment:'Permohonan berjaya dikemaskini', requestDate: '2023-08-25', updatedAt: '2025-07-01', accessPeriod: 3 },
  { name: 'Aisyah binti Ali', email: 'aisyah.ali@jkr.gov.my', status: 'Approved', comment:'Permohonan berjaya dikemaskini', requestDate: '2023-08-15', updatedAt: '2023-08-15', accessPeriod: 6 },
  { name: 'Muhammad bin Sulaiman', email: 'muhammad.sulaiman@jkr.gov.my', status: 'Approved', comment:'Permohonan berjaya dikemaskini', requestDate: '2023-08-10', updatedAt: '2023-09-20', accessPeriod: 3 },
  { name: 'Nurul binti Hassan', email: 'nurul.hassan@jkr.gov.my', status: 'Approved', comment:'Permohonan berjaya dikemaskini', requestDate: '2023-08-05', updatedAt: '2024-09-25', accessPeriod: 6 },
  { name: 'Hafiz bin Rahman', email: 'hafiz.rahman@jkr.gov.my', status: 'Approved', comment:'Permohonan berjaya dikemaskini', requestDate: '2023-08-01', updatedAt: '2025-10-05', accessPeriod: 3 },
  // Add more request data as needed
]);

const totalRequests = computed(() => requests.value.length);
const newRequestsCount = computed(() => requests.value.filter(request => request.status === 'New').length);
const approvedRequestsCount = computed(() => requests.value.filter(request => request.status === 'Approved' && calculateRemainingDays(request.updatedAt, request.accessPeriod) !== 'Luput').length);
const pendingRequestsCount = computed(() => requests.value.filter(request => request.status === 'Pending').length);
const rejectedRequestsCount = computed(() => requests.value.filter(request => request.status === 'Rejected').length);
const closedRequestsCount = computed(() => requests.value.filter(request => calculateRemainingDays(request.updatedAt, request.accessPeriod) === 'Luput').length);
const almostExpiredRequestsCount = computed(() => requests.value.filter(request => {
  const remainingDays = calculateRemainingDays(request.updatedAt, request.accessPeriod);
  const totalDays = request.accessPeriod * 30; // Approximate days in a month
  return remainingDays !== 'Luput' && remainingDays !== 'Tiada' && remainingDays <= totalDays * 0.1;
}).length);

const currentDate = computed(() => {
  const today = new Date();
  return today.toLocaleDateString();
});

const filter = ref('all');
const sortKey = ref('');
const sortOrder = ref(1);
const searchQuery = ref('');

const filteredRequests = computed(() => {
  let filtered = [...requests.value];
  if (filter.value !== 'all') {
    if (filter.value === 'closed') {
      filtered = filtered.filter(request => calculateRemainingDays(request.updatedAt, request.accessPeriod) === 'Luput');
    } else if (filter.value === 'almostExpired') {
      filtered = filtered.filter(request => {
        const remainingDays = calculateRemainingDays(request.updatedAt, request.accessPeriod);
        const totalDays = request.accessPeriod * 30; // Approximate days in a month
        return remainingDays !== 'Luput' && remainingDays !== 'Tiada' && remainingDays <= totalDays * 0.1;
      });
    } else if (filter.value === 'accessPeriod3') {
      filtered = filtered.filter(request => request.accessPeriod === 3);
    } else if (filter.value === 'accessPeriod6') {
      filtered = filtered.filter(request => request.accessPeriod === 6);
    } else if (filter.value === 'remainingDaysTiada') {
      filtered = filtered.filter(request => calculateRemainingDays(request.updatedAt, request.accessPeriod) === 'Tiada');
    } else if (filter.value === 'remainingDaysLuput') {
      filtered = filtered.filter(request => calculateRemainingDays(request.updatedAt, request.accessPeriod) === 'Luput');
    } else {
      filtered = filtered.filter(request => request.status.toLowerCase() === filter.value);
    }
  }
  if (searchQuery.value) {
    filtered = filtered.filter(request =>
      Object.values(request).some(value =>
        String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    );
  }
  return filtered;
});

const sortedRequests = computed(() => {
  let sorted = [...filteredRequests.value];
  if (sortKey.value) {
    sorted.sort((a, b) => {
      let result = 0;
      if (sortKey.value === 'remainingDays') {
        const aRemainingDays = calculateRemainingDays(a.updatedAt, a.accessPeriod);
        const bRemainingDays = calculateRemainingDays(b.updatedAt, b.accessPeriod);
        if (aRemainingDays === 'Tiada') return -1 * sortOrder.value;
        if (bRemainingDays === 'Tiada') return 1 * sortOrder.value;
        result = aRemainingDays - bRemainingDays;
      } else if (sortKey.value === 'updatedAt') {
        if (a.updatedAt === 'Tiada') return -1 * sortOrder.value;
        if (b.updatedAt === 'Tiada') return 1 * sortOrder.value;
        result = new Date(a.updatedAt) - new Date(b.updatedAt);
      } else if (sortKey.value === 'requestDate') {
        result = new Date(a[sortKey.value]) - new Date(b[sortKey.value]);
      } else {
        result = a[sortKey.value].localeCompare(b[sortKey.value]);
      }
      return result * sortOrder.value;
    });
  }
  return sorted;
});

const itemsPerPageOptions = [10, 25, 50];
const itemsPerPage = ref(itemsPerPageOptions[0]);
const currentPage = ref(1);

const paginatedRequests = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedRequests.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredRequests.value.length / itemsPerPage.value));
const startItem = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1);
const endItem = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredRequests.value.length));

function updatePagination() {
  currentPage.value = 1;
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function filterRequests(condition) {
  filter.value = condition;
}

function sortTable(key) {
  if (sortKey.value === key) {
    sortOrder.value = -sortOrder.value;
  } else {
    sortKey.value = key;
    sortOrder.value = 1;
  }
}

function viewDetails(row) {
  // Implement the logic to view details of the request
  console.log('Viewing details for:', row);
}

function approveRequest(request) {
  // Implement the logic to approve the request
  console.log('Approving request for:', request);
}

function rejectRequest(request) {
  // Implement the logic to reject the request
  console.log('Rejecting request for:', request);
}

function blockRequest(request) {
  // Implement the logic to block the request
  console.log('Blocking request for:', request);
}

function sendRejectionEmail(request) {
  // Implement the logic to send rejection email
  console.log('Sending rejection email for:', request);
}

function sendClosureEmail(request) {
  // Implement the logic to send closure email
  console.log('Sending closure email for:', request);
}

function reopenRequest(request) {
  // Implement the logic to reopen the request
  console.log('Reopening request for:', request);
}

function confirmRequest(request) {
  // Implement the logic to confirm the request
  console.log('Confirming request for:', request);
}

function printTable() {
  // Implement the logic to print the table
  console.log('Printing table');
}

function exportToExcel() {
  // Implement the logic to export the table to Excel
  console.log('Exporting table to Excel');
}

function exportToPDF() {
  // Implement the logic to export the table to PDF
  console.log('Exporting table to PDF');
}

function getBadgeVariant(status, request) {
  const remainingDays = calculateRemainingDays(request.updatedAt, request.accessPeriod);
  if (status === 'Approved' && remainingDays !== 'Luput') {
    return 'success';
  } else if (status === 'Pending') {
    return 'warning';
  } else if (status === 'Rejected') {
    return 'danger';
  } else if (status === 'New') {
    return 'info';
  } else if (remainingDays === 'Luput') {
    return 'default';
  }
  return 'default';
}

function getBadgeIcon(status) {
  switch (status) {
    case 'Approved':
      return 'ri-check-line';
    case 'Pending':
      return 'ri-time-line';
    case 'Rejected':
      return 'ri-close-line';
    case 'New':
      return 'mdi:new-box';
    default:
      return '';
  }
}

function getStatusLabel(request) {
  const remainingDays = calculateRemainingDays(request.updatedAt, request.accessPeriod);
  if (request.status === 'Approved' && remainingDays !== 'Luput') {
    return 'Diluluskan';
  } else if (request.status === 'Pending') {
    return 'Menunggu Pengesahan';
  } else if (request.status === 'Rejected') {
    return 'Ditolak';
  } else if (request.status === 'New') {
    return 'Baharu';
  } else if (remainingDays === 'Luput') {
    return 'Ditutup';
  }
  return request.status;
}

function calculateRemainingDays(updatedAt, accessPeriod) {
  if (updatedAt === 'Tiada') return 'Tiada';
  const updatedDate = new Date(updatedAt);
  const expiryDate = new Date(updatedDate.setMonth(updatedDate.getMonth() + accessPeriod));
  const today = new Date();
  const remainingTime = expiryDate - today;
  const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
  return remainingDays > 0 ? remainingDays : 'Luput';
}

function setItemsPerPage(option) {
  itemsPerPage.value = option;
  updatePagination();
}

function goToPage(page) {
  currentPage.value = page;
}

const isExportModalOpen = ref(false);
const exportFormData = ref({ reportType: '' });
const reportTypeOptions = [
  { value: 'general', label: 'General Report' },
  { value: 'accessUsage', label: 'Access Usage Statistics' }
];
let exportType = '';

function openExportModal(type) {
  exportType = type;
  isExportModalOpen.value = true;
}

function downloadReport() {
  if (exportType === 'excel') {
    exportToExcel();
  } else if (exportType === 'pdf') {
    exportToPDF();
  }
  isExportModalOpen.value = false;
}
</script>
