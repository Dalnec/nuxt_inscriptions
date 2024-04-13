// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/image",
    "nuxt-icon",
    "@vee-validate/nuxt",
    "@nuxtjs/supabase",
    "@vueuse/nuxt",
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  devtools: { enabled: true },
  alias: {
    "@": resolve(__dirname, "./"),
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  supabase: {
    redirect: false,
  },
  redirectOptions: {
    login: "/login",
    // callback: '/confirm',
    include: undefined,
    exclude: ["/login", "/register", "/index", "/"],
    cookieRedirect: false,
  },
  nitro: {
    storage: {
      fs: {
        driver: "fs",
        base: "./public/uploads",
      },
    },
  },
  image: { dir: "./public", provider: "ipx", ipx: {} },
  serverMiddleware: {
    "/_ipx": "~/server/middleware/ipx.js",
  },
});
