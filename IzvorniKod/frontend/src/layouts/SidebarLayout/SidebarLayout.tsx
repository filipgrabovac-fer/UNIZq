import { useState } from "react";
import { Header } from "../../components/Header/Header";
import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "../../components/Sidebar/Sidebar";

export const SidebarLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      {isSidebarOpen ? (
        <div className={"absolute left-0 top-[60px] w-full h-full bg-white"}>
          <Sidebar onClick={undefined} />
        </div>
      ) : (
        <div className="flex w-full">
          <div className="w-[300px] max-[500px]:hidden">
            <Sidebar onClick={undefined} />
          </div>
          <Outlet />
        </div>
      )}
    </div>
  );
};
