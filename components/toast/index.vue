<script setup>
import { toasts } from "~/composables/useToast";
import { TransitionGroup } from "vue";

const props = defineProps({
  position: {
    type: String,
    default: "bottom-right",
  },
});

const positionClasses = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
};
</script>

<template>
  <div
    :class="[
      'fixed z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:max-w-[420px]',
      positionClasses[position],
    ]"
  >
    <TransitionGroup
      enter-active-class="transition ease-out duration-300"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-2 opacity-0"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all"
        :class="{
          'bg-background text-foreground': toast.type === 'default',
          'bg-danger text-danger-foreground': toast.type === 'error',
          'bg-primary text-primary-foreground': toast.type === 'success',
        }"
      >
        <div class="flex items-start gap-2">
          <Icon
            v-if="toast.type === 'error'"
            name="ph:x-circle"
            class="h-5 w-5 text-danger-foreground"
          />
          <Icon
            v-if="toast.type === 'success'"
            name="ph:check-circle"
            class="h-5 w-5 text-primary-foreground"
          />
          <div class="grid gap-1">
            <div class="text-sm font-semibold">{{ toast.title }}</div>
            <div class="text-sm opacity-90">{{ toast.description }}</div>
          </div>
        </div>
        <button
          class="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
          @click="useToast().remove(toast.id)"
        >
          <Icon name="ph:x" class="h-4 w-4" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>
