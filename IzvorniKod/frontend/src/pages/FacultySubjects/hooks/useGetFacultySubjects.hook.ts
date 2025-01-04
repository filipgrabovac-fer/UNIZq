import { useQuery } from "@tanstack/react-query";

export type GetFacultySubjectsProps = {
  facultyId: string;
};

export const useGetFacultySubjects = ({
  facultyId,
}: GetFacultySubjectsProps) => {
  return useQuery({
    queryKey: ["faculty-subjects", facultyId],
    queryFn: async () => {},
  });
};
