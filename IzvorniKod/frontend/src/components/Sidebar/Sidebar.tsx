import { sidebarDataMock } from "../../components/Header/Header";
import { useState } from "react";
import type { MenuProps } from "antd";
import { ConfigProvider, Menu } from "antd";

type SidebarProps = {
  onClick: MenuProps["onClick"];
};

export const Sidebar = ({ onClick }: SidebarProps) => {
  const [current, setCurrent] = useState("1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              colorText: "black",
              fontSize: 16,
              itemSelectedColor: "black",
              itemSelectedBg: "#ececec",
            },
          },
        }}
      >
        <Menu
          onClick={handleClick}
          style={{
            borderRadius: "20px",
          }}
          selectedKeys={[current]}
          mode="inline"
          items={sidebarDataMock}
          onSelect={() => {
            setIsSidebarOpen(false); // dodati funkcionalnost klika na pojedinu godinu
          }}
        />
      </ConfigProvider>
    </div>
  );
};
