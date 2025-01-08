import { Header } from "../../components/Header/Header";
import { SelectComponent } from "./components/SelectComponent/SelectComponent";
import { useGetFacultiesWithAdminPermissions } from "./hooks/useGetFacultiesWithAdminPermissions.hook";

export const Users = () => {
  const { data: faculties } = useGetFacultiesWithAdminPermissions();

  return (
    <div>
      <Header isSidebarOpen={false} setIsSidebarOpen={() => null} />
      <div className="mt-10 max-md:mt-5">
        <SelectComponent
          faculties={faculties?.map((faculty) => faculty.facultyName) ?? []}
        />
      </div>
    </div>
  );
};
