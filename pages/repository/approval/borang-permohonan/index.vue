<script setup>

definePageMeta({
  layout: "admin",
});

const sections = ref(['A. Project Title', 'B. Applicant Details and Applicant Acknowledgment']);
const currentSection = ref(0);

const nextSection = () => {
  if (currentSection.value < sections.value.length - 1) {
    currentSection.value++;
  }
};

const prevSection = () => {
  if (currentSection.value > 0) {
    currentSection.value--;
  }
};

const isOpen = ref(false);

const submitForm = () => {
  isOpen.value = true;
};

const kementerianOptions = [
  'Ministry of Education Malaysia',
  'Ministry of Health Malaysia',
  'Ministry of Home Affairs',
  'Ministry of Defence Malaysia',
  'Ministry of Finance Malaysia',
  // Add more ministries as needed
];

const jenisAksessOptions = [
  'View Only',
  'View and Download',
];

const tempohAksessOptions = [
  'Up to 3 Months',
  'Up to 6 Months',
];

const syaratPemohonOptions = [
  'HODT (IP JKR & State)',
  'HODT',
  'Director (IP JKR & State)',
  'Head of Unit (IP JKR & State)',
  'Officer Cadre',
];

const jenisKategoriOptions = [
  'Category 1',
  'Category 2',
  'Category 3',
];

const kategoriBangunanOptions = [
  'Building 1',
  'Building 2',
  'Building 3',
];

const kategoriPAPOptions = [
  'PAP 1',
  'PAP 2',
  'PAP 3',
];

const jenisRekaBentukOptions = [
  'Design 1',
  'Design 2',
  'Design 3',
];

const disiplinOptions = [
  'Architect',
  'Electrical',
  'Structural',
  'Quantity Surveying',
  'Mechanical'
];

const pemohonData = ref({
  nama: 'Ahmad bin Ali',
  ic: '800101-01-1234',
  gred: 'J41',
  tempatBertugas: 'Jabatan Kerja Raya Malaysia',
  emel: 'ahmad.ali@jkr.gov.my'
});

const pengakuanText = computed(() => {
  return `I, ${pemohonData.value.nama}, acknowledge that I have complied with all the application requirements set by the PAP eCOMs secretariat, Architecture Branch, JKR Headquarters, Malaysia`;
});

const refreshPage = () => {
  window.location.reload();
};
</script>

<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Pre-Approval Plan Application Form</h1>
    </div>

    <!-- Section Indicator -->
    <div class="mb-4 flex justify-center space-x-4">
      <div v-for="(section, index) in sections" :key="index" class="flex items-center">
        <div :class="{'bg-slate-500 text-white': currentSection === index, 'bg-gray-200 text-gray-500': currentSection !== index}" class="rounded-full h-8 w-8 flex items-center justify-center">
          {{ index + 1 }}
        </div>
        <span :class="{'font-bold': currentSection === index, 'text-gray-500': currentSection !== index}" class="ml-2">
          {{ section }}
        </span>
        <div v-if="index < sections.length - 1" class="mx-2 h-px w-8 bg-gray-300"></div>
      </div>
    </div>

    <!-- Form Sections -->
    <Card>
      <CardContent class="p-6">
        <div v-if="currentSection === 0" class="mb-4">
          <h2 class="text-xl font-semibold my-4">A. Project Title</h2>
          <FormKit type="text" label="Project Title" placeholder="Example: PROPOSAL TO BUILD A HEALTH CLINIC IN MUAR, JOHOR" class="w-full mb-4" help="Please enter the project name in full words" />
          <FormKit type="file" accept=".pdf" help="File needs to be in .pdf format" validation="required" label="Commencement Letter" class="w-full mb-4" multiple />
          <FormKit type="select" label="Ministry" :options="kementerianOptions" class="w-full mb-4" />
          <FormKit type="select" label="Applicant Requirements" :options="syaratPemohonOptions" class="w-full mb-4" />
          
          <h3 class="text-lg font-semibold my-4">Access Request</h3>
          <div class="grid grid-cols-2 gap-4 border border-gray-200 p-4 rounded-lg">
            <FormKit type="select" label="Access Type" :options="jenisAksessOptions" class="w-full mb-4" />
            <FormKit type="select" label="Access Duration" :options="tempohAksessOptions" class="w-full mb-4" />
          </div>
        </div>

        <div v-if="currentSection === 1" class="mb-4">
          <h2 class="text-xl font-semibold my-4">B. Applicant Details and Applicant Acknowledgment</h2>
          <h3 class="text-lg font-semibold my-4">Applicant Details</h3>
          <div class="border border-gray-200 p-6 rounded-lg">
            <div class="grid grid-cols-2 gap-4 mb-4">
              <FormKit type="text" label="Name" v-model="pemohonData.nama" />
              <FormKit type="text" label="IC" v-model="pemohonData.ic" />
            </div>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <FormKit type="text" label="Grade" v-model="pemohonData.gred" />
              <FormKit type="text" label="Place of Duty" v-model="pemohonData.tempatBertugas" />
            </div>
            <FormKit type="email" label="Email" v-model="pemohonData.emel" class="w-full mb-4" />
          </div>
          
          <h3 class="text-lg font-semibold my-4">Pre-Approved Plan</h3>
          <div class="border border-gray-200 p-6 rounded-lg">
            <div class="grid grid-cols-4 gap-4 mb-4">
              <FormKit type="select" label="Category Type" :options="jenisKategoriOptions" class="w-full mb-4" />
              <FormKit type="select" label="Building Category" :options="kategoriBangunanOptions" class="w-full mb-4" />
              <FormKit type="select" label="PAP Category" :options="kategoriPAPOptions" class="w-full mb-4" />
              <FormKit type="select" label="Design Type" :options="jenisRekaBentukOptions" class="w-full mb-4" />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Discipline</label>
              <div class="flex space-x-4 border border-gray-200 p-4 rounded-lg ">
                <FormKit type="checkbox" v-for="option in disiplinOptions" :key="option" :label="option" class="mt-4"/>
              </div>
            </div>
          </div>

          <h2 class="text-lg font-semibold my-4">C. Applicant Acknowledgment</h2>
          <div class="border border-gray-200 p-6 rounded-lg">
            <FormKit type="checkbox" :label="pengakuanText" class="mb-4" />
          </div>
        </div>

        <div class="flex justify-between mt-4">
          <Button @click="prevSection" :disabled="currentSection === 0" class="btn"><Icon name="material-symbols:chevron-left" class="mr-2"></Icon>Previous</Button>
          <Button v-if="currentSection === sections.length - 1" @click="submitForm" class="btn"><Icon name="lsicon:submit-filled" class="mr-2"></Icon>Submit</Button>
          <Button v-else @click="nextSection" class="btn"><Icon name="material-symbols:chevron-right" class="mr-2"></Icon>Next</Button>
        </div>
      </CardContent>
    </Card>

    <Modal v-model:open="isOpen">
      <ModalHeader>
        <ModalTitle>Form Submission</ModalTitle>
        <ModalDescription>Your form has been submitted successfully.</ModalDescription>
      </ModalHeader>
      <ModalBody>
        <p>Thank you for your submission. We will review your application and get back to you shortly.</p>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" @click="isOpen = false">Close</Button>
        <Button @click="refreshPage">Affirmative</Button>
      </ModalFooter>
    </Modal>

  </div>
</template>
