import { useState } from "react";
import { CreatePostModal } from "../../components/CreatePostModal/CreatePostModal";
import SelectFacultyModal from "../../components/SelectFacultyModal/SelectFacultyModal";
import { Button } from "antd";

export const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSelectFacultyModalOpen, setIsSelectFacultyModalOpen] =
    useState(false);

  return (
    <div className="bg-secondary overflow-hidden">
      <Button type="primary" onClick={() => setIsSelectFacultyModalOpen(true)}>
        Select Faculties
      </Button>
      <SelectFacultyModal
        isModalOpen={isSelectFacultyModalOpen}
        setIsModalOpen={setIsSelectFacultyModalOpen}
      />
    </div>
  );
};
