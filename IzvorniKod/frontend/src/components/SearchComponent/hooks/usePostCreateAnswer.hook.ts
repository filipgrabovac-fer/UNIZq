import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";
import { jwtDecode } from "jwt-decode";
import { getTokenFromLocalStorageOrCookie } from "../../../routes/layout.routes";

export type PostCreateAnswerProps = {
  onSuccess?:
    | ((
        data: any,
        variables: PostCreateAnswerType,
        context: unknown
      ) => Promise<unknown> | unknown)
    | undefined;
};

export type PostCreateAnswerType = {
  postId: string;
  formData: FormData;
};
export const usePostCreateAnswer = ({ onSuccess }: PostCreateAnswerProps) => {
  // @ts-ignore
  const { userId } = jwtDecode(getTokenFromLocalStorageOrCookie() ?? "");
  return useMutation({
    onSuccess: onSuccess,
    mutationFn: async ({ formData, postId }: PostCreateAnswerType) => {
      const response = await customFetch({
        endpointUrl: `answers/post/${postId}/user/${userId}`,
        method: "POST",
        body: formData,
      });

      return response;
    },
  });
};
