import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.routes";
import { Register } from "../pages/Register/Register.component";
export const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/Register",
  component: Register,
});
