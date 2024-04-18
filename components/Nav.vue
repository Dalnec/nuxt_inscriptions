<template>
  <div>
    <nav class="bg-black border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NuxtLink to="/" class="flex items-center space-x-2 rtl:space-x-reverse">
          <img src="/images/banners/jni_logo.jpg" class="h-12" alt="JNI LOGO" width="150px" />
          <!-- <span class="self-center text-2xl text-white font-semibold whitespace-nowrap dark:text-white">Moyobamba</span> -->
        </NuxtLink>
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <!-- to="/inscriptions/register?group=true" -->
          <NuxtLink
            v-if="$route.name == 'index'"
            to="/inscriptions"
            class="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded shadow-md shadow-violet-600/100 duration-500 transition ease-out scale-100 hover:scale-110"
          >
            Inscribirse!
          </NuxtLink>
          <button
            @click="
              () => {
                showBurgerMenu = !showBurgerMenu;
                console.log(showBurgerMenu);
              }
            "
            data-collapse-toggle="navbar-cta"
            type="button"
            class="inline-flex items-center mr-4 p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="true"
          >
            <span class="sr-only">Abrir Menu Principal</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          class="items-center justify-between {{ showBurgerMenu ? 'flex' : 'hidden' }} w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
          v-show="showBurgerMenu"
        >
          <!-- <div class="items-center justify-between sm:flex sm:hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta"> -->
          <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <NuxtLink
                :to="$route.name == 'index' ? '#home-section' : '/'"
                class="block py-2 px-3 md:p-0 text-white shadow-lg shadow-violet-600/{{selected=='home'?'100':'50'}} rounded md:bg-transparent hover:shadow-violet-600/100 hover:brightness-110"
              >
                <!-- class="border-2 text-violet-300 border-violet-300/100 text-white font-bold py-2 px-4 rounded shadow-md shadow-violet-600/100 duration-500 transition ease-out scale-100 hover:scale-110" -->
                PRINCIPAL
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="#contactus-section"
                class="block py-2 px-3 md:p-0 text-white shadow-lg shadow-violet-600/{{selected=='contactus'?'100':'50'}} rounded md:bg-transparent hover:shadow-violet-600/100 hover:brightness-110"
              >
                CONTÁCTANOS
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const showBurgerMenu = ref(true);
const selected = ref("home");
</script>
