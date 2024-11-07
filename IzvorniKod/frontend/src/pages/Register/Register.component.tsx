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
      w-3/5 flex items-center justify-center flex-col m-auto h-screen"
    >
      <img src="/images/educhat_image.png" alt="image not responding" />

      <form className="p-[15px]" method="POST">
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
          title="proba"
          onClick={() => 0}
        ></CustomLoginRegisterButton>
      </div>
    </div>
  );
};
