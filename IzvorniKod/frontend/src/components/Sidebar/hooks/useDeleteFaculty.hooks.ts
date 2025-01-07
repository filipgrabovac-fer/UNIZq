import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";
import { jwtDecode } from "jwt-decode";
import { getTokenFromLocalStorageOrCookie } from "../../../routes/layout.routes";

export type DeleteFacultyProps = {
  onSuccess:
    | ((
        data: any,
        variables: number,
        context: unknown
      ) => Promise<unknown> | unknown)
    | undefined;
};

export const useDeleteFaculty = ({ onSuccess }: DeleteFacultyProps) => {
  // @ts-ignore
  const { userId } = jwtDecode(getTokenFromLocalStorageOrCookie() ?? "");

  return useMutation({
    onSuccess: onSuccess,
    mutationFn: async (facultyId: number) => {
      const response = await customFetch({
        endpointUrl: `faculties/${facultyId}/user/${userId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    },
  });
};
