import { PostPreview } from "../../components/PostPreview/PostPreview";

export const Home = () => {
  return (
    <div className=" bg-secondary overflow-hidden">
      Home page
      <PostPreview
        postTitle="Post title"
        onClick={() => {}}
        canDelete={true}
        canModify={true}
        postID={1}
      />
    </div>
  );
};
