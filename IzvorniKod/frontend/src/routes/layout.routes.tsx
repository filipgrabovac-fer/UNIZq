import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.routes";
import { SidebarLayout } from "../layouts/SidebarLayout/SidebarLayout";
import { NoSidebarLayout } from "../layouts/NoSidebarLayout/NoSidebarLayout";

export const sidebarLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "sidebar-route",
  component: SidebarLayout,
});

export const noSidebarLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "no-sidebar-route",
  component: NoSidebarLayout,
});
