import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import {
  UserIcon,
  WifiIcon,
  ArrowLeftIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

import { MyProfile } from "../../components/MyProfile/MyProfile";
import { MyActivity } from "../../components/MyActivity/MyActivity";
import { Settings } from "../../components/Settings/Settings";

const { Sider, Content } = Layout;

export const Profile = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return (
          <MyProfile
            likes={1234}
            posts={100}
            username={"username1"}
            email={"email@email.com"}
          />
        );
      case "2":
        return <MyActivity />;
      case "3":
        return <Settings />;
      default:
        return <div>Default Content</div>;
    }
  };

  return (
    <Layout className="h-screen">
      <Sider
        style={{ background: "#111D4A" }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <a href="/home">
          <ArrowLeftIcon className="ml-[14%] mt-3 w-5 fill-white my-1" />
        </a>
        <Menu
          style={{ background: "#111D4A" }}
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={(e) => setSelectedKey(e.key)} // Update selectedKey on click
          items={[
            {
              key: "1",
              icon: (
                <UserIcon
                  className={`w-5 ${
                    selectedKey === "1" ? "fill-blue-500" : "fill-white"
                  }`}
                />
              ),
              label: (
                <p
                  className={`${
                    selectedKey === "1" ? "text-blue-500" : "text-white"
                  } hover:text-blue-500`}
                >
                  Profile
                </p>
              ),
            },
            {
              key: "2",
              icon: (
                <WifiIcon
                  className={`w-5 ${
                    selectedKey === "2" ? "fill-blue-500" : "fill-white"
                  }`}
                />
              ),
              label: (
                <p
                  className={`${
                    selectedKey === "2" ? "text-blue-500" : "text-white"
                  } hover:text-blue-500`}
                >
                  My activity
                </p>
              ),
            },
            {
              key: "3",
              icon: (
                <Cog6ToothIcon
                  className={`w-5 ${
                    selectedKey === "3" ? "fill-blue-500" : "fill-white"
                  }`}
                />
              ),
              label: (
                <p
                  className={`${
                    selectedKey === "3" ? "text-blue-500" : "text-white"
                  } hover:text-blue-500`}
                >
                  Settings
                </p>
              ),
            },
          ]}
        />
        <div className="flex justify-end p-4">
          <Button
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined style={{ color: "white" }} />
              ) : (
                <MenuFoldOutlined style={{ color: "white" }} />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "10px 16px",
            padding: 20,
            paddingTop: 10,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};
