<script setup lang="ts">
import { h } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { format, parseISO } from "date-fns";

import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast, ToastAction } from "@/components/ui/toast";

const defaultformdata = ref({
  doc_num: "",
  names: "",
  lastnames: "",
  church: "",
  birthday: "",
  paymentmethod: "",
  phone: "",
  gender: "",
  type_person: "",
  voucher: "",
  amount: "",
  file: [],
});
const formdata = ref({ ...defaultformdata.value });
const loadingdni = ref(false);
const cardPersonalData = ref(false);
const formPersonalData = ref(false);

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
function checkFileType(file: File) {
  console.log("file", file);

  if (file?.name) {
    // const fileType = file.name.split(".").pop();
    if (ACCEPTED_IMAGE_TYPES.includes(file.type)) return true;
  }
  return false;
}

const imagePreview = ref();

const previewImage = (event: any) => {
  const file = event.target.files[0];
  formdata.value.file = event.target.files;

  if (checkFileType(file)) {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.value = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  } else {
    imagePreview.value = null;
    formdata.value.voucher = "";
    formdata.value.file = [];
    toast({
      title: "Error formato no aceptado :(",
      variant: "destructive",
      class: "py-3",
      duration: 4000,
    });
  }
};

const formSchema = toTypedSchema(
  z.object({
    doc_num: z
      .string()
      .min(8, {
        message: "Debe ingresar al menos 8 digitos",
      })
      .max(10),
    names: z
      .string({ required_error: "Campo requerido" })
      .min(2, {
        message: "Debe ingresar mas de 2 caracteres",
      })
      .max(30, {
        message: "No puede superar los 30 caracteres.",
      }),
    lastnames: z
      .string({ required_error: "Campo requerido" })
      .min(2, {
        message: "Debe ingresar mas de 2 caracteres",
      })
      .max(30, {
        message: "No puede superar los 30 caracteres.",
      }),
    gender: z.string({ required_error: "Campo requerido" }),
    birthday: z.string({ required_error: "Campo requerido" }),
    // birthday: z.date({
    //   required_error: "Fecha de Nacimiento es requerida.",
    // }),
    phone: z
      .string({ required_error: "Campo requerido" })
      .min(8, {
        message: "Numero de al menos 8 caracteres.",
      })
      .max(10, {
        message: "No puede superar los 10 caracteres.",
      }),
    church: z.string({ required_error: "Campo requerido" }).min(5, {
      message: "Numero de al menos 5 caracteres.",
    }),
    type_person: z.string({ required_error: "Campo requerido" }).min(1, {
      message: "Seleccione una opción",
    }),
  })
);

const copyText = async (account: string) => {
  try {
    await navigator.clipboard.writeText(account);
    toast({
      title: "Cuenta Copiada!",
      description: account,
      class: "py-3",
      duration: 4000,
    });
  } catch ($e) {
    toast({
      title: "Uh oh! Something went wrong.",
      variant: "destructive",
      description: "There was a problem with your request." + $e,
      class: "py-3",
      duration: 4000,
    });
  }
};

const paymentsMethods = [
  { label: "BCP", account: "435XXXXXXXXXXX", value: "bcp", icon: "/images/icons/logo_bcp.ico" },
  { label: "BBVA", account: "0011-0314-0200XXXXXX", value: "bbva", icon: "/images/icons/logo_bbva.ico" },
  { label: "YAPE", account: "999999999", value: "yape", icon: "/images/icons/logo_yape.ico" },
  { label: "PLIN", account: "999999999", value: "plin", icon: "/images/icons/logo_plin.ico" },
];

const form = useForm({
  validationSchema: formSchema,
  initialValues: { ...formdata.value },
});

const clearForm = () => {
  formdata.value = { ...defaultformdata.value };
  imagePreview.value = null;
};

