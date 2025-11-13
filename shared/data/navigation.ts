import type { NavigationMenuItem } from "@nuxt/ui";

const navigation = [
  {
    label: "Home",
    to: "/",
    target: "_self",
  },
  {
    label: "About",
    to: "/about",
    target: "_self",
  },
  {
    label: "articles",
    to: "/articles",
    target: "_self",
  },
  {
    label: "Case Studies",
    to: "/case-studies",
    target: "_self",
  },
] as NavigationMenuItem[];

export default navigation;
