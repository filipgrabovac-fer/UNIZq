import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";
import { jwtDecode } from "jwt-decode";
import { getTokenFromLocalStorageOrCookie } from "../../../routes/layout.routes";

export type GetSelectedFacultiesProps = {
  userId: number;
};

export type SelectedFacultiesDataType = {
  canEditFaculty: boolean;
  canEditFacultyYear: boolean;
  facultyId: number;
  facultyYears: {
    yearId: number;
    yearName: string;
  }[];
  title: string;
};

export const useGetSelectedFaculties = () => {
  // @ts-ignore
  const { userId } = jwtDecode(getTokenFromLocalStorageOrCookie() ?? "");
  return useQuery<SelectedFacultiesDataType[]>({
    queryKey: ["selected-faculties"],
    queryFn: async () => {
      const response = await customFetch({
        endpointUrl: `selected-faculties/user/${userId}`,
        method: "GET",
      });

      return response;
    },
  });
};
