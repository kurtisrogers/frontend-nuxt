import type { NavigationMenuItem } from "@nuxt/ui";

const mainNavigatonItems = [
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
    label: "Work",
    to: "/work-experience",
    target: "_self",
  },
  {
    label: "Technology",
    to: "/technology",
    target: "_self",
  },
] as NavigationMenuItem[];

export default mainNavigatonItems;
