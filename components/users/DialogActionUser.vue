<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

const { props = {} } = defineProps(["props"]);
const supabase = useSupabaseClient();
const deleteUser = async (item: any) => {
  const res = await $fetch(`/api/user/${item.id}`, { method: "DELETE" });
  if (res.success) {
    toast({
      title: "USUARIO ELIMINADA :(",
      class: "bg-red-600 border-red-600 text-white py-3",
      duration: 2000,
    });
    const data = await supabase.auth.unlinkIdentity(item.id);
    console.log(data);

    props.reload();
    return;
  }
  toast({
    title: "ERROR AL ELIMINAR",
    class: "bg-red-600 border-red-600 text-white py-3",
    duration: 3000,
  });
};

// const resend = async (item: any) => {
//   console.log("resend", item.email);

//   const { data, error } = await supabase.auth.resend({
//     type: "signup",
//     email: item.email,
//     // options: {
//     //   emailRedirectTo: "https://jnicamp.tsi.pe/login",
//     // },
//   });
//   console.log(data, error);
// };

const actions = (action: string, item: any) => {
  switch (action) {
    case "delete":
      deleteUser(item);
      break;
    case "resend":
      // resend(item);
      break;

    default:
      break;
  }
};
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button variant="ghost" class="w-6 h-6 p-0 pr-1">
        <Icon :name="props.action == 'delete' ? 'ic:baseline-delete' : 'fa:send'" class="ms-auto h-4 w-4" />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle> {{ props.title }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ props.description }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction @click="actions(props.action, props.item)"> Aceptar </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
