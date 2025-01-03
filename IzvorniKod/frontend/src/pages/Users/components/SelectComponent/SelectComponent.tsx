import { Tabs, ConfigProvider, message, Modal, Popover } from "antd";
import { UsersTable } from "../../../../components/UsersTable/UsersTable";
import { useState, useEffect } from "react";

type SelectComponentType = {
  faculties: string[];
};

// Custom Hook for Media Queries
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

export const SelectComponent = ({ faculties }: SelectComponentType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if the screen size matches medium screen
  const isMediumScreen = useMediaQuery("(max-width: 768px)");

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
            className="max-md:mx-[2%]"
            defaultActiveKey="0"
            tabPosition={isMediumScreen ? "top" : "left"}
            style={{
              height: "85vh",
            }}
            onChange={handleTabChange}
            items={faculties.map((faculty, index) => ({
              label: (
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
              key: String(index),
              children: (
                <div className="flex justify-center">
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
