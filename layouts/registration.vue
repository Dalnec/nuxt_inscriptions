<template>
  <div class="w-full m-0">
    <header id="home-section">
      <Nav />
    </header>
    <slot />
    <Toaster />
  </div>
</template>
<script setup>
useHead(() => ({
  meta: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
}));
</script>
