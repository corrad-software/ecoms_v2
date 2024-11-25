<script setup>
defineOptions({ name: "TableHeader" });
</script>

<template>
  <thead class="[&_tr]:border-b border-input bg-muted/50">
    <slot />
  </thead>
</template>
