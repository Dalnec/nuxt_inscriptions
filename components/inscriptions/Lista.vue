<script setup lang="ts">
import { ref, onMounted } from "vue";
import { columns } from "./columns";
import DataTable from "./DataTable.vue";
import ListaPagination from "./ListaPagination.vue";

const search = ref("");
const data = ref({
  count: 0,
  results: [],
});
const searchInput = ref("");
const currentPage = ref(1); // Ejemplo de página actual
const pending = ref(false);

const loadData = async () => {
  pending.value = true;
  const res = await $fetch("/api/inscription/list", {
    params: { search: search.value, take: 20, skip: (currentPage.value - 1) * 20 },
  });
  console.log(res);
  // data.value = { results: res.results.map((r) => ({ ...r, reload: loadData })), count: res.count };
  // console.log("data", data.value);
  data.value = res;
  pending.value = false;
};

const changePage = async (newPage: any) => {
  currentPage.value = newPage;
  console.log("currentPage", currentPage.value);
  await loadData();
  // refresh();
};

// const { pending, data, refresh, error } = useFetch("/api/inscription/list", {
//   lazy: false,
//   params: { search, take: 20, skip: (currentPage.value - 1) * 20 },
// });

const tableprops = ref({
  tablependieng: pending,
  // tablerefresh: refresh,
  tablerefresh: loadData,
});

const searchInscription = async () => {
  search.value = searchInput.value;
  currentPage.value = 1;
  await loadData();
};

onMounted(async () => {
  await loadData();
});
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
      <!-- @input="searchInscription" -->
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <Icon name="material-symbols:search" class="h-5 w-5 opacity-80" />
      </span>
    </div>
    <!-- <Button @click="refresh" variant="outline" class="text-violet-600 border-violet-600"> -->
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
  </div>
  <div v-if="pending" class="flex justify-center">Cargando...</div>
  <div v-else class="container py-1 px-3">
    <DataTable :columns="columns" :data="data.results" :tableprops="tableprops" />
    <ListaPagination :total="data.count" :currentPage="currentPage" :itemsPerPage="20" @changePage="changePage" />
  </div>
</template>
