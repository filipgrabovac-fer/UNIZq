import { useNavigate } from "@tanstack/react-router";
import { PostPreview } from "../../components/PostPreview/PostPreview";
import {
  postRoute,
  subjectPostsRoute,
} from "../../routes/faculty-subjects.routes";
import { useGetSubjectPosts } from "./hooks/useGetSubjectPosts.hook";
import { Search } from "../../components/Search/Search";
import { useState } from "react";
import { CreatePostModal } from "../../components/CreatePostModal/CreatePostModal";

export const SubjectPosts = () => {
  const { subjectId } = subjectPostsRoute.useParams();

  const { data } = useGetSubjectPosts({ subjectId: subjectId });
  const [filterPostsByName, setFilterPostsByName] = useState<
    string | undefined
  >();
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  const navigate = useNavigate();

  const filteredPosts = filterPostsByName
    ? data?.filter((post) =>
        post.title.toLowerCase().includes(filterPostsByName.toLowerCase())
      )
    : data;

  return (
    <div className="w-full">
      <h1 className="text-[1.5rem] font-medium ml-4 mt-5">Subject Posts</h1>

      <div className="w-4/5 px-4 my-4 ">
        <Search
          setFilterState={setFilterPostsByName}
          withAddPost
          onAddPostClick={() => setIsCreatePostModalOpen(true)}
        />
      </div>

      {filteredPosts && filteredPosts.length > 0 ? (
        <div className="px-6 w-full max-[500px]:px-4">
          {filteredPosts.map((post, i) => (
            <PostPreview
              key={i}
              editable={post.isEditable}
              onClick={() =>
                navigate({
                  to: postRoute.fullPath,
                  params: { postId: post.id },
                })
              }
              postId={post.id}
              postTitle={post.title}
              isDownvoted={post.userDownvoted}
              isUpvoted={post.userUpvoted}
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
      {isCreatePostModalOpen && (
        <CreatePostModal
          isModalVisible={isCreatePostModalOpen}
          setIsModalVisible={setIsCreatePostModalOpen}
        />
      )}
    </div>
  );
};
