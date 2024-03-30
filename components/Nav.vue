<template>
  <div class="">
    <nav
      class="bg-gradient-to-r from-purple-600 via-pink-500 to-violet-700 text-white shadow-2xl border-gray-200 dark:bg-gray-900"
    >
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/images/jni_logo.jpg" class="h-12" alt="Flowbite Logo" width="150px" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Moyobamba</span>
        </a>
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            class="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-lg transition duration-300 ease-in-out"
          >
            Inscribirse!
          </button>
          <button
            @click="
              () => {
                showBurgerMenu = !showBurgerMenu;
              }
            "
            data-collapse-toggle="navbar-cta"
            type="button"
            class="inline-flex items-center mr-4 p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="true"
          >
            <span class="sr-only">Open main menu</span>
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
          <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <a
                href="#"
                class="block py-2 px-3 md:p-0 text-white bg-violet-800 rounded md:bg-transparent md:text-violet-800 md:dark:text-violet-800"
                aria-current="page"
                >Home</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-3 md:p-0 text-white-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-violet-800 md:dark:hover:text-violet-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >About</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-3 md:p-0 text-white-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-violet-800 md:dark:hover:text-violet-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >Services</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-3 md:p-0 text-white-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-violet-800 md:dark:hover:text-violet-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >Contact</a
              >
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
</script>
