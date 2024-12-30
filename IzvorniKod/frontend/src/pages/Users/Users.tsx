import { Header } from "../../components/Header/Header";
import React, { useState } from "react";
import { UsersTable } from "../../components/UsersTable/UsersTable";
import { Modal } from "antd";
import { SelectComponent } from "../../components/SelectComponent/SelectComponent";
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
      <div className="mt-10">
        <SelectComponent
          faculties={[
            "Fakultet elektrotehnike i računarstva",
            "Tehničko veleučilište u Zagrebu",
            "Fakultet strojarstva i brodogradnje",
          ]}
        />
      </div>
    </div>
  );
};
