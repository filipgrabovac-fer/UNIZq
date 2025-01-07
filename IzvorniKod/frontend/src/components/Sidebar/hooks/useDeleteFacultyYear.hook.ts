import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";
import { jwtDecode } from "jwt-decode";
import { getTokenFromLocalStorageOrCookie } from "../../../routes/layout.routes";

export type DeleteFacultyYearMutationProps = {
  yearId: number;
};
export type DeleteFacultyYearProps = {
  onSuccess: (
    data: any,
    variables: DeleteFacultyYearMutationProps,
    context: unknown
  ) => Promise<unknown> | unknown;
};
export const useDeleteFacultyYear = ({ onSuccess }: DeleteFacultyYearProps) => {
  // @ts-ignore
  const { userId } = jwtDecode(getTokenFromLocalStorageOrCookie() ?? "");

  return useMutation({
    onSuccess: onSuccess,
    mutationFn: async ({ yearId }: DeleteFacultyYearMutationProps) => {
      const response = await customFetch({
        endpointUrl: `faculty-years/faculty/${yearId}/user/${userId}`,
        method: "DELETE",
      });

      return response;
    },
  });
};
