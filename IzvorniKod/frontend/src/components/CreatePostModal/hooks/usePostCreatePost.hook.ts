import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";
import { jwtDecode } from "jwt-decode";
import { getTokenFromLocalStorageOrCookie } from "../../../routes/layout.routes";

export type PostCreatePostMutationProps = {
  images: FormData;
  postHeader: string;
  postContent: string;
  facultyId: number;
  subjectId: number;
};

export type PostCreatePostProps = {
  onSuccess:
    | ((
        data: any,
        variables: PostCreatePostMutationProps,
        context: unknown
      ) => Promise<unknown> | unknown)
    | undefined;
};
export const usePostCreatePost = ({ onSuccess }: PostCreatePostProps) => {
  // @ts-ignore
  const { userId } = jwtDecode(getTokenFromLocalStorageOrCookie() ?? "");

  return useMutation({
    onSuccess: onSuccess,
    mutationFn: async ({
      images,
      subjectId,
      postHeader,
      postContent,
      facultyId,
    }: PostCreatePostMutationProps) => {
      const postJSON = JSON.stringify({
        postHeader,
        postContent,
        facultyId,
        subjectId,
      });

      images.append("post", postJSON);

      const response = await customFetch({
        endpointUrl: `posts/user/${userId}`,
        method: "POST",
        body: images,
      });

      return response;
    },
  });
};
