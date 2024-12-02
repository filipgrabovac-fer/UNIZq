import { CreateEventModal } from "../../components/CreateEventModal/CreateEventModal.component";
import { FacultySubject } from "../../components/FacultySubject/FacultySubject";

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
      <CreateEventModal />
    </div>
  );
};
