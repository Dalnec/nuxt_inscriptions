// DataTableDropDown.vue
<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";

defineProps<{
  inscription: {
    id: string;
  };
}>();

// function copy(id: string) {
//   navigator.clipboard.writeText(id);
// }

const changeStatus = async (item: any) => {
  const res = await $fetch(`/api/inscription/${item.id}`, { method: "PUT", body: { status: "CONFIRMADO" } });
  console.log(res);
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
      <DropdownMenuItem @click="changeStatus(inscription)" :disabled="inscription.status == 'CONFIRMADO'">
        Confirmar
      </DropdownMenuItem>
      <!-- <DropdownMenuSeparator />
      <DropdownMenuItem>View customer</DropdownMenuItem>
      <DropdownMenuItem>View inscription details</DropdownMenuItem> -->
    </DropdownMenuContent>
  </DropdownMenu>
</template>
