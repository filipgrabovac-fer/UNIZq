import { Header } from "../../components/Header/Header";
import React from "react";
import { SelectFacultyComponent } from "../../components/SelectFacultyComponent/SelectFacultyComponent";
import { UsersTable } from "../../components/UsersTable/UsersTable";

export const Users = () => {
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
      <SelectFacultyComponent
        faculties={[
          "Fakultet elektrotehnike i računarstva",
          "Tehničko veleučilište u Zagrebu",
          "Fakultet strojarstva i brodogradnje",
        ]}
      />
      <UsersTable
        users={[
          {
            facultyUserId: 1,
            username: "username1",
            email: "email1",
            postsReported: 0,
            isKicked: true,
            onKick: function (): void {
              throw new Error("Function not implemented.");
            },
          },
          {
            facultyUserId: 1,
            username: "username1",
            email: "email1",
            postsReported: 0,
            isKicked: false,
            onKick: function (): void {
              throw new Error("Function not implemented.");
            },
          },
          {
            facultyUserId: 1,
            username: "username1",
            email: "email1",
            postsReported: 0,
            isKicked: false,
            onKick: function (): void {
              throw new Error("Function not implemented.");
            },
          },
        ]}
      />
    </div>
  );
};
