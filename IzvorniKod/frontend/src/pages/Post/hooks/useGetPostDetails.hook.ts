import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";
import { jwtDecode } from "jwt-decode";
import { getTokenFromLocalStorageOrCookie } from "../../../routes/layout.routes";
export type GetPostDetailsProps = {
  postId: number;
};

export type PostDetailsDataType = {
  answerDetails: {
    answerImages: string[];
    author: string;
    content: string;
    downvoted: boolean;
    editable: boolean;
    liked: boolean;
    upvoted: boolean;
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
    queryKey: ["post", postId],
    queryFn: async () => {
      const response = await customFetch({
        endpointUrl: `posts/${postId}/user/${userId}`,
        method: "GET",
      });

      return response;
    },
  });
};
