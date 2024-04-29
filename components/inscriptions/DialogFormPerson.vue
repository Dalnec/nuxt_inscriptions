<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const { props = {} } = defineProps(["props"]);
</script>

<template>
  <div>
    <Dialog :open="props.open" @update:open="(value) => (props.open = value)">
      <DialogTrigger as-child>
        <Button variant="ghost" class="w-6 h-6 p-0 pr-1">
          <Icon name="uiw:edit" class="ms-auto h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent class="sm:max-w-[425px] overflow-y-auto h-full">
        <DialogHeader>
          <DialogTitle>Editar Datos de Persona</DialogTitle>
          <DialogDescription> Edite los campos necesarios y guarde. </DialogDescription>
        </DialogHeader>
        <InscriptionsFormEditPerson :props="props" />
      </DialogContent>
    </Dialog>
  </div>
</template>
