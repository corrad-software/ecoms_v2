<script setup>
import { inject, ref, computed } from 'vue';

defineOptions({ name: 'DropdownContent' });

const { isOpen, position } = inject('dropdown');
const contentRef = ref(null);

const adjustedPosition = computed(() => {
  if (!contentRef.value) return position.value;

  const content = contentRef.value;
  const contentRect = content.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  let { x, y } = position.value;

  // Adjust vertical position
  if (y + contentRect.height > windowHeight) {
    y = Math.max(0, windowHeight - contentRect.height);
  }

  // Adjust horizontal position
  if (x + contentRect.width > windowWidth) {
    x = Math.max(0, windowWidth - contentRect.width);
  }

  return { x, y };
});
</script>

<template>
  <Transition name="dropdown">
    <div
      v-if="isOpen"
      ref="contentRef"
      class="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
      :style="{
        position: 'fixed',
        top: `${adjustedPosition.y}px`,
        left: `${adjustedPosition.x}px`,
      }"
    >
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style> 