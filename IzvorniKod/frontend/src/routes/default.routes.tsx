import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "./root.routes";

export const defaultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => redirect({ to: "/home" }),
});
