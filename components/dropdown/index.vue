<script setup>
import { provide, ref } from 'vue';

defineOptions({ name: 'Dropdown' });

const isOpen = ref(false);
const position = ref({ x: 0, y: 0 });
const triggerRef = ref(null);

const toggle = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value && triggerRef.value) {
    const rect = triggerRef.value.getBoundingClientRect();
    position.value = {
      x: rect.left,
      y: rect.bottom + 4, // Add small gap
    };
  }
};

const close = () => {
  isOpen.value = false;
};

provide('dropdown', {
  isOpen,
  position,
  triggerRef,
  toggle,
  close,
});

onMounted(() => {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!triggerRef.value?.contains(target)) {
      close();
    }
  });
});
</script>

<template>
  <div class="relative inline-block text-left">
    <slot />
  </div>
</template> 