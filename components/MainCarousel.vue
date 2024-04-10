<template>
  <Carousel class="w-full">
    <CarouselContent>
      <CarouselItem v-for="(slide, index) in slides" :key="index">
        <div class="">
          <span class="text-4xl font-semibold">
            <img :src="slide.image" :alt="slide.alt" class="w-full h-[90vh] md:h-[1300px]" />
          </span>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext class="hidden" />
  </Carousel>
</template>

<script setup lang="ts">
import { ref } from "vue";

const slides = ref([
  { image: "/images/banners/BannerCamp2024_1.png", alt: "banner 1" },
  { image: "/images/banners/BannerCamp2024_2.png", alt: "banner 2" },
  { image: "/images/banners/BannerCamp2024_2.png", alt: "banner 3" },
]);
</script>

<style scoped></style>
