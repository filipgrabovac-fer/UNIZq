import { useNavigate } from "@tanstack/react-router";
import { PostPreview } from "../../components/PostPreview/PostPreview";
import {
  postRoute,
  subjectPostsRoute,
} from "../../routes/faculty-subjects.routes";
import { useGetSubjectPosts } from "./hooks/useGetSubjectPosts.hook";
import { useEffect } from "react";

export const SubjectPosts = () => {
  const { subjectId } = subjectPostsRoute.useParams();

  const { data } = useGetSubjectPosts({ subjectId: subjectId });

  const navigate = useNavigate();
  return (
    <div className="w-full">
      <h1 className="text-[1.5rem] font-medium ml-4 mt-5">Subject Posts</h1>

      {data && data.length > 0 ? (
        <div className="w-full px-10 max-[500px]:px-4">
          {data.map((post, i) => (
            <PostPreview
              key={i}
              editable={post.editable}
              onClick={() =>
                navigate({
                  to: postRoute.fullPath,
                  params: { postId: post.id },
                })
              }
              postId={post.id}
              postTitle={post.title}
            />
          ))}
        </div>
      ) : (
        <div>
          <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-gray">
            No posts found.
          </p>
        </div>
      )}
    </div>
  );
};
