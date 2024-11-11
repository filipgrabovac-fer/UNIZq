import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";
import { useNavigate } from "@tanstack/react-router";

type UsePostLoginProps = {
  usernameOrEmail: string;
  password: string;
};

export const usePostLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ usernameOrEmail, password }: UsePostLoginProps) => {
      const response = await customFetch({
        endpointUrl: "login",
        body: { usernameOrEmail, password },
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (response.id) navigate({ to: "/home" });
    },
  });
};
