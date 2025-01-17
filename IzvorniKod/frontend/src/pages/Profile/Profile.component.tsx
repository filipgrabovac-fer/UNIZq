import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import {
  UserIcon,
  WifiIcon,
  ArrowLeftIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

import { MyProfile } from "./components/MyProfile/MyProfile";
import { MyActivity } from "./components/MyActivity/MyActivity";
import { Settings } from "./components/Settings/Settings";
import { useGetUserInfo } from "./hooks/useGetUserInfo.hook";

const { Sider } = Layout;

export const Profile = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { data } = useGetUserInfo();

  return (
    <Layout className="h-screen">
      <Sider
        breakpoint="sm"
        collapsedWidth="70"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
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
        <div className="flex justify-end p-4 max-[576px]:hidden">
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
        <div
          style={{
            margin: "10px 16px",
            padding: 20,
            paddingTop: 10,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="overflow-y-scroll overfow-hidden"
        >
          {selectedKey === "1" && (
            <MyProfile
              likesValue={data?.sumOfLikes.toString() ?? ""}
              postsValue={data?.numCreatedPosts.toString() ?? ""}
              username={data?.username ?? ""}
              email={data?.email ?? ""}
              facultiesValue={data?.numSelectedFaculties.toString() ?? ""}
              imageUrl={data?.imageUrl}
            />
          )}

          {selectedKey === "2" && <MyActivity />}

          {selectedKey === "3" && (
            <Settings
              username={data?.username ?? ""}
              email={data?.email ?? ""}
              imageUrl={data?.imageUrl}
            />
          )}
        </div>
      </Layout>
    </Layout>
  );
};
