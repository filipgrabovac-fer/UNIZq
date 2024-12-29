import { createRoute } from "@tanstack/react-router";
import { Users } from "../pages/Users/Users";
import { sidebarLayoutRoute } from "./layout.routes";

export const usersRoute = createRoute({
  getParentRoute: () => sidebarLayoutRoute,
  path: "/users",
  component: Users,
});
