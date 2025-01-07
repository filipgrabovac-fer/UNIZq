import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";
import { jwtDecode } from "jwt-decode";
import { getTokenFromLocalStorageOrCookie } from "../../../routes/layout.routes";

export type PostFacultyYearMutationProps = {
  title: string;
  facultyId: number;
};

export type PostFacultyYearProps = {
  onSuccess:
    | ((
        data: any,
        variables: PostFacultyYearMutationProps,
        context: unknown
      ) => Promise<unknown> | unknown)
    | undefined;
};

export const usePostFacultyYear = ({ onSuccess }: PostFacultyYearProps) => {
  // @ts-ignore
  const { userId } = jwtDecode(getTokenFromLocalStorageOrCookie() ?? "");

  return useMutation({
    onSuccess: onSuccess,
    mutationFn: async ({ title, facultyId }: PostFacultyYearMutationProps) => {
      const response = await customFetch({
        endpointUrl: `faculty-years/faculty/${facultyId}/user/${userId}`,
        method: "POST",
        body: {
          title,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    },
  });
};
