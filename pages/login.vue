<script setup lang="ts">
definePageMeta({
  layout: "registration",
  middleware: "unauthenticated",
});
</script>
<template>
  <div class="relative flex-col items-center justify-center md:h-[800px] md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div class="absolute inset-0 bg-zinc-900" />
      <img src="/images/banners/jni_logo.jpg" class="h-12" alt="JNI LOGO" width="150px" />
      <!-- <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">
            &ldquo;This library has saved me countless hours of work and helped me deliver stunning designs to my
            clients faster than ever before.&rdquo;
          </p>
          <footer class="text-sm">Sofia Davis</footer>
        </blockquote>
      </div> -->
    </div>
    <div class="p-5 lg:p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">INICIAR SESION</h1>
          <p class="text-sm text-muted-foreground">Ingresa tu correo y contraseña</p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  </div>
</template>
