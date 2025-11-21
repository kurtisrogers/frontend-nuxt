<template>
  <UIPageHero as="section" class="thing" orientation="horizontal">
    <template #title>About</template>
    <template #description>
      <p>
        An expert in popular frontend frameworks, with over a decade of software engineering
        experience delivering innovative web solutions.
      </p>
    </template>
  </UIPageHero>
  <UIPageSection icon="i-lucide-code">
    <template #title> Architecting Clean Code from Design to Deployment </template>
    <template #description>
      <p>
        I transform design specifications into robust, type-safe data architectures that serve as
        the foundation for scalable applications. With fullstack expertise spanning backend to
        frontend implementation, I create comprehensive TypeScript schemas early in the development
        cycle establishing a single source of truth that prevents technical debt before it
        accumulates.
      </p>
      <UISeparator class="my-6" />
      <p>
        This design-first approach eliminates the costly refactoring that plagues many projects. By
        defining well-structured data models upfront, I ensure consistency across your entire
        application stack, streamline team collaboration, and accelerate development velocity. The
        result? Clean, maintainable codebases that scale with your business.
      </p>
    </template>
  </UIPageSection>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});
</script>

<style scoped>
/* https://css-pattern.com/ */
</style>
