<!-- <template>
  <div class="carousel-container">
    <div class="carousel" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
      <div v-for="(slide, index) in slides" :key="index" class="slide">
        <img :src="slide.image" :alt="slide.alt" />
      </div>
    </div>
    <button @click="previousSlide" class="prev">Anterior</button>
    <button @click="nextSlide" class="next">Siguiente</button>
  </div>
</template> -->
<template>
  <Carousel class="relative w-full">
    <CarouselContent>
      <CarouselItem v-for="(slide, index) in slides" :key="index">
        <div class="">
          <Card>
            <CardContent class="w-full">
              <span class="text-4xl font-semibold">
                <img :src="slide.image" :alt="slide.alt" class="w-full h-[800px]" />
              </span>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext class="hidden" />
  </Carousel>
  <!-- <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
    <h1 class="text-white font-black">Título sobre la imagen</h1>
  </div> -->
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
// const currentSlide = ref(0);
// const slideInterval = ref();

const slides = ref([
  { image: "/images/FolletoCampMoyo.jpg", alt: "Descripción 1" },
  { image: "https://cdn.pixabay.com/photo/2016/11/18/15/44/audience-1835431_1280.jpg", alt: "Descripción 1" },
  { image: "https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_1280.jpg", alt: "Descripción 2" },
  { image: "https://cdn.pixabay.com/photo/2021/06/07/16/50/woman-6318447_960_720.jpg", alt: "Descripción 3" },
]);

// const nextSlide = () => {
//   currentSlide.value = (currentSlide.value + 1) % slides.value.length;
// };
// const previousSlide = () => {
//   currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
// };
// const startAutoPlay = () => {
//   slideInterval.value = setInterval(nextSlide, 4000); // 3000ms = 3s
// };
// const stopAutoPlay = () => {
//   clearInterval(slideInterval.value);
// };

// onMounted(() => {
//   startAutoPlay();
// });

// onBeforeUnmount(() => {
//   stopAutoPlay();
// });
</script>

<style scoped>
/* .carousel-container {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.carousel {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
}

.slide {
  flex: 0 0 100%;
  width: 100%;
}

.prev,
.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
} */
</style>
