import { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { useGetEvents } from "../../pages/Events/hooks/useGetEvents.hook";
import { useGetSelectedFaculties } from "./hooks/useGetSelectedFaculties.hook";
import { jwtDecode } from "jwt-decode";
import { getTokenFromLocalStorageOrCookie } from "../../routes/layout.routes";
import { PlusIcon } from "@heroicons/react/24/solid";
import SelectFacultyModal from "../../components/SelectFacultyModal/SelectFacultyModal";

export const SidebarLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSelectFacultyModalOpen, setIsSelectFacultyModalOpen] =
    useState(false);

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
    <div className="h-screen flex flex-col">
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      {isSmallScreen ? (
        isSidebarOpen ? (
          <div className={"absolute left-0 top-[60px] w-full h-full bg-white "}>
            <Sidebar list={sidebarData ?? []} events={eventsData ?? []} />
            <div className="absolute left-2 bottom-6">123</div>
          </div>
        ) : (
          <Outlet />
        )
      ) : (
        <div className="flex flex-1">
          <div className="flex flex-col justify-between items-start">
            <Sidebar list={sidebarData ?? []} events={eventsData ?? []} />
            <button
              className="mt-auto mb-4 flex justify-center items-center hover:opacity-60 ml-10"
              onClick={() => setIsSelectFacultyModalOpen(true)}
            >
              <PlusIcon color="black" className="w-5 h-5" />
              Add faculty
            </button>
          </div>
          <Outlet />
        </div>
      )}
      {isSelectFacultyModalOpen && (
        <SelectFacultyModal
          isModalOpen={isSelectFacultyModalOpen}
          setIsModalOpen={setIsSelectFacultyModalOpen}
        />
      )}
    </div>
  );
};
