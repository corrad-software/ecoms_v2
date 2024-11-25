<script setup>
import { inject, watch } from 'vue';

defineOptions({ name: 'TooltipContent' });

const props = defineProps({
  side: {
    type: String,
    default: 'top',
    validator: (value) => ['top', 'right', 'bottom', 'left'].includes(value),
  },
  sideOffset: {
    type: Number,
    default: 4,
  },
});

const { floating, isOpen, floatingStyles, arrowRef, arrowStyles, placement } = inject('tooltip');

// Watch for side prop changes and update placement
watch(() => props.side, (newSide) => {
  if (placement) {
    placement.value = newSide;
  }
}, { immediate: true });
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      ref="floating"
      :style="floatingStyles"
      class="z-50 overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
      :data-side="props.side"
      role="tooltip"
    >
      <slot />
      <div
        ref="arrowRef"
        :style="arrowStyles"
        class="absolute h-2 w-2 rotate-45 bg-popover border border-border data-[side=bottom]:-top-1 data-[side=top]:-bottom-1 data-[side=left]:-right-1 data-[side=right]:-left-1"
        :data-side="props.side"
      />
    </div>
  </Transition>
</template> 