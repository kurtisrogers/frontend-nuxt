// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/test-utils/module",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/icon",
    "@nuxt/image",
    "nuxt-og-image",
    "@vueuse/nuxt",
    "motion-v/nuxt",
  ],
  devtools: {
    enabled: true,
  },
  css: ["~/assets/css/main.css"],
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
  ui: {
    content: true,
  },
  compatibilityDate: "2025-07-15",
  nitro: {
    prerender: {
      routes: ["/"],
      crawlLinks: true,
    },
  },
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
    class: "icon",
    mode: "css",
    cssLayer: "base",
    serverBundle: {
      collections: ["uil", "mdi", "lucide"],
    },
  },
});
