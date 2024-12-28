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
  Modal,
} from "antd";
import {
  UserIcon,
  WifiIcon,
  TrashIcon,
  InboxIcon,
  PencilSquareIcon,
  ArrowLeftIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import type { TabsProps } from "antd";
import { PostPreview } from "../../components/PostPreview/PostPreview";

const { Sider, Content } = Layout;
const { Meta } = Card;

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

export const Profile = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const [isHovered, setIsHovered] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "My faculties",
      children: (
        <List
          className="w-[90%]"
          grid={{
            gutter: 30,
            column: 2,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item

            /*actions*/
            >
              <Card
                className="h-[150px] transition-transform duration-300 hover:scale-105 hover:shadow-md"
                title={
                  <div className="flex justify-between">
                    <p>{item.faculty}</p>
                    <TrashIcon
                      onClick={showModal}
                      className="w-5 hover:cursor-pointer transition-transform duration-300 hover:scale-105"
                    />

                    <Modal
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      okButtonProps={{
                        style: {
                          background: "#111D4A",
                          opacity: isHovered ? 0.8 : 1,
                        },
                        onMouseEnter: () => setIsHovered(true),
                        onMouseLeave: () => setIsHovered(false),
                      }}
                    >
                      <p>
                        Are you sure you want to remove this faculty from your
                        list?
                      </p>
                    </Modal>
                  </div>
                }
              >
                <p className="line-clamp-2">{item.description}</p>
              </Card>
            </List.Item>
          )}
        />
      ),
    },
    {
      key: "2",
      label: "My posts",
      children: (
        <div className="mb-3 w-[90%]">
          <div className="mb-3 transition-transform hover:scale-y-105 duration-300 hover:shadow-md">
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
          <div className="mb-3 transition-transform hover:scale-y-105 duration-300 hover:shadow-md">
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
          <div className="transition-transform hover:scale-y-105 duration-300 hover:shadow-md">
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
        </div>
      ),
    },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return (
          <div className="flex justify-center items-center min-h-full">
            <div className="">
              <p className="text-lg text-center">My profile</p>
              <br />
              <Card hoverable cover={<UserIcon />}>
                <Meta
                  title="Profile information"
                  description={
                    <div>
                      <div className="flex justify-between">
                        <p>Username:</p>
                        <p>exampleusername1</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Email:</p>
                        <p>email@email.com</p>
                      </div>
                    </div>
                  }
                />
              </Card>
            </div>
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
      case "3":
        return (
          <div>
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
              <Form.Item name="email">
                <p>Email</p>
                <div className="flex">
                  <Input
                    className="h-10"
                    prefix={<InboxIcon className="w-5" />}
                    type="email"
                    placeholder="Email"
                  />
                  <div className="bg-primary ml-2 p-2 w-fit rounded-[10px]">
                    <PencilSquareIcon className="w-5 fill-white" />
                  </div>
                </div>
              </Form.Item>
            </Form>
          </div>
        );
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
                  Activity
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
