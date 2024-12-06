<script setup>
definePageMeta({
  layout: 'admin'
})

const layoutStore = useLayoutStore()

const layoutOptions = [
  { 
    id: 'vertical',
    title: 'Vertical Menu',
    description: 'Traditional vertical sidebar navigation',
    icon: 'mdi:view-split-vertical',
    preview: '/images/layouts/vertical.svg'
  },
  { 
    id: 'horizontal',
    title: 'Horizontal Menu',
    description: 'Modern horizontal top navigation',
    icon: 'mdi:view-split-horizontal',
    preview: '/images/layouts/horizontal.svg'
  }
]

const directionOptions = [
  {
    id: 'ltr',
    title: 'Left to Right (LTR)',
    description: 'Default layout direction',
    icon: 'mdi:format-horizontal-align-left',
  },
  {
    id: 'rtl',
    title: 'Right to Left (RTL)',
    description: 'For RTL languages support',
    icon: 'mdi:format-horizontal-align-right',
  }
]

const handleLayoutChange = (layoutId) => {
  if (layoutStore.sidebarLayout !== layoutId) {
    layoutStore.toggleSidebarLayout()
  }
}

const handleDirectionChange = () => {
  layoutStore.toggleDirection()
}
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Theme Settings</h1>
      <p class="text-gray-600">Customize your admin interface layout and direction</p>
    </div>

    <!-- Layout Settings -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 class="text-lg font-semibold mb-4">Layout Configuration</h2>
      
      <div class="grid md:grid-cols-2 gap-4">
        <div
          v-for="option in layoutOptions"
          :key="option.id"
          class="border rounded-lg p-4 cursor-pointer transition-all duration-200"
          :class="{
            'border-primary-500 bg-primary-50': layoutStore.sidebarLayout === option.id,
            'hover:border-gray-400': layoutStore.sidebarLayout !== option.id
          }"
          @click="handleLayoutChange(option.id)"
        >
          <div class="flex items-start gap-4">
            <div
              class="p-2 rounded-lg"
              :class="layoutStore.sidebarLayout === option.id ? 'bg-primary-100' : 'bg-gray-100'"
            >
              <Icon :name="option.icon" class="w-6 h-6" :class="layoutStore.sidebarLayout === option.id ? 'text-primary-500' : 'text-gray-500'" />
            </div>
            <div>
              <h3 class="font-medium">{{ option.title }}</h3>
              <p class="text-sm text-gray-600">{{ option.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Direction Settings -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-lg font-semibold mb-4">Direction Configuration</h2>
      
      <div class="grid md:grid-cols-2 gap-4">
        <div
          v-for="option in directionOptions"
          :key="option.id"
          class="border rounded-lg p-4 cursor-pointer transition-all duration-200"
          :class="{
            'border-primary-500 bg-primary-50': (option.id === 'rtl' ? layoutStore.isRTL : !layoutStore.isRTL),
            'hover:border-gray-400': !(option.id === 'rtl' ? layoutStore.isRTL : !layoutStore.isRTL)
          }"
          @click="handleDirectionChange"
        >
          <div class="flex items-start gap-4">
            <div
              class="p-2 rounded-lg"
              :class="(option.id === 'rtl' ? layoutStore.isRTL : !layoutStore.isRTL) ? 'bg-primary-100' : 'bg-gray-100'"
            >
              <Icon
                :name="option.icon"
                class="w-6 h-6"
                :class="(option.id === 'rtl' ? layoutStore.isRTL : !layoutStore.isRTL) ? 'text-primary-500' : 'text-gray-500'"
              />
            </div>
            <div>
              <h3 class="font-medium">{{ option.title }}</h3>
              <p class="text-sm text-gray-600">{{ option.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
