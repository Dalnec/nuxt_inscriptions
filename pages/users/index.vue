<script setup>
definePageMeta({
  layout: "admin",
  middleware: "authenticated",
});
</script>
<template>
  <div>
    <UsersListUser />
  </div>
</template>
