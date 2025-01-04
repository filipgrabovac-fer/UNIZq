import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";

export type GetFacultySubjectsProps = {
  facultyYearId: string;
};

export type FacultySubjectType = {
  description: string;
  facultyUserId: number;
  facultyYearId: number;
  id: number;
  title: string;
};

export const useGetFacultySubjects = ({
  facultyYearId,
}: GetFacultySubjectsProps) => {
  return useQuery<FacultySubjectType[]>({
    queryKey: ["faculty-subjects", facultyYearId],
    queryFn: async () => {
      const response = await customFetch({
        endpointUrl: `subjects/year/${facultyYearId}`,
        method: "GET",
      });

      return response;
    },
  });
};
