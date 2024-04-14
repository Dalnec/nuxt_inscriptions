<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const props = defineProps<{
  inscription: {};
}>();

const downloadImage = () => {
  const link = document.createElement("a");
  link.href = imageUrl.value;
  link.download = `${props.inscription.vouchergroup}.jpg`;
  link.click();
};

const imageUrl = ref("");

// Obtener la imagen desde el servidor
async function fetchImage() {
  const response = await fetch(`/api/sendImage/${props.inscription.voucherpath}`);
  if (response.ok) {
    imageUrl.value = URL.createObjectURL(await response.blob());
  } else {
    console.error("Error al obtener la imagen");
  }
}
// Llamar a fetchImage cuando la página se carga
fetchImage();
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="ghost" class="w-7 h-7 p-0">
        <Icon name="basil:picture-outline" class="text-2xl" />
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Vista de Recibo</DialogTitle>
        <DialogDescription> Recibo guardado en la inscripción </DialogDescription>
      </DialogHeader>
      <div class="flex justify-center">
        <img :src="imageUrl" alt="Imagen enviada desde el servidor" class="w-[70%]" />
      </div>
      <Button type="button" variant="outline" class="flex w-full items-center" @click="downloadImage()">
        <Icon name="ic:baseline-download" class="text-lg w-5" />
        Descargar
      </Button>
      <DialogFooter class="md:justify-end">
        <DialogClose as-child>
          <Button type="button" variant="secondary" class=""> Cerrar </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
