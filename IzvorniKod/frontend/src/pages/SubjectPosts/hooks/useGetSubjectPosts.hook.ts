import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";

export type GetSubjectPostsProps = {
  subjectId: string;
};

export type SubjectPostType = {
  active: boolean;
  description: string;
  downvotes: number;
  editable: boolean;
  facutlyUserId: number;
  id: number;
  reports: number;
  subjectId: number;
  title: string;
  upvotes: number;
};

export const useGetSubjectPosts = ({ subjectId }: GetSubjectPostsProps) => {
  return useQuery<SubjectPostType[]>({
    queryKey: ["posts", subjectId],
    queryFn: async () => {
      const response = await customFetch({
        endpointUrl: `posts/subject/${subjectId}`,
        method: "GET",
      });

      console.log(response);
      return response;
    },
  });
};
