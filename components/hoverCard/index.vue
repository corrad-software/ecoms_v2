<script setup>
import { provide, ref } from 'vue';

defineOptions({ name: 'HoverCard' });

const isOpen = ref(false);
const position = ref({ x: 0, y: 0 });
const triggerRef = ref(null);

const show = () => {
  if (triggerRef.value) {
    const rect = triggerRef.value.getBoundingClientRect();
    position.value = {
      x: rect.left,
      y: rect.bottom + 4,
    };
    isOpen.value = true;
  }
};

const hide = () => {
  isOpen.value = false;
};

provide('hover-card', {
  isOpen,
  position,
  triggerRef,
  show,
  hide,
});
</script>

<template>
  <div class="relative inline-block">
    <slot />
  </div>
</template> 