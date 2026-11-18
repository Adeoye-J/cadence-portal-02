import type { Route } from "next";
import type { IconName } from "@/lib/icons";

/**
 * One navigation configuration for the studio sidebar and mobile strip.
 * Add an item only when its route exists. A link to a page that is not built
 * is a dead interaction (brief section 8).
 */
export type NavItem = { label: string; href: Route; icon: IconName };

export const studioNav: readonly NavItem[] = [
  { label: "Projects", href: "/studio/projects", icon: "dashboard" },
];
