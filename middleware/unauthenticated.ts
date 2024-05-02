export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();
  const useuserinfo = useUserInfo();
  if (user.value) {
    useuserinfo.value = await $fetch("/api/user/email", {
      method: "POST",
      body: { email: user.value.email },
    });
    switch (useuserinfo.value.profile.description) {
      case "ADMINISTRADOR":
        return await navigateTo("/inscriptions/list");
      case "STAFF":
        return await navigateTo("/inscriptions/list");
      case "PERSONA":
        return await navigateTo("/attendance");
      case "root":
        return await navigateTo("/users");
      default:
        return await navigateTo("/");
    }
  }
});
