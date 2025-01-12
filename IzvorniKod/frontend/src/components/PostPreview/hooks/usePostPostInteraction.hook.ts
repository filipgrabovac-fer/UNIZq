import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";
import { jwtDecode } from "jwt-decode";
import { getTokenFromLocalStorageOrCookie } from "../../../routes/layout.routes";

export type PostPostInteractionProps = {
  postId: number;
  action: PostInteractionEnum;
};

export enum PostInteractionEnum {
  UPVOTE = "upvote",
  DOWNVOTE = "downvote",
  REPORT = "report",
}

export const usePostPostInteraction = () => {
  // @ts-ignore
  const { userId } = jwtDecode(getTokenFromLocalStorageOrCookie() ?? "");
  return useMutation({
    mutationFn: async ({ postId, action }: PostPostInteractionProps) => {
      const response = await customFetch({
        endpointUrl: `post-interaction/${postId}/${action}/user/${userId}`,
        method: "PUT",
      });

      return response;
    },
  });
};
