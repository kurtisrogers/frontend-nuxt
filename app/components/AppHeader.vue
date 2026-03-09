<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

defineProps<{
  links: NavigationMenuItem[];
}>();
</script>

<template>
  <UHeader id="header" mode="slideover">
    <template #right>
      <UNavigationMenu class="hidden lg:flex" :items="links" />
      <ColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu :items="links" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
