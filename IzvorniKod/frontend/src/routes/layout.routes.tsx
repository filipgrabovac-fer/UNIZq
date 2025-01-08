import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "./root.routes";
import { SidebarLayout } from "../layouts/SidebarLayout/SidebarLayout";
import { NoSidebarLayout } from "../layouts/NoSidebarLayout/NoSidebarLayout";

export function getTokenFromLocalStorageOrCookie() {
  let token = localStorage.getItem("token");
  if (!token) {
    const tokenCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwtToken="));
    if (tokenCookie) {
      token = tokenCookie.split("=")[1];
      localStorage.setItem("token", token);
    }
  }
  return token;
}

export const sidebarLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "sidebar-route",
  component: SidebarLayout,
  beforeLoad: async () => {
    const token = getTokenFromLocalStorageOrCookie();
    if (!token) return redirect({ to: "/login" });
  },
});

export const noSidebarLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "no-sidebar-route",
  component: NoSidebarLayout,
  beforeLoad: async () => {
    const token = getTokenFromLocalStorageOrCookie();
    if (!token) return redirect({ to: "/login" });
  },
});
