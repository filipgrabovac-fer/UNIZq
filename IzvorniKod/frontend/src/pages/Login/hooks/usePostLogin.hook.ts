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

type PostLoginProps = {
  onError:
    | ((
        error: Error,
        variables: UsePostLoginProps,
        context: unknown
      ) => Promise<unknown> | unknown)
    | undefined;
};
export const usePostLogin = ({ onError }: PostLoginProps) => {
  const navigate = useNavigate();
  return useMutation({
    onError: onError,
    mutationFn: async ({ email, password }: UsePostLoginProps) => {
      const response: PostLoginResponseType = await customFetch({
        endpointUrl: "login",
        body: JSON.stringify({ email, password }),
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
