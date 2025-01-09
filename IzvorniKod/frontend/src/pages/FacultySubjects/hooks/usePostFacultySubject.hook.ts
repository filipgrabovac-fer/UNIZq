import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";
import { jwtDecode } from "jwt-decode";
import { getTokenFromLocalStorageOrCookie } from "../../../routes/layout.routes";

export type PostFacultySubjectMutationProps = {
  facultyName: string;
  facultyDescription: string;
  facultyYearId: string;
};

export type PostFacultySubjectProps = {
  onSuccess:
    | ((
        data: any,
        variables: PostFacultySubjectMutationProps,
        context: unknown
      ) => Promise<unknown> | unknown)
    | undefined;
};

export const usePostFacultySubject = ({
  onSuccess,
}: PostFacultySubjectProps) => {
  //@ts-ignore
  const { userId } = jwtDecode(getTokenFromLocalStorageOrCookie() ?? "");
  return useMutation({
    onSuccess: onSuccess,
    mutationFn: async ({
      facultyName,
      facultyDescription,
      facultyYearId,
    }: PostFacultySubjectMutationProps) => {
      const response = await customFetch({
        endpointUrl: `subjects/year/${facultyYearId}/user/${userId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: facultyName,
          description: facultyDescription,
        }),
      });
      return response;
    },
  });
};
