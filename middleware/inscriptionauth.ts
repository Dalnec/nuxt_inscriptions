export default defineNuxtRouteMiddleware(async (to, from) => {
  const useuserinfo = useUserInfo();
  const user = useSupabaseUser();

  if (user.value) {
    if (!useuserinfo.value) {
      console.log("user", user.value);

      useuserinfo.value = await $fetch("/api/user/email", {
        method: "POST",
        body: { email: user.value.email },
      });
    }
  } else {
    useuserinfo.value = {};
  }
});
