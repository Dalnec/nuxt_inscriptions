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
  link.href = `/uploads/${props.inscription.voucherpath}`;
  link.download = `${props.inscription.vouchergroup}.jpg`;
  link.click();
};
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
        <DialogDescription> Recibo cargado en la inscripción </DialogDescription>
      </DialogHeader>
      <div class="flex justify-center">
        <!-- :src="`http://localhost:3000/uploads/${props.inscription.voucherpath}`" -->
        <img :src="`/images/banners/BannerCamp2024_1.png`" class="w-[70%]" :alt="props.inscription.vouchergroup" />
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
