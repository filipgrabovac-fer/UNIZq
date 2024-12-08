import { useState } from "react";
import { CreateEventModal } from "../../components/CreateEventModal/CreateEventModal.component";
import { FacultySubject } from "../../components/FacultySubject/FacultySubject";

export const Home = () => {
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(true);
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
      {isCreateEventModalOpen && (
        <CreateEventModal setState={setIsCreateEventModalOpen} />
      )}
    </div>
  );
};
