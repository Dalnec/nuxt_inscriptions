<script setup lang="ts">
const { props = {} } = defineProps(["props"]);
const editDataForm = useForms();
const edit = (item: any) => {
  editDataForm.value = { ...item };
  setTimeout(() => {
    props.changeView(false);
  }, 250);
};
const deleteItem = (index: any) => {
  props.listforms.splice(index, 1);
  if (props.listforms.length == 0) {
    props.changeView(false);
  }
};

const getChurchDescription = (item: any) => {
  console.log(item);

  return props.churches.find((c: any) => c.id == item.church_id)?.description;
};
</script>

<template>
  <div>
    <Sheet
      v-show="$route.query.group && props.listforms.length > 0"
      :open="props.open"
      :onUpdate:open="
        (value) => {
          console.log(value);

          props.open = !props.open;
        }
      "
    >
      <!-- :onUpdate:open="props.openChange(props.open)" -->
      <SheetContent class="flex flex-col min-h-screen w-[400px] sm:w-[540px] p-5 max-h-full">
        <SheetHeader class="gap-0">
          <SheetTitle class=""> Lista de Personas </SheetTitle>
          <SheetDescription class="text-[15px]">
            <span class="text-lg font-bold">{{ props.listforms.length }}</span> persona(s) registradas hasta el momento
          </SheetDescription>
        </SheetHeader>
        <div class="flex-grow overflow-y-auto gap-y-0.2 py-0 sm:max-h-[100%] max-h-[75%]">
          <SheetClose as-child class="flex w-full">
            <InscriptionsInfoPersonCard
              v-for="(item, index) in props.listforms"
              :key="item.doc_num"
              :props="{ item, mode: 'list', edit: edit, delete: deleteItem, index, getchurch: getChurchDescription }"
            />
          </SheetClose>
        </div>
        <SheetFooter>
          <SheetClose as-child>
            <div class="flex-shrink-0 grid grid-cols-2 gap-x-2 py-1 w-full">
              <Button variant="secondary" class="w-full" @click.prevent="props.changeView(false)">
                <Icon name="mingcute:plus-fill" class="h-5 w-5" />
                AGREGAR
              </Button>
              <Button class="w-full font-bold" @click.prevent="props.changeView(true)">
                <Icon name="lets-icons:ticket-alt-fill" class="h-5 w-5 opacity-80 mr-2" />
                PAGAR
              </Button>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
</template>
