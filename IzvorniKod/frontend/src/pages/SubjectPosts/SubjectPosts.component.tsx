import { Spin } from "antd";
import { PostPreview } from "../../components/PostPreview/PostPreview";
import { subjectPostsRoute } from "../../routes/faculty-subjects.routes";
import { useGetSubjectPosts } from "./hooks/useGetSubjectPosts.hook";

export const SubjectPosts = () => {
  const { subjectId } = subjectPostsRoute.useParams();

  const { data, isLoading } = useGetSubjectPosts({ subjectId: subjectId });

  return (
    <div className="w-full">
      {data?.map((post, i) => (
        <PostPreview
          key={i}
          canDelete
          canModify
          onClick={() => 0}
          postID={post.id}
          postTitle={post.title}
        />
      ))}
    </div>
  );
};
