// DataTableDropDown.vue
<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";
import { toast } from "@/components/ui/toast";

// const props = defineProps<{
//   inscription: {};
// }>();
const { props = {} } = defineProps(["props"]);
// function copy(id: string) {
//   navigator.clipboard.writeText(id);
// }

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
  // const res = await $fetch(`/api/inscription/${item.id}`, { method: "PUT", body: { status: "CONFIRMADO" } });
  // if (res.success) {
  if (true) {
    toast({
      title: "INSCRIPCION ELIMINADA :(",
      description: "",
      class: "bg-red-600 text-white py-3",
      duration: 3000,
    });
    // props.reload();
  }
};
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
      <DropdownMenuItem @click="changeStatus(props.inscription)" :disabled="props.inscription.status == 'CONFIRMADO'">
        Confirmar
      </DropdownMenuItem>
      <DropdownMenuItem @click="deleteInscription(props.inscription)"> Eliminar </DropdownMenuItem>
      <!-- <DropdownMenuSeparator />
      <DropdownMenuItem>View customer</DropdownMenuItem>
      <DropdownMenuItem>View inscription details</DropdownMenuItem> -->
    </DropdownMenuContent>
  </DropdownMenu>
</template>
