<script setup lang="ts">
definePageMeta({
  layout: "registration",
  middleware: "unauthenticated",
});
</script>
<template>
  <div
    class="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <!-- <a href="/examples/authentication" class="absolute right-4 top-4 md:right-8 md:top-8"> Login </a> -->
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div class="absolute inset-0 bg-zinc-900" />
      <div class="relative z-20 flex items-center text-lg font-medium">
        <img src="/images/banners/jni_logo.jpg" class="h-12" alt="JNI LOGO" width="150px" />
      </div>
    </div>
    <div class="lg:p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">Crear Cuenta</h1>
          <p class="text-sm text-muted-foreground">Ingresa tu correo para crear una cuenta</p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  </div>
</template>
