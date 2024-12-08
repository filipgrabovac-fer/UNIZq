import { useState } from "react";
import { CreateEventModal } from "../../components/CreateEventModal/CreateEventModal.component";
import { FacultySubject } from "../../components/FacultySubject/FacultySubject";

export const Home = () => {
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(true);
  return (
    <div className="w-full bg-secondary">
      Home page
      <FacultySubject
        subjectTitle="Operative Systems"
        subjectDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt..."
        onClick={() => 0}
      />
      {isCreateEventModalOpen && (
        <CreateEventModal setState={setIsCreateEventModalOpen} />
      )}
    </div>
  );
};
