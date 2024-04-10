<script setup>
definePageMeta({
  layout: "admin",
  middleware: "authenticated",
});
</script>
<template>
  <div>
    <InscriptionsLista />
  </div>
</template>
