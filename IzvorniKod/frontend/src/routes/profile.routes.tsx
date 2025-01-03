import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.routes";
import { Profile } from "../pages/Profile/Profile.component";

export const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: Profile,
});