const getPersonDni = async (dni: string) => {
  loadingdni.value = true;
  const token = "ba019259a25321333dd5d806678f88d5514a7c2b6c11515481617759d873249b";
  const data = await $fetch(`https://my.apidev.pro/api/dni/${dni}`, {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  });
  console.log("person", data);
  if (data.success) {
    formdata.value.names = data.data.nombres;
    formdata.value.lastnames = `${data.data.apellido_paterno} ${data.data.apellido_materno}`;
    formdata.value.birthday = data.data.fecha_nacimiento;
    formdata.value.gender = data.data.sexo == "MASCULINO" ? "M" : "F";
    form.resetForm({ values: { ...formdata.value } });
    cardPersonalData.value = true;
    loadingdni.value = false;
  }
  loadingdni.value = false;
};

const onSubmit = form.handleSubmit(async () => {
  try {
    let formData = new FormData();
    const files = formdata.value.file;

    formData.append("doc_num", formdata.value.doc_num);
    formData.append("names", formdata.value.names);
    formData.append("lastnames", formdata.value.lastnames);
    formData.append("church", formdata.value.church);
    formData.append("birthday", "" + formdata.value.birthday);
    formData.append("paymentmethod", formdata.value.paymentmethod);
    formData.append("phone", formdata.value.phone);
    formData.append("gender", formdata.value.gender);
    formData.append("voucher", formdata.value.voucher);

    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }
    const { data } = await useAsyncData("item", () =>
      $fetch("http://192.168.1.13:3000/api/inscription/create", {
        method: "POST",
        // body: { ...formdata.value },
        body: formData,
      })
    );
    clearForm();
    toast({
      title: "Inscripcion Terminada!",
      description: "Inscripcion realizada con exito",
      class: "bg-green-500 text-white py-3",
      duration: 4000,
    });
  } catch (error) {}
});
</script>

