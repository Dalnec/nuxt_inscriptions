<script setup lang="ts">
import { ref, onMounted } from "vue";
import { columns } from "./columns";
import DataTable from "../inscriptions/DataTable.vue";
import ListaPagination from "../inscriptions/ListaPagination.vue";

const useuserinfo = useUserInfo();
const search = ref("");
const data = ref({
  count: 0,
  results: [],
});
const searchInput = ref("");
const currentPage = ref(1);
const pending = ref(false);
const profiles = ref([]);

const loadData = async () => {
  pending.value = true;
  const res = await $fetch("/api/user/list", {
    params: { search: search.value, take: 20, skip: (currentPage.value - 1) * 20 },
  });
  // console.log(res);
  data.value = res;
  pending.value = false;
};

const changePage = async (newPage: any) => {
  currentPage.value = newPage;
  console.log("currentPage", currentPage.value);
  await loadData();
};

const searchInscription = async () => {
  search.value = searchInput.value;
  currentPage.value = 1;
  await loadData();
};

profiles.value = await $fetch("/api/user/profiles");

onMounted(async () => {
  await loadData();
  // console.log("*****", useuserinfo.value);
  // if (useuserinfo.value.profile.description != "root" && useuserinfo.value.profile.description != "ADMINISTRADOR") {
  //   await navigateTo("/login");
  // }
});

const tableprops = ref({
  tablependieng: pending,
  tablerefresh: loadData,
  profiles: profiles.value,
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
    <UsersFormUser :props="{ profiles, loadData }" />
  </div>
  <div v-if="pending" class="flex justify-center">Cargando...</div>
  <div v-else class="container py-1 px-3">
    <DataTable :columns="columns" :data="data.results" :tableprops="tableprops" />
    <ListaPagination :total="data.count" :currentPage="currentPage" :itemsPerPage="20" @changePage="changePage" />
  </div>
</template>
