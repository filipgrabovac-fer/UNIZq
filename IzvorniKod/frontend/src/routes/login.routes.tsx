import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.routes";
import { Login } from "../pages/Login/Login.component";

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});
