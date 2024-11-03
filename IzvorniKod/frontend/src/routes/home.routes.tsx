import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.routes";
import { Home } from "../pages/Home/Home";

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
