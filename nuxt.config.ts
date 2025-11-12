// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // css: ['~/assets/css/main.css'],
  modules: ["@nuxt/test-utils/module", "@nuxt/content", "@nuxt/eslint"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
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
});
