export default defineAppConfig({
  ui: {
    header: {
      slots: {
        root: "max-w-(--ui-container) mx-auto bg-white/60 dark:bg-black/60 h-auto py-4 border-none",
        container: "!px-0 w-auto mx-4",
        header: "h-auto py-4 mx-4 !px-0",
      },
    },
    footer: {
      slots: {
        root: "flex justify-center",
        container: "max-w-(--ui-container) mx-4 !p-8 !px-0 flex-row-reverse",
        right: "lg:justify-start",
        left: "lg:justify-end",
      },
    },
    pageSection: {
      slots: {
        root: "first:mt-0 m-4",
        container: "!px-0",
      },
    },
    separator: {
      slots: {
        root: "max-w-(--ui-container) mx-auto px-4 overflow-hidden",
      },
    },
    button: {
      slots: {
        base: "border-3 border-white dark:border-black focus:!outline-white focus:dark:!outline-black",
      },
    },
    pageCard: {
      slots: {
        root: "group threeDimSquares",
        title: "text-black dark:text-white",
        leadingIcon: "text-white dark:text-black",
      },
      variants: {
        variant: {
          solid: {
            root: "border-3 border-black mx-4",
            container: "bg-linear-to-br to-red-400 from-black dark:from-white",
            title: "text-white dark:text-black",
            description: "text-white dark:text-black",
          },
        },
      },
    },
    pageHero: {
      slots: {
        root: "m-4 py-8 px-4",
        title: "text-white dark:text-black",
        description: "text-white dark:text-black",
        container:
          "overflow-hidden bg-linear-to-br to-red-400 from-black dark:from-white border-3 border-black dark:border-white !pb-4",
      },
      // https://tailwindcss.com/docs/hover-focus-and-other-states#arbitrary-groups
      variants: {
        orientation: {
          vertical: {
            root: "group threeDimRectangles",
          },
          horizontal: {
            root: "group threeDimSquares",
          },
        },
        reverse: {
          true: {
            title: "group-[.is-home]:italic",
            container: "group-[.is-home]:text-right reversed",
          },
        },
      },
    },
    icons: {
      light: "lucide-moon",
      dark: "lucide-sun",
    },
  },
});
