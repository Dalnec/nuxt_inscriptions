<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";
import { toast } from "@/components/ui/toast";

const { props = {} } = defineProps(["props"]);
const editprops = ref({ open: false });

const changeStatus = async (item: any) => {
  const res = await $fetch(`/api/inscription/${item.id}`, { method: "PUT", body: { status: "CONFIRMADO" } });
  if (res.success) {
    toast({
      title: "CAMBIO DE ESTADO",
      description: "Proceso realizado con exito",
      class: "bg-green-600 text-white py-3",
      duration: 3000,
    });
    props.reload();
  }
};
const deleteInscription = async (item: any) => {
  const res = await $fetch(`/api/inscription/${item.id}`, { method: "DELETE" });
  if (res.success) {
    toast({
      title: "INSCRIPCION ELIMINADA :(",
      description: "",
      class: "bg-red-600 border-red-600 text-white py-3",
      duration: 3000,
    });
    props.reload();
    return;
  }
  toast({
    title: "ERROR AL ELIMINAR",
    description: "",
    class: "bg-red-600 border-red-600 text-white py-3",
    duration: 3000,
  });
};

const openEdit = () => {
  editprops.value.open = true;
};

const propsConfirm = ref({
  label: "Confirmar",
  title: "Confirmar Inscripción",
  description: "Esta seguro que desea CONFIRMAR esta inscripción?",
  action: changeStatus,
  item: props.inscription,
});

const propsDelete = ref({
  label: "Eliminar",
  title: "Eliminar Inscripción",
  description: "Esta seguro que desea eliminar esta inscripción? Se eliminara de forma permanente.",
  action: deleteInscription,
  item: props.inscription,
});
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <!-- <DropdownMenuItem @click="changeStatus(props.inscription)" :disabled="props.inscription.status == 'CONFIRMADO'">
        Confirmar
      </DropdownMenuItem> -->
      <!-- <DropdownMenuItem @click="deleteInscription(props.inscription)"> Eliminar </DropdownMenuItem> -->
      <InscriptionsDialogConfirm :props="propsConfirm" />
      <InscriptionsDialogConfirm :props="propsDelete" />
      <!-- <DropdownMenuSeparator />
      <DropdownMenuItem>View customer</DropdownMenuItem>
      <DropdownMenuItem>View inscription details</DropdownMenuItem> -->
    </DropdownMenuContent>
  </DropdownMenu>
</template>
