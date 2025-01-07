import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";

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

export const useGetSelectedFaculties = ({
  userId,
}: GetSelectedFacultiesProps) => {
  return useQuery<SelectedFacultiesDataType[]>({
    queryKey: ["selected-faculties", userId],
    queryFn: async () => {
      const response = await customFetch({
        endpointUrl: `selected-faculties/user/${userId}`,
        method: "GET",
      });

      return response;
    },
  });
};
