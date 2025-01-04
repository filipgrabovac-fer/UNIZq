import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";

type GetUserInfoData = {
  id: number;
  username: string;
  email: string;
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
