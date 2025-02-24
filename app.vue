<script setup>
useSeoMeta({
  title: "ECOMS JKR V2",
  description: "Modern UI components for ECOMS JKR V2",
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <!-- Toast containers for all positions -->
    <Toast position="top-left" />
    <Toast position="top-right" />
    <Toast position="bottom-left" />
    <Toast position="bottom-right" />
  </div>
</template>

