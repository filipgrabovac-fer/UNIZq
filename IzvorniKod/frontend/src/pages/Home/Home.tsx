import { useState } from "react";
import { CreateEventModal } from "../../components/CreateEventModal/CreateEventModal.component";

export const Home = () => {
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(true);
  return (
    <div className=" bg-secondary overflow-hidden">
      Home page
      {isCreateEventModalOpen && (
        <CreateEventModal setState={setIsCreateEventModalOpen} />
      )}
    </div>
  );
};
