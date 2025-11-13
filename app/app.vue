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
    <UIFooter />
  </UIApp>
</template>
