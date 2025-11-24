<script setup lang="ts">
import mainNavigatonItems from "#shared/data/navigation";
</script>

<template>
  <UIApp>
    <header class="mx-4 sticky top-0 z-50">
      <UIHeader id="header" mode="slideover" as="div">
        <template #left>
          <NuxtLink to="/">
            <KRLogo class="select-none" />
            <span class="sr-only">Kurtis Rogers home</span>
          </NuxtLink>
        </template>

        <template #right>
          <UINavigationMenu class="hidden lg:flex" :items="mainNavigatonItems" />
          <UIColorModeButton>
            <template #fallback>
              <UIButton loading variant="ghost" color="neutral" />
            </template>
          </UIColorModeButton>
        </template>

        <template #body>
          <UINavigationMenu :items="mainNavigatonItems" orientation="vertical" class="-mx-2.5" />
        </template>
      </UIHeader>
    </header>
    <UIMain id="main" as="main">
      <NuxtLayout>
        <NuxtPage />
        <UISeparator color="primary" />
        <UIPageSection class="threeDimRectangles">
          <UIPageCard
            class="rounded-none is-footer-card"
            description="I'm looking for my next gig. Let's smash some eggs and craft an elegant omelette..."
            icon="i-lucide-code"
            orientation="horizontal"
            variant="solid"
          >
            <template #title>
              <h2>Looking for a dev?</h2>
            </template>
            <template #footer>
              <div class="flex items-center justify-between">
                <UIButton
                  v-if="!$route.path.includes('about')"
                  class="mr-2"
                  to="/about"
                  trailing-icon="i-lucide-user"
                  >About</UIButton
                >
                <UIButton
                  to="/documents/KurtisRogersCV.pdf"
                  external
                  trailing
                  download
                  trailing-icon="i-lucide-download"
                  >Resume</UIButton
                >
              </div>
            </template>
          </UIPageCard>
        </UIPageSection>
      </NuxtLayout>
    </UIMain>
    <UIFooter id="footer">
      <template #left>
        <NuxtLink to="/" class="flex items-center content-center select-none">
          <KRLogo />
        </NuxtLink>
      </template>

      <UINavigationMenu :items="mainNavigatonItems" />

      <template #right>
        <UIButton
          icon="i-simple-icons-linkedin"
          color="neutral"
          variant="ghost"
          to="https://linkedin.com/in/kurtisrogers"
          target="_blank"
          aria-label="linkedin"
        />
        <UIButton
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          to="https://github.com/orgs/kurtisrogers/repositories"
          target="_blank"
          aria-label="GitHub"
        />
        <UIColorModeButton>
          <template #fallback>
            <UIButton loading variant="ghost" color="neutral" />
          </template>
        </UIColorModeButton>
        <time :datetime="new Date().getFullYear().toString()" class="mr-1">{{
          new Date().getFullYear()
        }}</time>
      </template>
    </UIFooter>
  </UIApp>
</template>

<style scoped></style>
