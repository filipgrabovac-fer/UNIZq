import { Header } from "../../components/Header/Header";

import { SelectComponent } from "./components/SelectComponent/SelectComponent";
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
