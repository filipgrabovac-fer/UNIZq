import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";
import { jwtDecode } from "jwt-decode";
import { getTokenFromLocalStorageOrCookie } from "../../../routes/layout.routes";

export type PostFacultySubjectProps = {
  facultyName: string;
  facultyDescription: string;
  facultyYearId: string;
};

export const usePostFacultySubject = () => {
  //@ts-ignore
  const { userId } = jwtDecode(getTokenFromLocalStorageOrCookie() ?? "");
  return useMutation({
    mutationFn: async ({
      facultyName,
      facultyDescription,
      facultyYearId,
    }: PostFacultySubjectProps) => {
      const response = await customFetch({
        endpointUrl: `subjects/year/${facultyYearId}/user/${userId}`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { title: facultyName, description: facultyDescription },
      });
      return response;
    },
  });
};
