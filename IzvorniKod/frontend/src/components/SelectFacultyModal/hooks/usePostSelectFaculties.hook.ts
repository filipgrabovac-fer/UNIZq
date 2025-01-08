import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";
import { jwtDecode } from "jwt-decode";
import { getTokenFromLocalStorageOrCookie } from "../../../routes/layout.routes";
import { UserRoleEnum } from "../SelectFacultyModal";

export type PostSelectFacultiesMutationProps = {
  facultyList: {
    facultyId: number;
    userRole: UserRoleEnum | undefined;
  }[];
};

export type PostSelectFacultiesProps = {
  onSuccess:
    | ((
        data: any,
        variables: PostSelectFacultiesMutationProps,
        context: unknown
      ) => Promise<unknown> | unknown)
    | undefined;
};

export const usePostSelectFaculties = ({
  onSuccess,
}: PostSelectFacultiesProps) => {
  // @ts-ignore
  const { userId } = jwtDecode(getTokenFromLocalStorageOrCookie() ?? "");

  return useMutation({
    onSuccess: onSuccess,
    mutationFn: async ({ facultyList }: PostSelectFacultiesMutationProps) => {
      const response = await customFetch({
        endpointUrl: `user/${userId}/selected-faculties`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { facultyUserList: facultyList },
      });

      console.log(response);

      return response;
    },
  });
};
