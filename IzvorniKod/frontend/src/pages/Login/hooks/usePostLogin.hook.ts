import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";
import { useNavigate } from "@tanstack/react-router";

type UsePostLoginProps = {
  email: string;
  password: string;
};

type PostLoginResponseType = {
  token: string;
};

export const usePostLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ email, password }: UsePostLoginProps) => {
      const response: PostLoginResponseType = await customFetch({
        endpointUrl: "login",
        body: { email, password },
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.token) {
        localStorage.setItem("token", response.token);
        navigate({ to: "/home" });
      }
    },
  });
};
