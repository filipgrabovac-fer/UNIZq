import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";
import { jwtDecode } from "jwt-decode";
import { getTokenFromLocalStorageOrCookie } from "../../../routes/layout.routes";
import { UserRoleEnum } from "../SelectFacultyModal";

export type FacultyForSelectionDataType = {
  facultyId: number;
  facultyName: string;
  userRole: UserRoleEnum;
};

export const useGetFacultiesForSelection = () => {
  // @ts-ignore
  const { userId } = jwtDecode(getTokenFromLocalStorageOrCookie() ?? "");

  return useQuery<FacultyForSelectionDataType[]>({
    queryKey: ["faculties-for-selection"],
    queryFn: async () => {
      const response = await customFetch({
        endpointUrl: `faculties/all/user/${userId}`,
        method: "GET",
      });
      return response;
    },
  });
};
