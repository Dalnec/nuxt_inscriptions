<template>
  <LoadingView v-if="useloading" />
  <div class="container pt-5 px-3 flex justify-between mb-4">
    <div class="relative w-full max-w-sm items-center">
      <Input id="search" type="text" placeholder="Buscar..." class="pl-10" v-model="search" @keydown.enter="loadData" />
      <button
        @click.prevent="
          () => {
            search = '';
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
        search = '';
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
  <div v-if="!pending && data.count == 0" class="flex justify-center">Datos no encontrados</div>
  <div v-else class="container py-1 px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
    <CardView
      v-for="(item, index) in data.results"
      :key="item.doc_num"
      :props="{ item, index, changestatus: confirmAttendance, reload: loadData, userinfo: useuserinfo }"
    />
  </div>
</template>

<script setup>
import CardView from "./CardView.vue";

const useloading = useLoading();
const data = ref({});
const pending = ref(false);
const search = ref("");
const useuserinfo = useUserInfo();

const loadData = async () => {
  data.value = {};
  useloading.value = true;
  pending.value = true;
  const res = await $fetch("/api/inscription/toattend", {
    params: { search: search.value, take: 100, skip: 0 },
  });
  // console.log(res);
  data.value = res;
  setTimeout(() => {
    pending.value = false;
    useloading.value = false;
  }, 500);
};

const confirmAttendance = async (id, status) => {
  useloading.value = true;
  pending.value = true;
  const res = await $fetch(`/api/inscription/confirmAttendance/${id}`, {
    method: "PUT",
    body: { status },
  });
  // console.log(res);
  setTimeout(() => {
    pending.value = false;
    useloading.value = false;
  }, 500);
  return res;
};
</script>
