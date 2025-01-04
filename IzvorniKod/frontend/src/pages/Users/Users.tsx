import { Header } from "../../components/Header/Header";

import { SelectComponent } from "./components/SelectComponent/SelectComponent";
export const Users = () => {
  return (
    <div>
      <Header isSidebarOpen={false} setIsSidebarOpen={() => null} />
      <div className="mt-10 max-md:mt-5">
        <SelectComponent
          faculties={[
            "Fakultet elektrotehnike i računarstva",
            "Tehničko veleučilište u Zagrebu",
            "Fakultet strojarstva i brodogradnje",
            "Ekonomski fakultet Zagreb",
            "Fakultet elektrotehnike i računarstva",
            "Tehničko veleučilište u Zagrebu",
            "Fakultet strojarstva i brodogradnje",
            "Ekonomski fakultet Zagreb",
            "Fakultet elektrotehnike i računarstva",
            "Tehničko veleučilište u Zagrebu",
            "Fakultet strojarstva i brodogradnje",
            "Ekonomski fakultet Zagreb",
            "Fakultet elektrotehnike i računarstva",
            "Tehničko veleučilište u Zagrebu",
            "Fakultet strojarstva i brodogradnje",
            "Ekonomski fakultet Zagreb",
          ]}
        />
      </div>
    </div>
  );
};
