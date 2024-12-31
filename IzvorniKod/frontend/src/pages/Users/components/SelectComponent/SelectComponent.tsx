import { Tabs, ConfigProvider, message, Modal, Popover } from "antd";
import { UsersTable } from "../../../../components/UsersTable/UsersTable";
import { useState } from "react";
import { DivideIcon } from "@heroicons/react/24/solid";

type SelectComponentType = {
  faculties: string[];
};

export const SelectComponent = ({ faculties }: SelectComponentType) => {
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

  const handleTabChange = (key: string) => {
    const selectedFaculty = faculties[Number(key)];
    message.info(`Switched to ${selectedFaculty}`);
  };

  return (
    <div>
      {faculties.length === 0 ? (
        <div className="text-center">
          You do not have permission to view faculty users.
        </div>
      ) : (
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
          <Tabs
            defaultActiveKey="0"
            tabPosition="left"
            style={{ height: 220 }}
            onChange={handleTabChange}
            items={faculties.map((faculty, index) => ({
              label: (
                //popover se pojavljuje samo kad se tekst izbornika smanji
                <div>
                  <Popover
                    className="hidden max-md:block"
                    key={index}
                    content={<span>{faculty}</span>}
                    title={null}
                    trigger="hover"
                  >
                    <p className="w-full max-md:w-[20vw] truncate">{faculty}</p>
                  </Popover>
                  <p className="max-md:hidden w-full max-md:w-[20vw] truncate">
                    {faculty}
                  </p>
                </div>
              ),
              key: String(index), // Unique key for each tab
              children: (
                <div className="flex justify-center max-md:justify-start">
                  <div className="w-[80%] max-md:w-[95%]">
                    <UsersTable
                      users={[
                        {
                          facultyUserId: 1,
                          username: "username1",
                          email: "email1",
                          postsReported: 0,
                          isKicked: true,
                          onKick: showModal,
                        },
                        {
                          facultyUserId: 2,
                          username: "username2",
                          email: "email2",
                          postsReported: 0,
                          isKicked: false,
                          onKick: showModal,
                        },
                        {
                          facultyUserId: 3,
                          username: "username3",
                          email: "email3",
                          postsReported: 0,
                          isKicked: false,
                          onKick: showModal,
                        },
                      ]}
                    />
                  </div>
                </div>
              ),
            }))}
          />
        </ConfigProvider>
      )}
      <Modal
        okButtonProps={{ style: { backgroundColor: "#111D4A" } }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to kick this user?</p>
      </Modal>
    </div>
  );
};
