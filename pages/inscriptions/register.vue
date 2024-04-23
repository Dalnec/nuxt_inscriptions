<script setup>
import { toast } from "@/components/ui/toast";
definePageMeta({
  layout: "registration",
});

const { pending: ch_pending, data: churches } = await useFetch("/api/person/churches", {
  lazy: false,
});
const { pending: dt_pending, data: documentTypes } = await useFetch("/api/person/documenttypes", {
  lazy: false,
});

const { pending: pm_pending, data: paymentsMethods } = await useFetch("/api/inscription/paymentmethods", {
  lazy: false,
});

const showpayment = ref(false);
const switchDisabled = ref(true);
const loadingSave = ref(false);

const listforms = useListForms();
const useloading = useLoading();

const changeLoadingRegister = () => {
  loadingRegister.value = true;
  setTimeout(() => {
    loadingRegister.value = false;
  }, 300);
};

const changeView = (state) => {
  showpayment.value = state;
};

const disabledSend = (state = true) => {
  switchDisabled.value = state;
};

const deleteAlert = (index) => {
  alertmessaje.value.data.splice(index, 1);
};

const open = ref(true);
const openChange = (valor) => {
  open.value = !open.value;
};

const alertmessaje = ref({ data: [], delete: deleteAlert });
const propsSheet = ref({
  listforms,
  changeView: changeView,
  open,
  openChange: openChange,
  churches: churches,
});

const propsFormPayment = ref({
  paymentsMethods,
  disabledSend,
  paymentForm: {
    paymentmethod: "",
    voucher: "",
    imagePreview: "",
    amount: 0,
    file: [],
  },
});

const clearData = () => {
  propsFormPayment.value.paymentForm.paymentmethod = null;
  propsFormPayment.value.paymentForm.voucher = "";
  propsFormPayment.value.paymentForm.imagePreview = undefined;
  propsFormPayment.value.paymentForm.amount = 0;
  propsFormPayment.value.paymentForm.file = [];
  listforms.value = [];
};

const propsFormPerson = ref({
  documentTypes: documentTypes,
  churches: churches,
  open,
});

onBeforeRouteLeave((to, from) => {
  const answer = window.confirm("¿Deseas salir la inscripción? No se guardaran los datos ingresados.");
  if (!answer) return false;
  clearData();
});

const save = async () => {
  loadingSave.value = true;
  useloading.value = true;

  // console.log("save", { persons: [...listforms.value], payment: { ...propsFormPayment.value.paymentForm } });
  const dataform = { persons: [...listforms.value], payment: { ...propsFormPayment.value.paymentForm } };
  if (dataform.persons.length > 0) {
    if (dataform.payment.paymentmethod) {
      if (dataform.payment.file.length > 0) {
        if (dataform.payment.voucher) {
          try {
            const formData = new FormData();
            const files = dataform.payment.file;
            // Append the array of objects as a JSON string
            formData.append("data", JSON.stringify(dataform.persons));
            formData.append("payment", JSON.stringify(dataform.payment.paymentmethod));
            formData.append("amount", JSON.stringify(dataform.payment.amount));

            for (let i = 0; i < files.length; i++) {
              formData.append("file", files[i]);
            }

            const res = await $fetch("/api/inscription/create", {
              method: "POST",
              body: formData,
            });

            // console.log(res);
            if (!res.success) {
              res.data.forEach((p) => {
                alertmessaje.value.data.push({
                  title: "ERROR INESPERADO",
                  description: `${res.message}: ${p.person.doc_num} - ${p.person.names} ${p.person.lastnames}. Elimine la persona de la Lista`,
                  class: "bg-amber-600 text-bold text-white",
                  duration: 4000,
                });
              });
              setTimeout(() => {
                loadingSave.value = false;
              }, 2000);
              return;
            }
            clearData();
            showpayment.value = false;
            toast({
              title: "INSCRIPCION FINALIZADA",
              description: "Proceso realizado con exito",
              class: "bg-green-600 text-white py-3",
              duration: 4000,
            });
            setTimeout(() => {
              useloading.value = false;
              loadingSave.value = false;
            }, 2000);
            return;
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  }
};
</script>
<template>
  <div>
    <ClientOnly>
      <LoadingView v-if="useloading" />
      <div class="w-full flex justify-center">
        <div v-if="dt_pending || pm_pending" class="flex justify-center h-100">Cargando...</div>
        <Card class="w-full md:w-1/2 lg:w-2/5">
          <CardHeader>
            <CardTitle>FORMULARIO DE INSCRIPCION</CardTitle>
            <CardDescription>Ingrese los datos correspondientes</CardDescription>
            <Separator />
            <InscriptionsAlertRegister :props="alertmessaje" />
          </CardHeader>
          <CardContent class="space-y-4 pb-0">
            <InscriptionsFormPerson v-show="!showpayment" :props="propsFormPerson" />
            <InscriptionsFormPayment v-show="showpayment" :props="propsFormPayment" />
          </CardContent>
          <CardHeader>
            <Separator />
          </CardHeader>
          <CardContent class="space-y-4">
            <Button v-show="listforms.length > 0" variant="outline" class="w-full" @click="open = !open">
              <Icon name="icon-park-outline:list" class="h-4 w-4 mr-1" />
              Ver Lista
            </Button>
            <div>
              <!-- <InscriptionsSheetPersons v-if="listforms.length > 0" :props="propsSheet" /> -->
              <InscriptionsSheetPersons :props="propsSheet" />
            </div>
            <Button
              v-show="listforms.length > 0 && showpayment"
              class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-8 px-4 rounded shadow-lg text-lg"
              @click="save"
              :disabled="switchDisabled || listforms.length == 0 || loadingSave"
            >
              ENVIAR!
            </Button>
          </CardContent>
        </Card>
      </div>
    </ClientOnly>
  </div>
</template>
