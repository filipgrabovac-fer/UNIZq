import { Header } from "../../components/Header/Header";
import React, { useState } from "react";
import { SelectFacultyComponent } from "../../components/SelectFacultyComponent/SelectFacultyComponent";
import { UsersTable } from "../../components/UsersTable/UsersTable";
import { Modal } from "antd";
export const Users = () => {
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

  return (
    <div>
      <Header
        isSidebarOpen={false}
        setIsSidebarOpen={function (
          value: React.SetStateAction<boolean>
        ): void {
          throw new Error("Function not implemented.");
        }}
      />

      <div className="flex justify-center mt-10">
        <div>
          <SelectFacultyComponent
            faculties={[
              "Fakultet elektrotehnike i računarstva",
              "Tehničko veleučilište u Zagrebu",
              "Fakultet strojarstva i brodogradnje",
            ]}
          />
        </div>
        <div className="w-[70%] ml-[7%]">
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
