import { useState } from "react";
import { Tabs, ConfigProvider, List, Card, Modal } from "antd";
import { TrashIcon } from "@heroicons/react/24/solid";
import type { TabsProps } from "antd";
import { PostPreview } from "../../components/PostPreview/PostPreview";

type MyActivityType = {};

export const MyActivity = ({}: MyActivityType) => {
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
};