import { useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CustomLoginRegisterButton } from "../../components/CustomLoginRegisterButton/CustomLoginRegisterButton.component";
import GoogleButton from "react-google-button";
import { Link } from "@tanstack/react-router";

export const Login = () => {
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
        className="flex flex-col gap-4 min-[400px]:w-[320px] w-[250px] mb-4"
        method="POST"
        action=""
      >
        <CustomInput
          required={true}
          title="email or username"
          placeholder="email@example.com"
          setValue={setEmail}
        />
        <CustomInput
          required={true}
          title="password"
          placeholder="password"
          setValue={setPassword}
        />

        <div className="mt-5">
          <CustomLoginRegisterButton
            type="submit"
            title="Login"
            onClick={() => 0}
          />
        </div>
      </form>

      <p className="text-sm text-gray mt-5">or sign in with Google</p>

      <a
        className="mt-2"
        href={`${
          process.env.DEV && "http://localhost:8080"
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
