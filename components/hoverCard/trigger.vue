<script setup>
import { inject } from 'vue';

defineOptions({ name: 'HoverCardTrigger' });

const props = defineProps({
  delay: {
    type: Number,
    default: 200,
  },
});

const { triggerRef, show, hide } = inject('hover-card');

let timeout;

const handleMouseEnter = () => {
  clearTimeout(timeout);
  timeout = setTimeout(show, props.delay);
};

const handleMouseLeave = () => {
  clearTimeout(timeout);
  timeout = setTimeout(hide, props.delay);
};

onBeforeUnmount(() => {
  clearTimeout(timeout);
});
</script>

<template>
  <div
    ref="triggerRef"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </div>
</template> 