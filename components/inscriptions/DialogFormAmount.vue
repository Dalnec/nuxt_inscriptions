<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";

const user = useUserInfo();
const { props = {} } = defineProps(["props"]);
const loading = ref(false);
const amount = ref(null);

const save = async () => {
  loading.value = true;
  const res = await $fetch(`/api/inscription/${props.inscription.id}`, {
    method: "PUT",
    body: {
      amount: amount.value,
      observations: `${!!props.inscription.observations ? props.inscription.observations + "|" : ""}Edicion Monto: S/.${
        amount.value
      } usuario:${user.value?.name}`,
    },
  });
  setTimeout(() => {
    loading.value = false;
    props.open = false;
  }, 500);
  props.reload();
  toast({
    title: "INSCRIPCIÓN EDITADA :)",
    description: "Nuevo monto guardado con exito",
    class: "bg-green-600 text-white py-3",
    duration: 2000,
  });
};
</script>

<template>
  <div>
    <Dialog :open="props.open" @update:open="(value) => (props.open = value)">
      <DialogTrigger as-child>
        <Button v-if="user.profile.description === 'root'" variant="ghost" class="w-6 h-6 p-0 pr-1">
          <Icon name="hugeicons:note-edit" class="ms-auto h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent class="sm:max-w-[425px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Inscripción</DialogTitle>
          <DialogDescription> Edite los campos necesarios y guarde. </DialogDescription>
        </DialogHeader>
        <Input type="number" placeholder="Nuevo Monto" v-model="amount" autocomplete="off" />
        <div class="flex justify-end space-x-2">
          <Button @click.prevent="save()" :disabled="loading"> {{ loading ? "Guardando..." : "Guardar" }} </Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
