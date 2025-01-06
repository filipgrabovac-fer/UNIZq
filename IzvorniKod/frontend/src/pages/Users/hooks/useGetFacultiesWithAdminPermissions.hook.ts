import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";
import { getTokenFromLocalStorageOrCookie } from "../../../routes/layout.routes";
import { jwtDecode } from "jwt-decode";

export type GetFacultiesWithAdminPermissionsData = {
  facultyId: number;
  facultyName: string;
};
export const useGetFacultiesWithAdminPermissions = () => {
  // @ts-ignore
  const { userId } = jwtDecode(getTokenFromLocalStorageOrCookie() ?? "");

  return useQuery<GetFacultiesWithAdminPermissionsData[]>({
    queryKey: ["faculties-with-admin-permissions"],
    queryFn: async () => {
      const response = await customFetch({
        endpointUrl: `faculties/admin/${userId}`,
        method: "GET",
      });

      console.log(response);

      return response;
    },
  });
};
