import { SetStateAction } from "react";
import { Header } from "../../components/Header/Header";

export const Users = () => {
  return (
    <div>
      <Header
        isSidebarOpen={false}
        setIsSidebarOpen={function (value: SetStateAction<boolean>): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};
