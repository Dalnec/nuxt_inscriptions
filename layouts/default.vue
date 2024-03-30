<template>
  <div class="w-full m-0">
    <header>
      <Nav />
    </header>
    <slot />
    <footer>&copy; DanyL {{ currentyear }}</footer>
  </div>
</template>
<script setup>
const currentyear = new Date().getFullYear();
</script>
