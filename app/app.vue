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
        <UISeparator color="primary" />
        <UIPageSection>
          <UIPageCard
            title="Looking for a dev?"
            description="Lucky you! I'm looking for my next gig. Interested in this exciting opportunity? You know what to do."
            icon="i-lucide-code"
            orientation="horizontal"
            spotlight
            spotlight-color="primary"
            variant="subtle"
          >
            <template #footer>
              <div class="flex items-center justify-between">
                <UIButton class="mr-2" to="/about">About</UIButton>
                <UIButton
                  to="/documents/KurtisRogersCV.pdf"
                  external
                  trailing
                  leading-icon="i-lucide-download"
                  >Download my CV</UIButton
                >
              </div>
            </template>
          </UIPageCard>
        </UIPageSection>
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
