// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@pinia/nuxt",
    "nuxt-lucide-icons",
  ],

  shadcn: {
    prefix: "",
    componentDir: "./app/components/ui",
  },

  runtimeConfig: {
    public: {
      defaultFetch: "$api",
    },
  },
});
