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

const edit = async () => {
  if (formdata.value.name == "" || formdata.value.profileId == "") {
    toast({
      title: "** Verifique datos ingresados! **",
      description: "Todos los campos son obligatorios.",
      class: "bg-red-500 text-white font-bold py-3",
      duration: 2000,
    });
  } else {
    loadingSave.value = true;
    const newdata = { name: formdata.value.name, profileId: parseInt(formdata.value.profileId) };
    const res = await $fetch(`/api/user/${formdata.value.id}`, {
      method: "PUT",
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
    clearData();
    await props.loadData();
    toast({
      title: "USUARIO ACTUALIZADO",
      description: "Proceso realizado con exito",
      class: "bg-green-600 text-white py-3",
      duration: 3000,
    });
    setTimeout(() => {
      loadingSave.value = false;
    }, 2000);
  }
};

const save = async () => {
  if (formdata.value.id) {
    await edit();
    return;
  }
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
    loadingSave.value = true;
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
      title: "USUARIO CREADO",
      description: "Proceso realizado con exito",
      class: "bg-green-600 text-white py-3",
      duration: 3000,
    });
    setTimeout(() => {
      loadingSave.value = false;
    }, 2000);
  }
};

onMounted(() => {
  if (props.item) {
    formdata.value = { ...props.item, profileId: props.item.profileId.toString() };
  }
});
</script>

<template>
  <Dialog :open="open" @update:open="(value) => (open = value)">
    <DialogTrigger as-child>
      <Button v-if="props.action != 'edition'" variant="outline" :disabled="loadingSave"> Crear Usuario </Button>
      <Button v-else variant="ghost" class="w-6 h-6 p-0 pr-1" :disabled="loadingSave">
        <Icon name="uiw:edit" class="ms-auto h-4 w-4" />
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ props.action == "edition" ? "Editar" : "Crear" }} Usuario</DialogTitle>
        <DialogDescription> </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> Nombre </Label>
          <Input v-model="formdata.name" class="col-span-3" autocomplete="off" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="email" class="text-right"> Correo </Label>
          <Input v-model="formdata.email" class="col-span-3" autocomplete="off" :disabled="props.action == 'edition'" />
        </div>
        <div v-if="props.action != 'edition'" class="grid grid-cols-4 items-center gap-4">
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
      <!-- {{ formdata }} -->
      <DialogFooter>
        <Button @click="save()" :disabled="loadingSave"> Guardar </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
