<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { format, parseISO } from "date-fns";
import { parseDate } from "@internationalized/date";
import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

const { props = {} } = defineProps(["props"]);

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);
const dniRegex = new RegExp(/^([\s0-9])+$/);

const documentTypes = ref([]);
const churches = ref([]);
const documentLabel = ref("DNI");
const useloading = useLoading();

const changeDocumentLabel = (selected: string) => {
  documentLabel.value = documentTypes.value.find((d) => d.id == +selected)?.description || "DNI";
};

const defaultformdata = ref({
  documenttype_id: "",
  doc_num: "",
  names: "",
  lastnames: "",
  church_id: null,
  birthday: "",
  phone: "",
  gender: "",
  type_person: "",
  mode: "list",
});
const formdata = ref({ ...defaultformdata.value });
const loadingdni = ref(false);
const loading = ref(false);
const cardPersonalData = ref(false);
const formPersonalData = ref(false);
const birthday = ref();
const errorMessage = ref("");

const set_type_person = (tipo) => {
  switch (tipo) {
    case "PASTOR":
      return "P";
    case "MIEMBROACTIVO":
      return "M";
    case "INVITADO":
      return "I";
  }
};

onMounted(() => {
  formdata.value = {
    id: props.inscription.person.id,
    documenttype_id: props.inscription.person.documenttype_id,
    doc_num: props.inscription.person.doc_num,
    names: props.inscription.person.names,
    lastnames: props.inscription.person.lastnames,
    church_id: props.inscription.person.church_id,
    birthday: props.inscription.person.birthday,
    phone: props.inscription.person.phone,
    gender: props.inscription.person.gender,
    type_person: set_type_person(props.inscription.person.type_person),
    mode: "list",
  };
  birthday.value = new Date(formdata.value.birthday);
  cardPersonalData.value = true;
  form.resetForm({ values: { ...formdata.value } });
  formPersonalData.value = false;
  documentTypes.value = props.documentTypes();
  churches.value = props.churches();
});

const formSchema = toTypedSchema(
  z.object({
    doc_num: z
      .string({ required_error: "DNI es requerido", invalid_type_error: "Debe ser un numero de 8 digitos" })
      .regex(dniRegex, "DNI invalido")
      .min(8, {
        message: "Debe ingresar 8 digitos",
      })
      .max(10, {
        message: "Debe ingresar menos de 10 digitos no DNIs",
      }),
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
    phone: z.string().regex(phoneRegex, "Numero de Celular invalido").max(9, {
      message: "No puede superar los 9 caracteres.",
    }),
    type_person: z.string({ required_error: "Campo requerido" }).min(1, {
      message: "Seleccione una opción",
    }),
  })
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: { ...formdata.value },
});

const clearForm = () => {
  cardPersonalData.value = false;
  formPersonalData.value = false;
  formdata.value = { ...defaultformdata.value };
  form.resetForm({ values: { ...formdata.value } });
  birthday.value = undefined;
  changeDocumentLabel(formdata.value.documenttype_id);
};

const getPersonDni = async (dni: string) => {
  loadingdni.value = true;
  const data = await $fetch(`/api/person/dni/${dni}`);
  // console.log("person", data);
  if (data.success) {
    formdata.value.names = data.data.nombres;
    formdata.value.lastnames = `${data.data.apellido_paterno} ${data.data.apellido_materno}`;
    formdata.value.birthday = data.data.fecha_nacimiento;
    birthday.value = parseISO(data.data.fecha_nacimiento);
    formdata.value.gender = data.data.sexo == "MASCULINO" ? "M" : "F";
    form.resetForm({ values: { ...formdata.value } });
    cardPersonalData.value = true;
    formPersonalData.value = false;
    loadingdni.value = false;
  } else {
    clearForm();
    formPersonalData.value = true;

    toast({
      title: "DNI no encontrado :(",
      description: "Verifique el DNI ingresado",
      class: "bg-red-500 text-white font-bold py-3",
      duration: 2000,
    });
  }
  loadingdni.value = false;
};

