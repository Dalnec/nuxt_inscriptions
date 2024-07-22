<template>
  <div>
    <nav class="bg-black border-gray-200 dark:bg-gray-900">
      <div v-if="user" class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NuxtLink to="/" class="flex items-center space-x-2 rtl:space-x-reverse">
          <img src="/images/banners/jni_logo.jpg" class="h-12" alt="JNI LOGO" width="150px" />
        </NuxtLink>
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
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
          <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li
              v-if="
                user.profile.description === 'ADMINISTRADOR' ||
                user.profile.description === 'root' ||
                user.profile.description === 'STAFF'
              "
            >
              <NuxtLink
                to="/inscriptions/privateregister"
                class="block py-2 px-3 md:p-0 text-white shadow-lg shadow-violet-600/{{selected=='home'?'100':'50'}} rounded md:bg-transparent hover:shadow-violet-600/100 hover:brightness-110"
                @click.prevent="
                  () => {
                    if (width < 768) showBurgerMenu = false;
                  }
                "
              >
                Nueva Inscripción
              </NuxtLink>
            </li>
            <li
              v-if="
                user.profile.description === 'ADMINISTRADOR' ||
                user.profile.description === 'root' ||
                user.profile.description === 'STAFF'
              "
            >
              <NuxtLink
                to="/inscriptions/list"
                class="block py-2 px-3 md:p-0 text-white shadow-lg shadow-violet-600/{{selected=='home'?'100':'50'}} rounded md:bg-transparent hover:shadow-violet-600/100 hover:brightness-110"
                @click.prevent="
                  () => {
                    if (width < 768) showBurgerMenu = false;
                  }
                "
              >
                Inscripciones
              </NuxtLink>
            </li>
            <li v-if="user.profile.description === 'ADMINISTRADOR' || user.profile.description === 'root'">
              <NuxtLink
                to="/users"
                class="block py-2 px-3 md:p-0 text-white shadow-lg shadow-violet-600/{{selected=='contactus'?'100':'50'}} rounded md:bg-transparent hover:shadow-violet-600/100 hover:brightness-110"
                @click.prevent="
                  () => {
                    if (width < 768) showBurgerMenu = false;
                  }
                "
              >
                Usuarios
              </NuxtLink>
            </li>
            <li
              v-if="
                user.profile.description === 'root' ||
                user.profile.description === 'ADMINISTRADOR' ||
                user.profile.description === 'STAFF' ||
                user.profile.description === 'PERSONA'
              "
              @click.prevent="
                () => {
                  if (width < 768) showBurgerMenu = false;
                }
              "
            >
              <NuxtLink
                to="/attendance"
                class="block py-2 px-3 md:p-0 text-white shadow-lg shadow-violet-600/{{selected=='contactus'?'100':'50'}} rounded md:bg-transparent hover:shadow-violet-600/100 hover:brightness-110"
              >
                Asistencia
              </NuxtLink>
            </li>
            <li
              v-if="width < 768"
              class="block py-2 px-3 md:p-0 text-white shadow-lg shadow-violet-600/{{selected=='contactus'?'100':'50'}} rounded md:bg-transparent hover:shadow-violet-600/100 hover:brightness-110"
              @click.prevent="
                () => {
                  if (width < 768) showBurgerMenu = false;
                  signOut();
                }
              "
            >
              Cerrar Sesión
            </li>
          </ul>
        </div>
        <div v-if="width > 768" class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Button
            to="/login"
            class="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded shadow-md shadow-violet-600/40 duration-500 transition ease-out scale-100 hover:scale-110"
            @click.prevent="signOut()"
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { Button } from "@/components/ui/button";
import { ref } from "vue";

const supabase = useSupabaseClient();
const user = useUserInfo();
const { width, height } = useWindowSize();
const showBurgerMenu = ref(width.value < 768 ? false : true);

watch(width, (newwidth) => {
  if (width.value < 768) {
    showBurgerMenu.value = false;
  } else {
    showBurgerMenu.value = true;
  }
});
const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error);
  navigateTo("/login");
};
</script>
