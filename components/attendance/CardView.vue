<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

const { props = {} } = defineProps(["props"]);

const persontype: any = {
  PASTOR: "PASTOR",
  MIEMBROACTIVO: "MIEMBRO ACTIVO",
  INVITADO: "INVITADO",
};

const confirmAttendance = async () => {
  if (props.item.status == "CONFIRMADO") {
    const res = await props.changestatus(props.item.id, "REGISTRADO");
    console.log(res);

    if (!res.success) {
      toast({
        title: "ERROR CAMBIO DE ESTADO! :(",
        class: "bg-red-600 text-white py-3 border-red-600",
        duration: 3000,
      });
      return;
    }
    // props.reload();
    props.item.status = "REGISTRADO";
    toast({
      title: "ASISTENCIA CONFIRMADA!",
      class: "bg-green-600 text-white py-3 border-green-600",
      duration: 3000,
    });
  } else {
    const res = await props.changestatus(props.item.id, "CONFIRMADO");
    console.log(res);
    props.item.status = "CONFIRMADO";
  }
};
</script>

<template>
  <Card
    class="my-1.5 py-2 w-full shadow-md cursor-pointer border border-input bg-background hover:bg-accent hover:text-accent-foreground"
  >
    <CardHeader class="gap-y-0.5 py-[6px] px-4 w-full">
      <CardDescription class="flex justify-between">
        <div class="flex items-center text-lg">
          <Icon name="mdi:id-card-outline" class="h-6 w-6 mr-2" />
          {{ props.item.person.doc_num }}
        </div>
      </CardDescription>
      <div>
        <CardTitle class="flex items-center text-lg">
          {{ props.item.person?.names }} {{ props.item.person?.lastnames }}
        </CardTitle>
        <CardDescription v-if="props.item.person?.gender == 'M'" class="flex justify-between">
          <div class="flex items-center text-lg">
            <Icon name="material-symbols:male" class="h-6 w-6 text-blue-500 mr-1" />
            {{ "MASCULINO" }}
          </div>
          <div class="flex items-center text-lg">
            <Icon name="ion:calendar-outline" class="h-6 w-6 mr-1" />
            {{ props.item.person.birthday }}
          </div>
        </CardDescription>
        <CardDescription v-if="props.item.person?.gender == 'F'" class="flex justify-between">
          <div class="flex items-center text-lg">
            <Icon name="material-symbols:male" class="h-6 w-6 text-pink-500 mr-1" />
            {{ "FEMENINO" }}
          </div>
          <div class="flex items-center text-lg">
            <Icon name="ion:calendar-outline" class="h-6 w-6 mr-1" />
            {{ props.item.person.birthday }}
          </div>
        </CardDescription>
        <CardDescription class="flex justify-between">
          <div class="flex items-center text-lg">
            <Icon name="pepicons-pop:smartphone-home-button" class="h-6 w-6 mr-1" />
            {{ props.item.person.phone }}
          </div>
          <div class="flex items-center text-lg">
            {{ persontype[props.item.person.type_person] }}
          </div>
        </CardDescription>
        <CardDescription class="flex justify-start items-center text-lg">
          <div>
            <Icon name="teenyicons:church-solid" class="h-5 w-5 mr-1" />
            {{ props.item.person.church.description }}
          </div>
        </CardDescription>
      </div>
      <CardDescription class="flex items-center text-lg"> Asistencia: </CardDescription>
      <CardDescription
        class="flex justify-center items-center"
        :class="props.item.status == 'REGISTRADO' ? 'text-green-500' : 'text-amber-500'"
      >
        <AttendanceDialogConfirm
          :props="{
            label: props.item.status == 'REGISTRADO' ? 'CONFIRMADA' : 'POR CONFIRMAR',
            title: 'CONFIRMAR ASISTENCIA',
            description: `DNI:${props.item.person.doc_num} 
             ${props.item.person.names} ${props.item.person.lastnames}
             Desea confirmar asistencia?`,
            action: confirmAttendance,
            status: props.item.status,
          }"
        />
        <!-- <span @click.prevent="confirmAttendance()">
          {{ props.item.status == "REGISTRADO" ? "CONFIRMADA" : "POR CONFIRMAR" }}
        </span> -->
      </CardDescription>
    </CardHeader>
  </Card>
</template>
