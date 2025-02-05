<template>
  <div>
    <h1 class="text-2xl font-semibold mb-6">Senarai Permohonan Pengguna Pre-Approval Plan</h1>
    <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
      <div class="bg-white p-2 rounded shadow cursor-pointer flex items-center" @click="filterRequests('all')">
        <div class="bg-gray-700 text-gray-200 p-2 rounded mr-2">
          <Icon name="mdi:clipboard-list" class="h-6 w-6" />
        </div>
        <div>
          <p class="text-lg font-semibold">Jumlah Permohonan</p>
          <p class="text-xl">{{ totalRequests }}</p>
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
    <div class="overflow-y-auto overflow-x-auto max-h-[625px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead class="w-[100px]">Email</TableHead>
            <TableHead class="w-[150px]">Status Permohonan</TableHead>
            <TableHead>Komen</TableHead>
            <TableHead class="w-[100px]">Tarikh Kemaskini</TableHead>
            <TableHead class="w-[100px]">Tempoh Akses</TableHead>
            <TableHead class="w-[100px]">Baki Tempoh</TableHead>
            <TableHead class="text-right sticky right-0 ">Tindakan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="request in filteredRequests" :key="request.email">
            <TableCell class="font-medium">{{ request.name }}</TableCell>
            <TableCell>{{ request.email }}</TableCell>
            <TableCell>
              <Badge :variant="getBadgeVariant(request.status, request)">
                <Icon :name="getBadgeIcon(request.status)" class="mr-1 h-3 w-3" />
                {{ getStatusLabel(request) }}
              </Badge>
            </TableCell>
            <TableCell>{{ request.comment }}</TableCell>
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
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

import { ref, computed } from 'vue';

const requests = ref([
  { name: 'Ahmad bin Ali', email: 'ahmad.ali@jkr.gov.my', status: 'Pending', comment:'Menunggu kemaskini Urusetia untuk kelulusan permohonan', updatedAt: 'Tiada', accessPeriod: 3 },
  { name: 'Siti binti Abu', email: 'siti.abu@jkr.gov.my', status: 'Approved', comment:'Permohonan berjaya dikemaskini', updatedAt: '2025-10-01', accessPeriod: 6 },
  { name: 'Ali bin Abu', email: 'ali.abu@jkr.gov.my', status: 'Rejected', comment:'Permohonan ditolak', updatedAt: '2025-09-25', accessPeriod: 3 },
  { name: 'Fatimah binti Ali', email: 'fatimah.ali@jkr.gov.my', status: 'Pending', comment:'Menunggu kelulusan', updatedAt: 'Tiada', accessPeriod: 6 },
  { name: 'Abu bin Ahmad', email: 'abu.ahmad@jkr.gov.my', status: 'Pending', comment:'Menunggu kelulusan', updatedAt: 'Tiada', accessPeriod: 3 },
  { name: 'Ali bin Siti', email: 'ali.siti@jkr.gov.my', status: 'Approved', comment:'Permohonan berjaya dikemaskini', updatedAt: '2025-10-02', accessPeriod: 6 },
  { name: 'Siti binti Ali', email: 'siti.ali@jkr.gov.my', status: 'Rejected', comment:'Permohonan ditolak', updatedAt: '2025-09-30', accessPeriod: 3 },
  { name: 'Ahmad bin Abu', email: 'ahmad.abu@jkr.gov.my', status: 'Approved', comment:'Permohonan berjaya dikemaskini', updatedAt: '2025-07-01', accessPeriod: 3 },
  { name: 'Aisyah binti Ali', email: 'aisyah.ali@jkr.gov.my', status: 'Approved', comment:'Permohonan berjaya dikemaskini', updatedAt: '2023-08-15', accessPeriod: 6 },
  { name: 'Muhammad bin Sulaiman', email: 'muhammad.sulaiman@jkr.gov.my', status: 'Approved', comment:'Permohonan berjaya dikemaskini', updatedAt: '2023-09-20', accessPeriod: 3 },
  { name: 'Nurul binti Hassan', email: 'nurul.hassan@jkr.gov.my', status: 'Approved', comment:'Permohonan berjaya dikemaskini', updatedAt: '2024-09-25', accessPeriod: 6 },
  { name: 'Hafiz bin Rahman', email: 'hafiz.rahman@jkr.gov.my', status: 'Approved', comment:'Permohonan berjaya dikemaskini', updatedAt: '2025-10-05', accessPeriod: 3 },
  // Add more request data as needed
]);

const totalRequests = computed(() => requests.value.length);
const approvedRequestsCount = computed(() => requests.value.filter(request => request.status === 'Approved' && calculateRemainingDays(request.updatedAt, request.accessPeriod) !== 'Luput').length);
const pendingRequestsCount = computed(() => requests.value.filter(request => request.status === 'Pending').length);
const rejectedRequestsCount = computed(() => requests.value.filter(request => request.status === 'Rejected').length);
const closedRequestsCount = computed(() => requests.value.filter(request => calculateRemainingDays(request.updatedAt, request.accessPeriod) === 'Luput').length);
const almostExpiredRequestsCount = computed(() => requests.value.filter(request => {
  const remainingDays = calculateRemainingDays(request.updatedAt, request.accessPeriod);
  const totalDays = request.accessPeriod * 30; // Approximate days in a month
  return remainingDays !== 'Luput' && remainingDays !== 'Tiada' && remainingDays <= totalDays * 0.1;
}).length);

const filter = ref('all');

const filteredRequests = computed(() => {
  if (filter.value === 'all') {
    return requests.value;
  } else if (filter.value === 'approved') {
    return requests.value.filter(request => request.status === 'Approved' && calculateRemainingDays(request.updatedAt, request.accessPeriod) !== 'Luput');
  } else if (filter.value === 'pending') {
    return requests.value.filter(request => request.status === 'Pending');
  } else if (filter.value === 'rejected') {
    return requests.value.filter(request => request.status === 'Rejected');
  } else if (filter.value === 'closed') {
    return requests.value.filter(request => calculateRemainingDays(request.updatedAt, request.accessPeriod) === 'Luput');
  } else if (filter.value === 'almostExpired') {
    return requests.value.filter(request => {
      const remainingDays = calculateRemainingDays(request.updatedAt, request.accessPeriod);
      const totalDays = request.accessPeriod * 30; // Approximate days in a month
      return remainingDays !== 'Luput' && remainingDays !== 'Tiada' && remainingDays <= totalDays * 0.1;
    });
  }
});

function filterRequests(condition) {
  filter.value = condition;
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

function getBadgeVariant(status, request) {
  const remainingDays = calculateRemainingDays(request.updatedAt, request.accessPeriod);
  if (status === 'Approved' && remainingDays !== 'Luput') {
    return 'success';
  } else if (status === 'Pending') {
    return 'warning';
  } else if (status === 'Rejected') {
    return 'danger';
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
  return remainingDays > 0 ? `${remainingDays} hari` : 'Luput';
}
</script>
