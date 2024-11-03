import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/root.routes";
import { demoRoute } from "./routes/demo.routes";
import { homeRoute } from "./routes/home.routes";

const routeTree = rootRoute.addChildren({ demoRoute, homeRoute });

export const router = createRouter({ routeTree });
