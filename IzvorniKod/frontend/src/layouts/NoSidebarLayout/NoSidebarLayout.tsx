import { useState } from "react";
import { Header, sidebarDataMock } from "../../components/Header/Header";
import { Menu } from "antd";
import { Outlet } from "@tanstack/react-router";

export const NoSidebarLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col">
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
        <Outlet />
      )}
    </div>
  );
};
