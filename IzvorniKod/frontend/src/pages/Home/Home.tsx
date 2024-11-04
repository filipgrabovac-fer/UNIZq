import { CustomLoginRegisterButton } from "../../components/CustomLoginRegisterButton/CustomLoginRegisterButton.component";
import { SidebarLayout } from "../../layouts/SidebarLayout/SidebarLayout";

export const Home = () => {
  return (
    <SidebarLayout>
      <div className="w-full">
        <CustomLoginRegisterButton
          title="123"
          onClick={() => console.log(123)}
        />
      </div>
    </SidebarLayout>
  );
};