<template>
  <div class="w-full flex justify-center">
    <Card class="w-full md:w-1/2">
      <form>
        <CardHeader>
          <CardTitle>FORMULARIO DE INSCRIPCION</CardTitle>
          <CardDescription>Ingrese los datos correspondientes</CardDescription>
          <Separator />
        </CardHeader>
        <CardContent class="space-y-5">
          <FormField v-slot="{ componentField }" name="doc_num">
            <FormItem>
              <FormLabel>DNI</FormLabel>
              <FormControl>
                <div class="flex w-full gap-1.5">
                  <Input type="text" placeholder="Número DNI" v-bind="componentField" v-model="formdata.doc_num" />
                  <Button variant="secondary" @click.prevent="getPersonDni(formdata.doc_num)" :disabled="loadingdni">
                    <Icon name="material-symbols:person-search" class="ms-auto h-5 w-5 opacity-80 mr-2" />
                    {{ loadingdni ? "..." : "DNI" }}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <InscriptionsInfoPersonCard
            v-show="cardPersonalData"
            :props="{
              ...formdata,
              edit: () => {
                cardPersonalData = false;
                formPersonalData = true;
              },
            }"
          />

          <div v-show="formPersonalData" class="space-y-5">
            <FormField v-slot="{ componentField }" name="names">
              <FormItem>
                <FormLabel>NOMBRES</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Nombres" v-bind="componentField" v-model="formdata.names" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="lastnames">
              <FormItem>
                <FormLabel>APELLIDOS</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Apellidos" v-bind="componentField" v-model="formdata.lastnames" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="gender">
              <FormItem>
                <FormLabel>GÉNERO</FormLabel>
                <FormControl>
                  <RadioGroup class="flex flex-col space-y-1" v-bind="componentField" v-model="formdata.gender">
                    <FormItem class="flex items-center space-y-0 gap-x-3">
                      <FormControl>
                        <RadioGroupItem value="M" />
                      </FormControl>
                      <FormLabel class="font-normal"> Maculino </FormLabel>
                    </FormItem>
                    <FormItem class="flex items-center space-y-0 gap-x-3">
                      <FormControl>
                        <RadioGroupItem value="F" />
                      </FormControl>
                      <FormLabel class="font-normal"> Femenino </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="birthday">
              <FormItem class="flex flex-col">
                <FormLabel>FECHA DE NACIMIENTO</FormLabel>
                <Popover>
                  <PopoverTrigger as-child>
                    <FormControl>
                      <Button variant="outline">
                        <span>
                          {{
                            formdata.birthday
                              ? format(parseISO(formdata.birthday), "dd-MM-yyyy")
                              : "Seleccione una fecha"
                          }}
                        </span>
                        <Icon name="ion:calendar-outline" class="ms-auto h-5 w-5 opacity-80 mr-2" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent class="p-0">
                    <Calendar v-bind="componentField" v-model="formdata.birthday" />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <FormField v-slot="{ componentField }" name="phone">
            <FormItem>
              <FormLabel>CELULAR</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Numero de Celular" v-bind="componentField" v-model="formdata.phone" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="type_person">
            <FormItem>
              <FormLabel>PERTENECES A UNA IGLESIA?</FormLabel>
              <FormControl>
                <RadioGroup class="flex flex-col space-y-1" v-bind="componentField" v-model="formdata.type_person">
                  <FormItem class="flex items-center space-y-0 gap-x-3">
                    <FormControl>
                      <RadioGroupItem value="P" />
                    </FormControl>
                    <FormLabel class="font-normal"> Pastor </FormLabel>
                  </FormItem>
                  <FormItem class="flex items-center space-y-0 gap-x-3">
                    <FormControl>
                      <RadioGroupItem value="M" />
                    </FormControl>
                    <FormLabel class="font-normal"> Miembro Activo </FormLabel>
                  </FormItem>
                  <FormItem class="flex items-center space-y-0 gap-x-3">
                    <FormControl>
                      <RadioGroupItem value="I" />
                    </FormControl>
                    <FormLabel class="font-normal"> Invitado </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="church">
            <FormItem>
              <FormLabel>IGLESIA</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Iglesia" v-bind="componentField" v-model="formdata.church" />
              </FormControl>
              <FormDescription> Iglesia de donde eres parte. </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="paymentmethod">
            <FormItem>
              <FormLabel>METODO DE PAGO</FormLabel>
              <FormControl class="mt-4">
                <Tabs class="w-full">
                  <TabsList class="w-full flex justify-between">
                    <TabsTrigger
                      v-for="(item, index) in paymentsMethods"
                      :key="index"
                      :value="item.value"
                      class="data-[state=active]:border-2 data-[state=active]:text-violet-500 data-[state=active]:border-violet-500/100 hover:underline"
                      @click="
                        () => {
                          formdata.paymentmethod = item.value;
                        }
                      "
                    >
                      {{ item.label }}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent v-for="(item, index) in paymentsMethods" :key="index" :value="item.value">
                    <div class="flex space-x-3">
                      <span class="px-2">
                        <img :src="item.icon" class="" :alt="item.value" width="60" />
                      </span>
                      <input type="text" :value="item.account" readonly class="w-full" />
                      <Button variant="secondary" class="shrink-0" @click.prevent="copyText(item.account)">
                        Copiar
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="voucher">
            <FormItem>
              <FormLabel>ADJUNTAR RECIBO DE PAGO</FormLabel>
              <FormControl>
                <Input id="picture" type="file" v-model="formdata.voucher" @change="previewImage" accept="image/*" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <div class="flex justify-center">
            <img v-if="imagePreview" :src="imagePreview" alt="Image Preview" class="w-1/3 h-1/3" />
          </div>
          {{ formdata }}
          <br />
        </CardContent>
        <CardFooter class="flex justify-between px-6 pb-6">
          <Button
            variant="outline"
            class="border-2 text-red-500 border-red-500/100 hover:bg-red-500 hover:text-white"
            @click.prevent="clearForm"
          >
            Cancel
          </Button>
          <Button
            @click.prevent="onSubmit"
            class="bg-violet-600 hover:bg-violet-700 text-white shadow-xl shadow-violet-600/100 font-bold py-2 px-4 rounded shadow-md hover:shadow-md duration-500 transition ease-out scale-100 hover:scale-110"
          >
            Guardar!
          </Button>
        </CardFooter>
      </form>
    </Card>
  </div>
</template>
