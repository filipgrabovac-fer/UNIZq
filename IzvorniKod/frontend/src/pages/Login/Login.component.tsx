import { useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CustomLoginRegisterButton } from "../../components/CustomLoginRegisterButton/CustomLoginRegisterButton.component";
import GoogleButton from "react-google-button";
import { Link } from "@tanstack/react-router";
import { usePostLogin } from "./hooks/usePostLogin.hook";

export const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: postLogin, isError } = usePostLogin({
    onError: () => {
      setUsernameOrEmail("");
      setPassword("");
    },
  });
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

      <div className="flex flex-col gap-4 min-[400px]:w-[320px] w-[250px] mb-4">
        <CustomInput
          errorMessage={
            isError && usernameOrEmail == "" ? "Invalid email" : undefined
          }
          required={true}
          title="email"
          placeholder="email@example.com"
          onChange={(value) => setUsernameOrEmail(value.target.value)}
        />
        <CustomInput
          errorMessage={
            isError && password == "" ? "Invalid password" : undefined
          }
          required={true}
          title="password"
          placeholder="password"
          type="password"
          onChange={(value) => setPassword(value.target.value)}
        />

        <div className="mt-5">
          <CustomLoginRegisterButton
            type="submit"
            title="Login"
            onClick={() => postLogin({ password, email: usernameOrEmail })}
          />
        </div>
      </div>

      <p className="text-sm text-gray mt-5">or sign in with Google</p>

      <a
        className="mt-2"
        href={`${
          import.meta.env.VITE_DEV ? "http://localhost:8080" : ""
        }/oauth2/authorization/google`}
      >
        <GoogleButton />
      </a>

      <p className="text-sm absolute m-auto bottom-10">
        Don't have an account?{" "}
        <Link to="/register" className="underline text-blue-700">
          Sign up
        </Link>
      </p>
    </div>
  );
};
