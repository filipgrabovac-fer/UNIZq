import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";
import { jwtDecode } from "jwt-decode";
import { getTokenFromLocalStorageOrCookie } from "../../../routes/layout.routes";
export type GetPostDetailsProps = {
  postId: number;
};

export type PostDetailsDataType = {
  answerDetails: {
    answerId: number;
    content: string;
    answerImages: string[];
    author: string;
    editable: boolean;
    upvoted: boolean;
    isLiked: boolean;
    downvoted: boolean;
  }[];
  author: string;
  downvotes: number;
  editable: boolean;
  images: string[];
  postContent: string;

  postHeader: string;

  reports: number;
  upvotes: number;
};
export const useGetPostDetails = ({ postId }: GetPostDetailsProps) => {
  // @ts-ignore
  const { userId } = jwtDecode(getTokenFromLocalStorageOrCookie() ?? "");

  return useQuery<PostDetailsDataType>({
    queryKey: ["post-details"],
    queryFn: async () => {
      const response = await customFetch({
        endpointUrl: `posts/${postId}/user/${userId}`,
        method: "GET",
      });

      return response;
    },
  });
};
