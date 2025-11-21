export default defineAppConfig({
  ui: {
    header: {
      slots: {
        root: "max-w-(--ui-container) mx-auto bg-white/60 dark:bg-black/60 h-auto py-4 border-none",
        container: "!px-0",
        header: "h-auto py-4 mx-4 !px-0",
      },
    },
    footer: {
      slots: {
        root: "mx-4",
        container: "!p-8",
      },
    },
    pageSection: {
      slots: {
        root: "m-4",
      },
    },
    separator: {
      slots: {
        root: "w-full max-w-(--ui-container) mx-auto",
        container: "mx-4",
      },
    },
    pageCard: {
      slots: {
        title: "text-black dark:text-white",
        description: "!text-black dark:!text-white",
      },
    },
    pageHero: {
      slots: {
        root: "m-4",
        container: "overflow-hidden bg-linear-to-b from-red-400 to-dark",
      },
    },
    icons: {
      light: "lucide-moon",
      dark: "lucide-sun",
    },
  },
});
