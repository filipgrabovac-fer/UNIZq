import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";

type UsePostRegisterProps = {
  email: string;
  username: string;
  password: string;
};
export const usePostRegister = () => {
  return useMutation({
    mutationFn: async ({ email, username, password }: UsePostRegisterProps) => {
      customFetch({
        body: { email: email, username: username, password: password },
        method: "POST",
        endpointUrl: "register",
        headers: { "Content-Type": "application/json" },
      });
    },
  });
};
