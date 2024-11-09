import { Menu } from "antd";
import { useState } from "react";
import { Header, sidebarDataMock } from "../../components/Header/Header";
import { Outlet } from "@tanstack/react-router";

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
          <Menu
            mode="inline"
            items={sidebarDataMock}
            defaultOpenKeys={["faculties"]}
            onSelect={() => {
              setIsSidebarOpen(false); // dodati funkcionalnost klika na pojedinu godinu
            }}
          />
        </div>
      ) : (
        <div className="flex w-full">
          <div className="w-[300px] max-[500px]:hidden">
            This is the sidebar
          </div>
          <Outlet />
        </div>
      )}
    </div>
  );
};
