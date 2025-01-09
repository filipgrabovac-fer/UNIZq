import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.routes";
import AdminApplicationPage from "../pages/AdminApplication/AdminApplication";

export const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/adminApplication",
  component: AdminApplicationPage,
});
