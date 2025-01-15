<script setup>
defineOptions({
  name: "Modal",
});

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:open"]);

const close = () => {
  emit("update:open", false);
};

// Close on escape key
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === "Escape" && props.open) close();
  };
  document.addEventListener("keydown", handleEscape);

  onBeforeUnmount(() => {
    document.removeEventListener("keydown", handleEscape);
  });
});

provide("closeModal", close);
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="open" class="fixed inset-0 z-[9999]">
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-background/50 backdrop-blur-sm"
          @click="close"
        />
        <!-- Modal Content -->
        <div
          class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        >
          <div class="w-full max-w-lg">
            <div
              class="relative rounded-lg border bg-background p-6 shadow-lg"
              @click.stop
            >
              <slot />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