const save = form.handleSubmit(async () => {
  if (formdata.value.church_id) {
    loading.value = true;
    const res = await $fetch(`/api/person/${formdata.value.id}`, {
      method: "PUT",
      body: formdata.value,
    });
    if (!res.success) {
      toast({
        title: "Error :(",
        description: "Verifique datos ingresados",
        class: "bg-red-500 text-white font-bold py-3",
        duration: 2000,
      });
      loading.value = false;
      return;
    }
    setTimeout(() => {
      clearForm();
      props.open = false;
    }, 300);
    useloading.value = false;
    props.reload();
    toast({
      title: "INSCRIPCIÓN EDITADA :)",
      description: "Cambios realizados con exito",
      class: "bg-green-600 text-white py-3",
      duration: 2000,
    });
  } else {
    errorMessage.value = "Seleccione una iglesia";
  }
});

const handleSelect = (option: any) => {
  if (option) {
    formdata.value.church_id = option.id;
    errorMessage.value = "";
  } else {
    errorMessage.value = "Seleccione una iglesia";
    formdata.value.church_id = null;
  }
};
</script>

<template>
  <form class="space-y-3">
    <FormField v-slot="{ componentField }" name="documenttype_id">
      <FormItem>
        <FormLabel>TIPO DOCUMENTO</FormLabel>
        <Select
          v-bind="componentField"
          v-model="formdata.documenttype_id"
          @update:model-value="changeDocumentLabel(formdata.documenttype_id)"
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Tipo de Documento de Identidad" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="item in documentTypes" :key="item.id" :value="item.id">
                {{ item.description }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="doc_num">
      <FormItem>
        <FormLabel>{{ documentLabel }}</FormLabel>
        <FormControl>
          <div class="flex w-full gap-1.5">
            <Input
              type="text"
              :placeholder="`Ingrese Numero de ${documentLabel}`"
              v-bind="componentField"
              v-model="formdata.doc_num"
              autocomplete="off"
            />
            <Button
              v-if="formdata.documenttype_id == '1'"
              variant="secondary"
              @click.prevent="getPersonDni(formdata.doc_num)"
              :disabled="loadingdni || formdata.doc_num.length < 8"
            >
              <Icon name="material-symbols:person-search" class="ms-auto h-5 w-5 opacity-80 mr-2" />
              {{ loadingdni ? "..." : "DNI" }}
            </Button>
          </div>
        </FormControl>
        <FormDescription v-if="formdata.documenttype_id == '1'">
          Ingresar Numero de DNI y presionar el boton para buscar.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="space-y-5">
      <FormField v-slot="{ componentField }" name="names">
        <FormItem>
          <FormLabel>NOMBRES</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Nombres"
              v-bind="componentField"
              v-model="formdata.names"
              autocomplete="off"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="lastnames">
        <FormItem>
          <FormLabel>APELLIDOS</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Apellidos"
              v-bind="componentField"
              v-model="formdata.lastnames"
              autocomplete="off"
            />
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
          <InscriptionsFormCalendar :strdate="birthday" @selectedDate="(value) => (formdata.birthday = value)" />
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <FormField v-slot="{ componentField }" name="phone">
      <FormItem>
        <FormLabel>CELULAR</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Numero de Celular"
            v-bind="componentField"
            v-model="formdata.phone"
            autocomplete="off"
          />
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

    <FormField name="church_id">
      <FormItem class="flex flex-col">
        <FormLabel :class="{ 'text-destructive': errorMessage ? true : false }">IGLESIA</FormLabel>
        <InscriptionsFilterableSelect
          :options="churches"
          @select="handleSelect"
          :selectedId="formdata.church_id"
          :errorMessage="errorMessage"
        />
        <FormDescription> Si es el caso. Ingresa nombre de la iglesia donde congregas. </FormDescription>
      </FormItem>
    </FormField>
    <!-- {{ formdata }} -->
    <div class="flex justify-end space-x-2">
      <Button @click.prevent="save()" :disabled="loading"> {{ loading ? "Guardando..." : "Guardar" }} </Button>
    </div>
  </form>
</template>
