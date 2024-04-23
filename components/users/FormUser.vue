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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";

const supabase = useSupabaseClient();
const defaultformdata = ref({
  email: "",
  name: "",
  password: "" || undefined,
  profileId: "",
});
const formdata = ref({ ...defaultformdata.value });
const loadingSave = ref(false);
const open = ref(false);

const clearData = () => {
  formdata.value = { ...defaultformdata.value };
  open.value = false;
};

const { props = {} } = defineProps(["props"]);

const save = async () => {
  if (
    formdata.value.email == "" ||
    formdata.value.name == "" ||
    formdata.value.password == "" ||
    formdata.value.profileId == ""
  ) {
    toast({
      title: "** Verifique datos ingresados! **",
      description: "Todos los campos son obligatorios.",
      class: "bg-red-500 text-white font-bold py-3",
      duration: 2000,
    });
  } else {
    const newdata = { ...formdata.value, profileId: parseInt(formdata.value.profileId) };
    delete newdata.password;
    const res = await $fetch("/api/user/create", {
      method: "POST",
      body: newdata,
    });
    if (!res.success) {
      toast({
        title: "** Verifique datos ingresados! **",
        class: "bg-red-500 text-white font-bold py-3",
        duration: 2000,
      });

      setTimeout(() => {
        loadingSave.value = false;
      }, 2000);
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email: formdata.value.email,
      password: formdata.value.password,
    });
    console.log(data);

    if (error) {
      console.error(error);
    }
    clearData();
    await props.loadData();
    toast({
      title: "INSCRIPCION FINALIZADA",
      description: "Proceso realizado con exito",
      class: "bg-green-600 text-white py-3",
      duration: 3000,
    });
    setTimeout(() => {
      loadingSave.value = false;
    }, 2000);
  }
};
</script>

<template>
  <Dialog :open="open" @update:open="(value) => (open = value)">
    <DialogTrigger as-child>
      <Button variant="outline" :disabled="loadingSave"> Crear Usuario </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Crear Usuario</DialogTitle>
        <DialogDescription> </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> Nombre </Label>
          <Input v-model="formdata.name" class="col-span-3" autocomplete="off" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="email" class="text-right"> Correo </Label>
          <Input v-model="formdata.email" class="col-span-3" autocomplete="off" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="password" class="text-right"> Contraseña </Label>
          <Input v-model="formdata.password" class="col-span-3" autocomplete="off" />
        </div>
        <div class="grid grid-cols-1 items-center gap-4">
          <Select v-model="formdata.profileId">
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar Perfil" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="item in props.profiles" :key="item.id" :value="'' + item.id">
                  {{ item.description }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button @click="save()"> Guardar </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
