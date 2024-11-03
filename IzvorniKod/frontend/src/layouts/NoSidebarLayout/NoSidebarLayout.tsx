import { useState } from "react";
import { Header, sidebarDataMock } from "../../components/Header/Header";
import { Menu } from "antd";

type NoSidebarLayoutType = {
  children: JSX.Element;
};

export const NoSidebarLayout = ({ children }: NoSidebarLayoutType) => {
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
        children
      )}
    </div>
  );
};
