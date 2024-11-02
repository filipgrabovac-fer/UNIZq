import { useState } from "react";
import { CustomInput } from "./components/CustomInput/CustomInput";
import { Home } from "./pages/Home/Home";
import { SidebarLayout } from "./layouts/SidebarLayout/SidebarLayout";
import { CustomButton } from "./components/CustomButton/CustomButton";

export const App = () => {
  const [value, setValue] = useState("");

  return (
    <SidebarLayout>
      <div className="w-full">
        <p>this is working</p>
        <p>
          This is our default page. All of the pages will be rendered inside
          this layout
        </p>
        We will use our components like this one!:
        <Home />
        <div className="w-1/4 m-auto flex gap-8 flex-col">
          <CustomInput
            setValue={setValue}
            title="my title"
            placeholder="my placeholder"
            errorMessage="custom error message"
          />
          <CustomInput
            setValue={setValue}
            title="my title"
            placeholder="my placeholder"
          />
          <CustomInput
            setValue={setValue}
            title="password"
            placeholder="password"
            password={true}
          />

          <CustomInput
            setValue={setValue}
            title="my title"
            placeholder="my placeholder"
            rows={10}
          />

          <CustomInput
            setValue={setValue}
            title="my title"
            placeholder="my placeholder"
            rows={10}
            errorMessage="error message on textarea"
          />
        </div>
        <CustomButton variant_={"secondary"} title="logout" />
      </div>
    </SidebarLayout>
  );
};
