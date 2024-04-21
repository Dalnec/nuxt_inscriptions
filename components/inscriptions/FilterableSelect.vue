<template>
  <div class="relative">
    <!-- <input
      type="text"
      v-model="search"
      placeholder="Selecciona tu iglesia..."
      class="w-full p-2 mb-2 border border-gray-300 rounded"
      @input="filterOptions"
      @focus="showOptions = true"
      @blur="hideOptions"
    /> -->
    <input
      type="text"
      v-model="search"
      placeholder="Selecciona tu iglesia..."
      class="w-full p-2 mb-2 border border-gray-300 rounded"
      @input="filterOptions"
      @focus="showOptions = true"
      @blur="hideOptions"
    />
    <ul
      v-if="showOptions && filteredOptions.length"
      class="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto"
    >
      <li
        v-for="(option, index) in filteredOptions"
        :key="index"
        @click="selectOption(option)"
        class="p-2 cursor-pointer hover:bg-gray-100"
      >
        {{ option.description }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
const emit = defineEmits(["select"]);
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
});

const search = ref("");
const filteredOptions = computed(() =>
  props.options.filter((option) => option.description.toLowerCase().includes(search.value.toLowerCase()))
);

const showOptions = ref(false);

const filterOptions = () => {
  // La lógica de filtrado se maneja automáticamente a través de la propiedad computada
};

const selectOption = (option) => {
  search.value = option.description;
  emit("select", option);
  showOptions.value = false;
};

const hideOptions = () => {
  setTimeout(() => {
    showOptions.value = false;
  }, 100); // Retraso para evitar que se cierre inmediatamente al hacer clic en una opción
};
</script>
