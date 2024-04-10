<script setup lang="ts">
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";

const props = defineProps({
  totalItems: Number,
  currentPage: Number,
  itemsPerPage: Number,
});

const emit = defineEmits(["changePage"]);

const changePage = (newPage: any) => {
  emit("changePage", newPage);
};
</script>

<template>
  <Pagination
    v-slot="{ page }"
    :total="totalItems"
    :sibling-count="1"
    show-edges
    :default-page="currentPage"
    :itemsPerPage="itemsPerPage"
  >
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst @click="changePage(1)" />
      <PaginationPrev @click="changePage(currentPage - 1)" />

      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button
            class="w-10 h-10 p-0"
            :variant="item.value === currentPage ? 'default' : 'outline'"
            @click="changePage(item.value)"
          >
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext @click="changePage(currentPage + 1)" />
      <PaginationLast @click="changePage(Math.ceil(totalItems / itemsPerPage))" />
    </PaginationList>
  </Pagination>
</template>
