import { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "../../components/Sidebar/Sidebar";

export const SidebarLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    const handleScreenResize = (e: MediaQueryListEvent) =>
      setIsSmallScreen(e.matches);

    setIsSmallScreen(mediaQuery.matches); // Set initial value
    mediaQuery.addEventListener("change", handleScreenResize);

    return () => mediaQuery.removeEventListener("change", handleScreenResize);
  }, []);

  return (
    <div>
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      {isSmallScreen ? (
        isSidebarOpen ? (
          <div className={"absolute left-0 top-[60px] w-full h-full bg-white"}>
            <Sidebar />
          </div>
        ) : (
          <Outlet />
        )
      ) : (
        <div className="flex w-full">
          <div className="w-[300px]">
            <Sidebar />
          </div>
          <Outlet />
        </div>
      )}
    </div>
  );
};
