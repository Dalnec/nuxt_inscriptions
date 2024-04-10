<script setup>
import { AlertCircle } from "lucide-vue-next";
const { props = {} } = defineProps(["props"]);
</script>
<template>
  <div v-for="(p, key) in props.data" :key="key">
    <Alert variant="destructive">
      <AlertCircle class="w-4 h-4" />
      <AlertTitle class="flex justify-between">
        {{ p.title }}
        <Icon
          name="fluent-mdl2:status-circle-error-x"
          class="ms-auto h-5 w-5 shadow-md shadow-black-600/30 rounded-sm bg-background hover:bg-accent-100 hover:text-accent-foreground"
          @click.prevent="props.delete(p.index)"
        />
      </AlertTitle>
      <AlertDescription> {{ p.description }} </AlertDescription>
    </Alert>
  </div>
</template>
