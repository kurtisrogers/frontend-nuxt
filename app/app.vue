<template>
  <UIApp>
    <UIHeader mode="slideover">
      <template #left>
        <!-- TODO: Eventually add logo here -->
        <NuxtLink to="/">Kurtis Rogers</NuxtLink>
      </template>
    </UIHeader>
    <UIMain as="main">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UIMain>
    <UIFooter>
      <template #left>
        <p class="text-muted text-sm">Copyright © {{ new Date().getFullYear() }}</p>
      </template>

      <UINavigationMenu :items="[]" variant="link" />

      <template #right>
        <UIButton
          icon="i-simple-icons-discord"
          color="neutral"
          variant="ghost"
          to="https://go.nuxt.com/discord"
          target="_blank"
          aria-label="Discord"
        />
        <UIButton
          icon="i-simple-icons-x"
          color="neutral"
          variant="ghost"
          to="https://go.nuxt.com/x"
          target="_blank"
          aria-label="X"
        />
        <UIButton
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          to="https://github.com/nuxt/nuxt"
          target="_blank"
          aria-label="GitHub"
        />
      </template>
    </UIFooter>
  </UIApp>
</template>
