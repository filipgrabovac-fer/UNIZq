import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";

type GetUserInfoData = {
  username: string;
  email: string;
  imageUrl: string;
  numSelectedFaculties: number;
  numCreatedPosts: number;
  sumOfLikes: number;
};

export const useGetUserInfo = () => {
  return useQuery<GetUserInfoData>({
    queryKey: ["user-info"],
    queryFn: async () => {
      const response = await customFetch({
        endpointUrl: "user/1",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    },
  });
};
