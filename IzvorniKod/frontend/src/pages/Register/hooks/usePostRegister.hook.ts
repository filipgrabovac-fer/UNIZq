import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";
import { useNavigate } from "@tanstack/react-router";

type UsePostRegisterProps = {
  email: string;
  username: string;
  password: string;
};

type PostRegisterResponseType = {
  token: string;
};

export const usePostRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ email, username, password }: UsePostRegisterProps) => {
      const response: PostRegisterResponseType = await customFetch({
        body: { email: email, username: username, password: password },
        method: "POST",
        endpointUrl: "register",
        headers: { "Content-Type": "application/json" },
      });

      if (response.token) {
        localStorage.setItem("token", response.token);
        navigate({ to: "/home" });
      }
    },
  });
};
