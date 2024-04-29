export default defineNuxtRouteMiddleware(async (to, from) => {
  const useuserinfo = useUserInfo();
  const user = useSupabaseUser();

  if (!user.value) {
    return navigateTo("/login");
  }
  if (!useuserinfo.value) {
    useuserinfo.value = await $fetch("/api/user/email", {
      method: "POST",
      body: { email: user.value.email },
    });
  }
});
