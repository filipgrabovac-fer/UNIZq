import { CustomInput } from "../../components/CustomInput/CustomInput";
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
        <img src="/images/img123.png" />

        <form action="">
          <CustomInput
            title="123"
            placeholder="123"
            setValue={() => 0}
            required={true}
          />
          <CustomLoginRegisterButton
            title="Register"
            onClick={() => 0}
            type="submit"
          />
        </form>
      </div>
    </SidebarLayout>
  );
};
