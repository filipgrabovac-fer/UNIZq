import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";
import { jwtDecode } from "jwt-decode";
import { getTokenFromLocalStorageOrCookie } from "../../../routes/layout.routes";

export type PostCreateNewFacultyMutationProps = {
  title: string;
};
export type PostCreateNewFacultyProps = {
  onSuccess:
    | ((
        data: any,
        variables: PostCreateNewFacultyMutationProps,
        context: unknown
      ) => Promise<unknown> | unknown)
    | undefined;
};

export const usePostCreateNewFaculty = ({
  onSuccess,
}: PostCreateNewFacultyProps) => {
  // @ts-ignore
  const { userId } = jwtDecode(getTokenFromLocalStorageOrCookie() ?? "");

  return useMutation({
    onSuccess: onSuccess,
    mutationFn: async ({ title }: PostCreateNewFacultyMutationProps) => {
      const response = await customFetch({
        endpointUrl: `faculties/user/${userId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          title: title,
        },
      });

      return response;
    },
  });
};
