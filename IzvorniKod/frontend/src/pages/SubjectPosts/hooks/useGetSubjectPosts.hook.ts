import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";
import { jwtDecode } from "jwt-decode";
import { getTokenFromLocalStorageOrCookie } from "../../../routes/layout.routes";

export type GetSubjectPostsProps = {
  subjectId: string;
};

export type SubjectPostType = {
  id: number;
  title: string;
  description: string;
  facultyUserId: number;
  subjectId: number;
  userUpvoted: boolean;
  userDownvoted: boolean;
  active: boolean;
  isEditable: boolean;
};

export const useGetSubjectPosts = ({ subjectId }: GetSubjectPostsProps) => {
  // @ts-ignore
  const { userId } = jwtDecode(getTokenFromLocalStorageOrCookie() ?? "");

  return useQuery<SubjectPostType[]>({
    queryKey: ["posts", subjectId],
    queryFn: async () => {
      const response = await customFetch({
        endpointUrl: `posts/subject/${subjectId}/user/${userId}`,
        method: "GET",
      });

      return response;
    },
  });
};
