import { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { useGetEvents } from "../../pages/Events/hooks/useGetEvents.hook";
import { useGetSelectedFaculties } from "./hooks/useGetSelectedFaculties.hook";
import { jwtDecode } from "jwt-decode";
import { getTokenFromLocalStorageOrCookie } from "../../routes/layout.routes";

export const SidebarLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    const handleScreenResize = (e: MediaQueryListEvent) =>
      setIsSmallScreen(e.matches);

    setIsSmallScreen(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleScreenResize);

    return () => mediaQuery.removeEventListener("change", handleScreenResize);
  }, []);

  // @ts-ignore
  const { userId } = jwtDecode(getTokenFromLocalStorageOrCookie() ?? "");
  const { data: sidebarData } = useGetSelectedFaculties({ userId: userId });
  const { data: eventsData } = useGetEvents();

  return (
    <div>
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      {isSmallScreen ? (
        isSidebarOpen ? (
          <div className={"absolute left-0 top-[60px] w-full h-full bg-white"}>
            <Sidebar list={sidebarData ?? []} events={eventsData ?? []} />
          </div>
        ) : (
          <Outlet />
        )
      ) : (
        <div className="flex w-full">
          <Sidebar list={sidebarData ?? []} events={eventsData ?? []} />
          <Outlet />
        </div>
      )}
    </div>
  );
};
