import { createRoute } from "@tanstack/react-router";
import { Home } from "../pages/Home/Home";
import { sidebarLayoutRoute } from "./layout.routes";

export const homeRoute = createRoute({
  getParentRoute: () => sidebarLayoutRoute,
  path: "/home",
  component: Home,
});
