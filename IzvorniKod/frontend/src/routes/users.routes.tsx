import { createRoute } from "@tanstack/react-router";
import { Users } from "../pages/Users/Users";
import { rootRoute } from "./root.routes";

export const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/users",
  component: Users,
});
