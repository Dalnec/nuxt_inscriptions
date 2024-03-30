// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxt/image"],
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
});

// export default defineNuxtConfig({
//   modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
//   shadcn: {
//     /**
//      * Prefix for all the imported component
//      */
//     prefix: '',
//     /**
//      * Directory that the component lives in.
//      * @default "./components/ui"
//      */
//     componentDir: './components/ui'
//   }
// })