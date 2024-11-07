import { useEffect, useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CustomLoginRegisterButton } from "../../components/CustomLoginRegisterButton/CustomLoginRegisterButton.component";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    console.log(username, email, password);
  }, [username, email, password]);
  return (
    <div
      className="
       flex items-center justify-center flex-col m-auto h-screen"
    >
      <img
        src="/images/educhat_image.png"
        alt="image not responding"
        className="mb-8 w-[330px]"
      />

      <form className=" min-[400px]:w-[320px] w-[250px] mb-4" method="POST">
        <CustomInput
          title="username"
          placeholder="add username"
          setValue={setUsername}
        />
        <CustomInput
          title="email"
          placeholder="add email"
          setValue={setEmail}
        />
        <CustomInput
          title="password"
          placeholder="add password"
          setValue={setPassword}
        />
      </form>
      <div className="w-[381px] h-[60px] p-[15px]">
        <CustomLoginRegisterButton
          title="Register"
          onClick={() => 0}
        ></CustomLoginRegisterButton>
      </div>
    </div>
  );
};
