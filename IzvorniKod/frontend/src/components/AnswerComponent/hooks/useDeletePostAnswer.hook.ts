import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";
import { jwtDecode } from "jwt-decode";
import { getTokenFromLocalStorageOrCookie } from "../../../routes/layout.routes";

export type DeletePostAnswerMutationProps = {
  answerId: string;
};
export type DeletePostAnswerProps = {
  onSuccess:
    | ((
        data: any,
        variables: DeletePostAnswerMutationProps,
        context: unknown
      ) => Promise<unknown> | unknown)
    | undefined;
};
export const useDeletePostAnswer = ({ onSuccess }: DeletePostAnswerProps) => {
  // @ts-ignore
  const { userId } = jwtDecode(getTokenFromLocalStorageOrCookie() ?? "");
  return useMutation({
    onSuccess: onSuccess,
    mutationFn: async ({ answerId }: DeletePostAnswerMutationProps) => {
      const response = await customFetch({
        endpointUrl: `answers/${answerId}/user/${userId}`,
        method: "DELETE",
      });

      return response;
    },
  });
};
