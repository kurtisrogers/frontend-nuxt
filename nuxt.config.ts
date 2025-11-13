// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/test-utils/module",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/icon",
    "@nuxt/image",
  ],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  css: ["~/assets/css/main.css"],
  ui: {
    prefix: "UI",
    content: true,
  },
  compatibilityDate: "2025-07-15",
  typescript: {
    typeCheck: true,
    strict: true,
  },
  eslint: {
    config: {
      stylistic: true, // Enable stylistic rules
    },
  },
  icon: {
    size: "2rem",
    class: "logo",
    mode: "css",
    cssLayer: "base",
    serverBundle: {
      collections: ["uil", "mdi"],
    },
  },
});
