import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/root.routes";
import {
  sidebarLayoutRoute,
  noSidebarLayoutRoute,
} from "./routes/layout.routes";
import { homeRoute } from "./routes/home.routes";
import { loginRoute } from "./routes/login.routes";
import { registerRoute } from "./routes/register.routes";
import { eventsRoute } from "./routes/events.routes";

const routeTree = rootRoute.addChildren([
  sidebarLayoutRoute.addChildren([homeRoute]),
  noSidebarLayoutRoute.addChildren([eventsRoute]),
  loginRoute,
  registerRoute,
]);

export const router = createRouter({ routeTree });
