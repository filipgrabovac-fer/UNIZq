import { createRoute } from "@tanstack/react-router";
import { noSidebarLayoutRoute } from "./layout.routes";
import { Events } from "../pages/Events/Events.component";

export const eventsRoute = createRoute({
  getParentRoute: () => noSidebarLayoutRoute,
  path: "/events",
  component: Events,
});
