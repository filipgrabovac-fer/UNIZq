import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";
export type GetPostDetailsProps = {
  postId: number;
};

export const useGetPostDetails = ({ postId }: GetPostDetailsProps) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const response = await customFetch({
        endpointUrl: `posts/${postId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      return response;
    },
  });
};
