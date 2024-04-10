<template>
  <div>
    <nav class="bg-black border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NuxtLink to="/" class="flex items-center space-x-2 rtl:space-x-reverse">
          <img src="/images/banners/jni_logo.jpg" class="h-12" alt="JNI LOGO" width="150px" />
        </NuxtLink>
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
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
import { Button } from "@/components/ui/button";
import { ref } from "vue";
const supabase = useSupabaseClient();

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error);
  navigateTo("/login");
};
</script>
