<script setup>
// ... existing code ...

// Add new state management for catalogue items
const catalogueItems = ref([
  {
    id: 1,
    planName: "Single Storey Residential Plan Type A",
    category: "Residential",
    size: "1,200 sqft",
    price: "RM 1,500",
    thumbnail: "/images/plan-a-thumb.jpg",
    description: "Standard single storey residential plan with 3 bedrooms",
    specifications: {
      bedrooms: 3,
      bathrooms: 2,
      carPorch: "2 cars",
      landSize: "20' x 60'"
    },
    status: "Active",
    lastUpdated: "2024-01-15"
  },
  // Add more catalogue items...
]);

// Add new refs for catalogue management
const showCatalogueModal = ref(false);
const modalMode = ref('add'); // 'add', 'edit', or 'delete'
const selectedItem = ref(null);

const catalogueFormData = ref({
  planName: '',
  category: '',
  size: '',
  price: '',
  thumbnail: '',
  description: '',
  specifications: {
    bedrooms: 0,
    bathrooms: 0,
    carPorch: '',
    landSize: ''
  },
  status: 'Active'
});

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

const resetCatalogueForm = () => {
  catalogueFormData.value = {
    planName: '',
    category: '',
    size: '',
    price: '',
    thumbnail: '',
    description: '',
    specifications: {
      bedrooms: 0,
      bathrooms: 0,
      carPorch: '',
      landSize: ''
    },
    status: 'Active'
  };
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
const selectedCategory = ref('All');

const filteredCatalogue = computed(() => {
  return catalogueItems.value.filter(item => {
    const matchesSearch = item.planName.toLowerCase().includes(catalogueSearch.value.toLowerCase()) ||
                         item.description.toLowerCase().includes(catalogueSearch.value.toLowerCase());
    const matchesCategory = selectedCategory.value === 'All' || item.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <!-- Header Section -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">Building Plans Catalogue Management</h1>
      <p class="text-gray-600">Manage available building plans and their specifications</p>
    </div>

    <!-- Control Panel -->
    <div class="flex flex-wrap gap-4 mb-6">
      <div class="flex-1 min-w-[200px]">
        <input
          v-model="catalogueSearch"
          type="text"
          placeholder="Search plans..."
          class="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <select
        v-model="selectedCategory"
        class="px-4 py-2 border rounded-lg"
      >
        <option value="All">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
      <Button
        @click="openCatalogueModal('add')"
        class="bg-primary text-white px-4 py-2 rounded-lg"
      >
        <Icon name="mdi:plus" class="mr-2" />
        Add New Plan
      </Button>
    </div>

    <!-- Catalogue Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="item in filteredCatalogue"
        :key="item.id"
        class="hover:shadow-lg transition-shadow"
      >
        <img
          :src="item.thumbnail"
          :alt="item.planName"
          class="w-full h-48 object-cover rounded-t-lg"
        />
        <div class="p-4">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-bold">{{ item.planName }}</h3>
            <Badge :class="item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
              {{ item.status }}
            </Badge>
          </div>
          <p class="text-gray-600 text-sm mb-4">{{ item.description }}</p>
          <div class="grid grid-cols-2 gap-2 text-sm mb-4">
            <div>
              <span class="font-semibold">Category:</span> {{ item.category }}
            </div>
            <div>
              <span class="font-semibold">Size:</span> {{ item.size }}
            </div>
            <div>
              <span class="font-semibold">Price:</span> {{ item.price }}
            </div>
            <div>
              <span class="font-semibold">Last Updated:</span> {{ item.lastUpdated }}
            </div>
          </div>
          <div class="flex justify-end space-x-2">
            <Button
              variant="outline"
              @click="openCatalogueModal('edit', item)"
              class="text-blue-600"
            >
              <Icon name="mdi:pencil" class="mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              @click="openCatalogueModal('delete', item)"
              class="text-red-600"
            >
              <Icon name="mdi:delete" class="mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </div>

    <!-- Catalogue Management Modal -->
    <Modal v-model:open="showCatalogueModal">
      <ModalHeader>
        <ModalTitle>
          {{ modalMode === 'add' ? 'Add New Plan' : modalMode === 'edit' ? 'Edit Plan' : 'Delete Plan' }}
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <form v-if="modalMode !== 'delete'" @submit.prevent="handleCatalogueSubmit" class="space-y-4">
          <!-- Form fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormKit
              type="text"
              v-model="catalogueFormData.planName"
              label="Plan Name"
              validation="required"
            />
            <FormKit
              type="select"
              v-model="catalogueFormData.category"
              :options="categories"
              label="Category"
              validation="required"
            />
            <!-- Add more form fields -->
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