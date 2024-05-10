<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

const { props = {} } = defineProps(["props"]);

const persontype: any = {
  P: "PASTOR",
  L: "LIDER",
  M: "MIEMBRO ACTIVO",
  I: "INVITADO",
};

const deleteItem = (index: any) => {
  props.delete(index);
  toast({
    title: "ELIMINADO!",
    description: "Persona Eliminada de la Lista",
    class: "bg-amber-600 text-white py-3",
    duration: 4000,
  });
};
</script>

<template>
  <Card
    class="my-1.5 w-full shadow-md cursor-pointer border border-input bg-background hover:bg-accent hover:text-accent-foreground"
  >
    <CardHeader class="gap-y-0.5 py-[6px] px-4 w-full">
      <CardDescription v-if="props.mode == 'list' && props.item.doc_num" class="flex justify-between">
        <div>
          <Icon name="mdi:id-card-outline" class="ms-auto h-5 w-5" />
          {{ props.item.doc_num }}
        </div>
        <div>
          <Icon
            name="material-symbols:delete-outline"
            class="ms-auto h-5 w-5 text-red-600 shadow-md shadow-red-600/30 rounded-sm bg-background hover:bg-accent-100 hover:text-accent-foreground"
            @click.prevent="deleteItem(props.index)"
          />
        </div>
      </CardDescription>
      <div @click.prevent="props.mode == 'list' ? props.edit(props.item) : props.edit()">
        <CardTitle class="text-md">
          <!-- <Icon name="material-symbols:person" class="ms-auto h-5 w-5" /> -->
          {{ props.item?.names }} {{ props.item?.lastnames }}
        </CardTitle>
        <CardDescription v-if="props.item?.gender == 'M'" class="flex justify-between">
          <div>
            <Icon name="material-symbols:male" class="ms-auto h-5 w-5 text-blue-500" />
            {{ "MASCULINO" }}
          </div>
          <div>
            <Icon name="ion:calendar-outline" class="ms-auto h-5 w-5" />
            {{ props.item.birthday }}
          </div>
        </CardDescription>
        <CardDescription v-if="props.item?.gender == 'F'" class="flex justify-between">
          <div>
            <Icon name="material-symbols:male" class="ms-auto h-5 w-5 text-pink-500" />
            {{ "FEMENINO" }}
          </div>
          <div>
            <Icon name="ion:calendar-outline" class="ms-auto h-5 w-5" />
            {{ props.item.birthday }}
          </div>
        </CardDescription>
        <CardDescription v-if="props.item?.mode == 'list'" class="flex justify-between">
          <div>
            <Icon name="pepicons-pop:smartphone-home-button" class="ms-auto h-3.5 w-3.5" />
            {{ props.item.phone }}
          </div>
          <div>
            {{ persontype[props.item.type_person] }}
          </div>
        </CardDescription>
        <CardDescription v-if="props.mode == 'list'">
          <Icon name="teenyicons:church-solid" class="ms-auto h-4 w-4" />
          {{ props.getchurch(props.item) }}
        </CardDescription>
      </div>
    </CardHeader>
  </Card>
</template>
