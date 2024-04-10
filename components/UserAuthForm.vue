<script setup lang="ts">
import { ref } from "vue";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/toast";

const supabase = useSupabaseClient();
const credentials = reactive({ email: "", password: "" });
const isLoading = ref(false);

async function login(event: Event) {
  event.preventDefault();
  isLoading.value = true;
  // const { data, error } = await supabase.auth.signUp(credentials);
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  console.log(data);

  if (error) {
    console.error(error);
    toast({
      title: "CREDENCIALES INCORRECTAS",
      variant: "destructive",
      description: "Verifica tu correo y contraseña",
      class: "bg-red-500 text-white font-bold py-3",
      duration: 4000,
    });
    isLoading.value = false;
    return;
  }
  navigateTo("/inscriptions/list");

  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="login">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email"> Email </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
            v-model="credentials.email"
          />
        </div>
        <div class="grid gap-1">
          <Label class="sr-only" for="password"> Contraseña </Label>
          <Input
            id="password"
            placeholder="Contraseña"
            type="password"
            auto-capitalize="none"
            auto-complete="password"
            auto-correct="off"
            :disabled="isLoading"
            v-model="credentials.password"
          />
        </div>
        <Button :disabled="isLoading"> INGRESAR </Button>
      </div>
    </form>
  </div>
</template>
