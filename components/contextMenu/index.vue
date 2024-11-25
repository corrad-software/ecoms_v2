<script setup>
import { provide, ref } from "vue";

defineOptions({ name: "ContextMenu" });

const showMenu = ref(false);
const position = ref({ x: 0, y: 0 });

const handleContextMenu = (event) => {
  event.preventDefault();
  showMenu.value = true;
  position.value = {
    x: event.clientX,
    y: event.clientY,
  };
};

const closeMenu = () => {
  showMenu.value = false;
};

// Provide values to child components
provide("context-menu", {
  showMenu,
  position,
  closeMenu,
});

// Close menu when clicking outside
onMounted(() => {
  document.addEventListener("click", closeMenu);
});

onUnmounted(() => {
  document.removeEventListener("click", closeMenu);
});
</script>

<template>
  <div @contextmenu="handleContextMenu">
    <slot />
  </div>
</template>
