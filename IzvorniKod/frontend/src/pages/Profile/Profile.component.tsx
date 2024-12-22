import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  Button,
  Layout,
  Menu,
  theme,
  Tabs,
  ConfigProvider,
  List,
  Card,
  Form,
  Input,
} from "antd";
import {
  UserIcon,
  WifiIcon,
  TrashIcon,
  InboxIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import type { TabsProps } from "antd";
import { PostPreview } from "../../components/PostPreview/PostPreview";

const { Sider, Content } = Layout;

const data = [
  {
    faculty: "FSB",

    description:
      "Fakultet strojarstva i brodogradnje, Sveučilište u Zagrebu, Faculty of Mechanical Engineering and Naval Architecture, University of Zagreb.",
  },
  {
    faculty: "TVZ",

    description:
      "Tehničko veleučilište u Zagrebu, najveće učilište u Republici Hrvatskoj, pruža izobrazbu iz različitih struka: elektrotehnike, graditeljstva, informatike.",
  },
  {
    faculty: "FER",

    description:
      "FER je najveća i najutjecajnija znanstvena i obrazovna institucija u Hrvatskoj na području elektrotehnike, računarstva te informacijskih i komunikacijskih, učilište u Republici Hrvatskoj, pruža izobrazbu iz različitih struka: elektrotehnike, graditeljstva, informatike",
  },
];

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "My posts",
    children: (
      <div className="mb-3">
        <PostPreview
          postTitle={
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo quae odit ab magnam tempora, ut excepturi error aut impedit amet libero ipsam fugiat repudiandae aspernatur unde similique nemo hic officiis"
          }
          postID={0}
          canDelete={false}
          canModify={false}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    ),
  },
  {
    key: "2",
    label: "My faculties",
    children: (
      <List
        grid={{
          gutter: 30,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
          /*actions*/
          >
            <Card
              className="w-[70%] h-[170px] transition-transform duration-300 hover:scale-105"
              title={
                <div className="flex justify-between">
                  <p>{item.faculty}</p>
                  <TrashIcon className="w-5 hover:cursor-pointer transition-transform duration-300 hover:scale-105" />
                </div>
              }
            >
              <p className="line-clamp-3">{item.description}</p>
            </Card>
          </List.Item>
        )}
      />
    ),
  },
];

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
          <div className="w-fit">
            <p className="text-lg">My profile</p>
            <hr className="my-3" />
            <Form>
              <Form.Item name="username">
                <p>Username</p>
                <div className="flex">
                  <Input
                    className="h-10"
                    prefix={<UserIcon className="w-5" />}
                    placeholder="Username"
                  />
                  <div className="bg-primary ml-2 p-2 w-fit rounded-[10px]">
                    <PencilSquareIcon className="w-5 fill-white" />
                  </div>
                </div>
              </Form.Item>
              <p>Email</p>
              <Form.Item name="email">
                <Input
                  className="h-10"
                  prefix={<InboxIcon className="w-5" />}
                  type="email"
                  placeholder="email"
                />
              </Form.Item>
            </Form>
          </div>
        );
      case "2":
        return (
          <div>
            <ConfigProvider
              theme={{
                components: {
                  Tabs: {
                    inkBarColor: "#111D4A",
                    colorPrimary: "#111D4A",
                    itemHoverColor: "grey",
                    itemActiveColor: "#111D4A",
                  },
                },
              }}
            >
              <Tabs className="w-full" defaultActiveKey="1" items={items} />
            </ConfigProvider>
          </div>
        );
      default:
        return <div>Default Content</div>;
    }
  };

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={(e) => setSelectedKey(e.key)} // Update selectedKey on click
          items={[
            {
              key: "1",
              icon: <UserIcon className="w-5" />,
              label: "Profile",
            },
            {
              key: "2",
              icon: <WifiIcon className="w-5" />,
              label: "Activity",
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
