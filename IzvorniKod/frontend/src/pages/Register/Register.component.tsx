import { useEffect, useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CustomLoginRegisterButton } from "../../components/CustomLoginRegisterButton/CustomLoginRegisterButton.component";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      <form
        className="flex flex-col gap-3 min-[400px]:w-[320px] w-[250px] mb-4"
        action=""
      >
        <CustomInput
          required={true}
          title="username"
          placeholder="add username"
          setValue={setUsername}
        />
        <CustomInput
          required={true}
          title="email"
          placeholder="add email"
          setValue={setEmail}
        />
        <CustomInput
          required={true}
          title="password"
          placeholder="add password"
          setValue={setPassword}
        />

        <CustomLoginRegisterButton
          type="submit"
          title="Register"
          onClick={() => 0}
        />
      </form>
    </div>
  );
};
