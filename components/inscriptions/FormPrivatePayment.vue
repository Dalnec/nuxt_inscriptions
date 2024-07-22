<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { toast } from "@/components/ui/toast";
import { format, parseISO } from "date-fns";

const { props = {} } = defineProps(["props"]);
const listforms = useListForms();

const formdata = ref(props.paymentForm);
const paymentsMethods = ref([]);

const formSchema = toTypedSchema(
  z.object({
    paymentmethod: z.string({ required_error: "Campo requerido" }),
  })
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: { ...formdata.value },
});

onMounted(() => {
  // paymentsMethods.value = false ? props.paymentsMethods : props.paymentsMethods.filter((p: any) => p.id != 1);
  paymentsMethods.value = props.paymentsMethods;
});

const imagePreview = ref();

watch(imagePreview, (img: any) => {
  if (img && formdata.value.file.length > 0) {
    props.disabledSend(false);
  } else {
    if (formdata.value.paymentmethod == "1") {
      props.disabledSend(false);
    } else {
      props.disabledSend(true);
      imagePreview.value = undefined;
    }
  }
});

watch(formdata.value.file, (data: any) => {
  // console.log("data", data);

  if (data.length <= 0) {
    imagePreview.value = undefined;
  }
});

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
      duration: 5000,
    });
  }
};

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
function checkFileType(file: File) {
  if (file?.name) {
    // const fileType = file.name.split(".").pop();
    if (ACCEPTED_IMAGE_TYPES.includes(file.type)) return true;
  }
  return false;
}

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
      duration: 5000,
    });
  }
};
const virifyImg = computed(() => {
  if (formdata.value.file.length > 0) {
    return true;
  } else {
    imagePreview.value = undefined;
    return false;
  }
});
const totalToPay = computed(() => {
  if (listforms.value.length == 0) {
    prices.value.forEach((p) => {
      p.selected = true;
    });
    return 0;
  }
  // if (format(new Date(), "yyyy-MM-dd") <= format(parseISO("2024-06-15"), "yyyy-MM-dd")) {
  //   props.paymentForm.amount = 100;
  //   return listforms.value.length * 100;
  // }
  // props.paymentForm.amount = 120;
  const init = prices.value.find((p) => !p.selected);
  if (!init) return 0;
  props.paymentForm.amount = prices.value.find((p) => p.selected)?.price;
  return listforms.value.length * props.paymentForm.amount;
});

const prices = ref([
  {
    id: 1,
    description: "GENERAL",
    price: 120,
    selected: true,
  },
  {
    id: 2,
    description: "ALIMENTACION Y TALLERES",
    price: 90,
    selected: true,
  },
  {
    id: 3,
    description: "HOSPEDAJE Y TALLERES",
    price: 60,
    selected: true,
  },
  {
    id: 4,
    description: "4 DÍAS",
    price: 110,
    selected: true,
  },
  {
    id: 5,
    description: "3 DÍAS",
    price: 80,
    selected: true,
  },
  {
    id: 6,
    description: "2 DÍAS",
    price: 50,
    selected: true,
  },
]);
</script>
<template>
  <form class="space-y-3">
    <div class="flex justify-center text-2xl">
      <span class="font-bold pr-2">{{ listforms.length }}</span> personas
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="(item, index) in prices"
        :key="index"
        :class="
          'text-sm cursor-pointer hover:text-green-500 ' +
          (item.selected ? 'bg-green-200' : 'bg-gray-200') +
          ' font-bold p-2 rounded-lg shadow-md'
        "
        @click="
          prices.forEach((p) => {
            p.selected = item.id == p.id ? true : false;
          });
          formdata.observations = item.description;
        "
      >
        <div class="flex justify-center text-green-700">
          <span class="text-xs">{{ item.description }}</span>
        </div>
        <div class="flex justify-center">
          <span class="text-lg">S/.{{ item.price }}</span>
        </div>
      </div>
    </div>
    <div class="flex justify-center bg-gray-200 text-gray-700 font-bold text-2xl p-4 rounded-lg shadow-md">
      TOTAL S/. {{ totalToPay }}
    </div>
    <FormField v-slot="{ componentField }" name="paymentmethod">
      <FormItem>
        <FormLabel>METODO DE PAGO</FormLabel>
        <FormControl class="mt-4">
          <Tabs class="w-full">
            <TabsList class="w-full flex justify-between">
              <TabsTrigger
                v-for="(item, index) in paymentsMethods"
                :key="index"
                :value="'' + item.id"
                class="text-[12px] p-1 data-[state=active]:border-2 data-[state=active]:text-violet-500 data-[state=active]:border-violet-500/100 hover:underline"
                @click="
                  () => {
                    formdata.paymentmethod = '' + item.id;
                    if (formdata.paymentmethod == '1') {
                      imagePreview = null;
                    } else {
                      imagePreview = undefined;
                    }
                  }
                "
                :disabled="totalToPay <= 0"
              >
                {{ item.description }}
              </TabsTrigger>
            </TabsList>
            <TabsContent v-for="(item, index) in paymentsMethods" :key="index" :value="'' + item.id">
              <div v-show="item.id != '1'" class="flex space-x-3">
                <span class="px-2">
                  <img :src="item.icon" class="" :alt="item.id" width="60" />
                </span>
                <input type="text" :value="item.account" readonly class="w-full" />
                <Button variant="secondary" class="shrink-0" @click.prevent="copyText(item.account)"> Copiar </Button>
              </div>
              <FormItem v-show="item.id != '1'" class="pt-4">
                <FormLabel>ADJUNTAR RECIBO DE PAGO</FormLabel>
                <FormControl>
                  <Input id="picture" type="file" v-model="formdata.voucher" @change="previewImage" accept="image/*" />
                </FormControl>
                <FormMessage />
              </FormItem>
              <div class="flex justify-center">
                <img v-if="virifyImg" :src="imagePreview" alt="Image Preview" class="w-1/3 h-1/3" />
              </div>
            </TabsContent>
          </Tabs>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </form>
</template>
