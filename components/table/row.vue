<script setup>
defineOptions({ name: "TableRow" });
</script>

<template>
  <tr class="border-b border-input transition-colors hover:bg-muted/50">
    <slot />
  </tr>
</template>
