<script setup lang="ts">
definePageMeta({
  layout: "registration",
});
</script>
<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-2xl">BIENVENIDO!!</CardTitle>
      <CardDescription class="text-lg">
        Por favor ver tutorial de Inscripcion. Luego seleccionar Inscribirse.
      </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-6">
      <RadioGroup class="grid grid-cols-1 gap-4">
        <div class="flex justify-center">
          <iframe
            width="420"
            height="315"
            src="https://www.youtube.com/embed/M5ndVe_xIKM?autoplay=0&mute=0"
            allowfullscreen
            mozallowfullscreen="mozallowfullscreen"
            msallowfullscreen="msallowfullscreen"
            oallowfullscreen="oallowfullscreen"
            webkitallowfullscreen="webkitallowfullscreen"
            frameborder="0"
          ></iframe>
        </div>

        <div>
          <RadioGroupItem id="individual" value="individual" class="peer sr-only" />
          <NuxtLink
            to="/inscriptions/register?group=true"
            for="individual"
            class="flex flex-col h-[170px] items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:border-primary hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Icon name="clarity:form-line" class="h-[70px] w-[70px] opacity-80" />
            <div class="text-lg font-bold">INSCRIBIRSE</div>
          </NuxtLink>
        </div>
        <!-- <div>
          <RadioGroupItem id="group" value="group" class="peer sr-only" />
          <NuxtLink
            to="/inscriptions/register?group=true"
            for="group"
            class="flex flex-col h-[200px] items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:border-primary hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Icon name="ic:baseline-groups-2" class="mb-3 h-[100px] w-[100px] opacity-80" />
            <div class="text-lg font-bold">INSCRIPCION GRUPAL</div>
          </NuxtLink>
        </div> -->
      </RadioGroup>
    </CardContent>
  </Card>
</template>
