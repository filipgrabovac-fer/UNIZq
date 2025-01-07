import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";

export const useGetFacultiesForSelection = () => {
  return useQuery({
    queryKey: ["faculties-for-selection"],
    queryFn: async () => {
      const response = await customFetch({
        endpointUrl: "faculties/all",
        method: "GET",
      });
      console.log(response);
      return response;
    },
  });
};
