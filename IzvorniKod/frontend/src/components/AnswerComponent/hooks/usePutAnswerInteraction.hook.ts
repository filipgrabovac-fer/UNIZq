import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";
import { jwtDecode } from "jwt-decode";
import { getTokenFromLocalStorageOrCookie } from "../../../routes/layout.routes";
import { PostInteractionEnum } from "../../PostPreview/hooks/usePostPostInteraction.hook";

export type usePutAnswerInteractionProps = {
  answerId: string;
  action: PostInteractionEnum;
};

export const usePutAnswerInteraction = () => {
  // @ts-ignore
  const { userId } = jwtDecode(getTokenFromLocalStorageOrCookie() ?? "");
  return useMutation({
    mutationFn: async ({ answerId, action }: usePutAnswerInteractionProps) => {
      const response = await customFetch({
        endpointUrl: `answer-interaction/${answerId}/${action}/user/${userId}`,
        method: "PUT",
      });

      return response;
    },
  });
};
