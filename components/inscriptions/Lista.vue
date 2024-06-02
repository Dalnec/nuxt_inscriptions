<script setup lang="ts">
definePageMeta({
  middleware: function (to, from) {
    const user = useUserInfo();
    console.log(user.value.profile.description);
    if (user.value.profile.description != "PERSONA") {
      return navigateTo("/attendance");
    }
  },
});
import { ref, onMounted } from "vue";
import { columns } from "./columns";
import DataTable from "./DataTable.vue";
import ListaPagination from "./ListaPagination.vue";
import { generateExcelReportCatalogue } from "~/hooks/inscriptions_excel";

const search = ref("");
const data = ref({
  count: 0,
  results: [],
});
const searchInput = ref("");
const currentPage = ref(1);
const pending = ref(false);

const { pending: ch_pending, data: churches } = await useFetch("/api/person/churches", {
  lazy: false,
});
const { pending: dt_pending, data: documentTypes } = await useFetch("/api/person/documenttypes", {
  lazy: false,
});

const loadData = async () => {
  pending.value = true;
  const res = await $fetch("/api/inscription/list", {
    params: { search: search.value, take: 20, skip: (currentPage.value - 1) * 20 },
  });
  console.log(res);
  data.value = res;
  pending.value = false;
};

const changePage = async (newPage: any) => {
  currentPage.value = newPage;
  console.log("currentPage", currentPage.value);
  await loadData();
};

const tableprops = ref({
  tablependieng: pending,
  // tablerefresh: refresh,
  tablerefresh: loadData,
  churches,
  documentTypes,
});

const searchInscription = async () => {
  search.value = searchInput.value;
  currentPage.value = 1;
  await loadData();
};

onMounted(async () => {
  await loadData();
});

const downloadExcel = async () => {
  pending.value = true;
  const res = await $fetch("/api/inscription/report/excel");
  // console.log(res);
  await generateExcelReportCatalogue(res);
  pending.value = false;
};
</script>

<template>
  <div class="container pt-5 px-3 flex justify-between mb-4">
    <div class="relative w-full max-w-sm items-center">
      <Input
        id="search"
        type="text"
        placeholder="Buscar..."
        class="pl-10"
        v-model="searchInput"
        @keydown.enter="searchInscription"
      />
      <button
        @click.prevent="
          () => {
            searchInput = '';
            currentPage = 1;
            loadData();
          }
        "
        class="absolute right-2 top-2 p-1 text-sm text-gray-500 hover:text-gray-700"
      >
        Limpiar
      </button>
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <Icon name="material-symbols:search" class="h-5 w-5 opacity-80" />
      </span>
    </div>
    <Button
      @click.prevent="
        searchInput = '';
        search = '';
        currentPage = 1;
        loadData();
      "
      variant="outline"
      class="text-violet-600 border-violet-600"
    >
      <Icon name="material-symbols:refresh" class="h-5 w-5 opacity-80" />
      <div class="hidden md:block">Actualizar</div>
    </Button>
    <Button variant="ghost" @click.prevent="downloadExcel()" class="p-2">
      <Icon name="vscode-icons:file-type-excel" class="h-6 w-6 opacity-95" />
    </Button>
  </div>
  <div v-if="pending" class="flex justify-center">Cargando...</div>
  <div v-else class="container py-1 px-3">
    <DataTable :columns="columns" :data="data.results" :tableprops="tableprops" />
    <ListaPagination :total="data.count" :currentPage="currentPage" :itemsPerPage="20" @changePage="changePage" />
  </div>
</template>
