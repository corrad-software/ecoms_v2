<script setup>
import { provide, ref } from 'vue';

defineOptions({ name: 'Popover' });

const isOpen = ref(false);
const position = ref({ x: 0, y: 0 });
const triggerRef = ref(null);

const toggle = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value && triggerRef.value) {
    const rect = triggerRef.value.getBoundingClientRect();
    position.value = {
      x: rect.left,
      y: rect.bottom + 4,
    };
  }
};

const close = () => {
  isOpen.value = false;
};

provide('popover', {
  isOpen,
  position,
  triggerRef,
  toggle,
  close,
});

onMounted(() => {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!triggerRef.value?.contains(target) && !event.target.closest('.popover-content')) {
      close();
    }
  });
});

onBeforeUnmount(() => {
  document.removeEventListener('click', close);
});
</script>

<template>
  <div class="relative inline-block">
    <slot />
  </div>
</template> 