<template>
  <div class="w-full m-0">
    <header id="home-section">
      <Nav />
    </header>
    <slot />
    <footer id="contactus-section" class="bg-black">
      <!-- <OurInfo /> -->
      <p class="text-center text-[10px]">&copy; DanyL {{ currentyear }}</p>
    </footer>
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
const currentyear = new Date().getFullYear();
</script>
