import { useState } from "react";
import { Header } from "../../components/Header/Header";
import { Outlet } from "@tanstack/react-router";

export const NoSidebarLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <Outlet />
    </div>
  );
};
