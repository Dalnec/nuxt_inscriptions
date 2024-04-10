<script setup></script>
<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-2xl">Ingrese </CardTitle>
      <CardDescription class="text-lg"> Por favor seleccione una opcion </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-6">
      <RadioGroup class="grid grid-cols-1 gap-4">
        <div>
          <RadioGroupItem id="individual" value="individual" class="peer sr-only" />
          <NuxtLink
            to="/inscriptions/register"
            for="individual"
            class="flex flex-col h-[200px] items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:border-primary hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Icon name="bi:person-arms-up" class="mb-3 h-[100px] w-[100px] opacity-80" />
            <div class="text-lg font-bold">INSCRIPCION INDIVIDUAL</div>
          </NuxtLink>
        </div>
        <div>
          <RadioGroupItem id="group" value="group" class="peer sr-only" />
          <NuxtLink
            to="/inscriptions/register?group=true"
            for="group"
            class="flex flex-col h-[200px] items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:border-primary hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Icon name="ic:baseline-groups-2" class="mb-3 h-[100px] w-[100px] opacity-80" />
            <div class="text-lg font-bold">INSCRIPCION GRUPAL</div>
          </NuxtLink>
        </div>
      </RadioGroup>
    </CardContent>
  </Card>
</template>
