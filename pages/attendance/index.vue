<script setup>
definePageMeta({
  layout: "admin",
  middleware: "authenticated",
});
</script>
<template>
  <div>
    <AttendanceView />
  </div>
</template>
