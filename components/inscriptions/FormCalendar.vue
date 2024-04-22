<script setup lang="ts">
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-vue-next";

import { ref } from "vue";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/v-calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const emit = defineEmits(["selectedDate"]);
const date = ref<Date>();
const props = defineProps({
  strdate: {
    type: Date,
  },
});
const selectedDate = computed(() => {
  if (date.value) {
    emit("selectedDate", format(date.value, "yyyy-MM-dd"));
    return format(date.value, "dd/MM/yyyy");
  }
});

watch(
  () => props.strdate,
  (newstrdate) => {
    if (newstrdate) {
      date.value = newstrdate;
    } else {
      date.value = undefined;
    }
  }
);
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button :variant="'outline'" :class="cn('justify-start text-left font-normal', !date && 'text-muted-foreground')">
        <CalendarIcon class="mr-2 h-4 w-4" />
        <span>{{ date ? selectedDate : "Selecciona una fecha" }}</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="date" />
    </PopoverContent>
  </Popover>
</template>
