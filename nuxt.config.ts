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
    "@scalar/nuxt",
  ],

  scalar: {
    spec: {
      url: "https://cdn.jsdelivr.net/npm/@scalar/galaxy/dist/latest.yaml",
    },
  },

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
