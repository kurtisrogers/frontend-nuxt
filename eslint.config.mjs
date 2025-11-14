// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import prettier from "eslint-plugin-prettier/recommended";

export default withNuxt(prettier).override("eslint-plugin-prettier/recommended", {
  rules: {
    "vue/no-multiple-template-root": "off",
  },
});
