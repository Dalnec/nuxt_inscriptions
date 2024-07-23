<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { toast } from "@/components/ui/toast";
import { format, parseISO } from "date-fns";
import { columns } from "../users/columns";

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
  paymentsMethods.value = props.paymentsMethods;
});

const totalToPay = computed(() => {
  if (listforms.value.length == 0) {
    prices.value.forEach((p) => {
      p.selected = true;
    });
    return 0;
  }

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
  {
    id: 7,
    description: "1 DÍA",
    price: 25,
    selected: true,
  },
  {
    id: 8,
    description: "TALLERES",
    price: 40,
    selected: true,
  },
  {
    id: 9,
    description: "OTRO MONTO",
    price: 0,
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
            if (p.id == 9) {
              p.price = 0;
              props.disabledSend(true);
            }
          });
          formdata.observations = item.description;
        "
      >
        <div class="flex justify-center text-green-700">
          <span :class="item.id !== 9 ? 'text-xs' : 'text-md hover:text-green-500'">{{ item.description }}</span>
        </div>
        <div v-if="item.id !== 9" class="flex justify-center">
          <span class="text-lg">S/.{{ item.price }}</span>
        </div>
      </div>
    </div>
    <div v-if="prices.find((p) => p.selected)?.id === 9" class="grid grid-cols-1 gap-2 py-2">
      <Label>INGRESE NUEVO MONTO:</Label>
      <Input
        type="number"
        placeholder="Nuevo Monto S/."
        @update:modelValue="
          (v) => {
            let option = prices.find((p) => p.selected);
            option.price = v;
          }
        "
        autocomplete="off"
      />
      <Label>INGRESE OBSERVACIONES:</Label>
      <Input
        type="text"
        placeholder="Observaciones"
        v-model="formdata.observations"
        @update:modelValue="
          (v) => {
            formdata.observations = v;
          }
        "
        autocomplete="off"
      />
    </div>
    <div class="flex justify-center bg-gray-200 text-gray-700 font-bold text-2xl p-4 rounded-lg shadow-md">
      TOTAL S/. {{ totalToPay }}
    </div>
    <FormField v-slot="{ componentField }" name="paymentmethod">
      <FormItem v-if="totalToPay > 0">
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
                    // if (formdata.paymentmethod == '1') {
                    props.disabledSend(false);
                    // }
                  }
                "
              >
                <!-- :disabled="totalToPay <= 0" -->
                {{ item.description }}
              </TabsTrigger>
            </TabsList>
            <TabsContent v-for="(item, index) in paymentsMethods" :key="index" :value="'' + item.id">
              <div v-show="item.id != '1'" class="flex space-x-3">
                <span class="px-2">
                  <img :src="item.icon" class="" :alt="item.id" width="60" />
                </span>
                <input type="text" :value="item.account" readonly class="w-full" />
              </div>
            </TabsContent>
          </Tabs>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </form>
</template>
