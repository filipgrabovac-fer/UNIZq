import { useState } from "react";
import { Modal, Button, Checkbox, List, Input } from "antd";
import { cn } from "../../utils/cn.util";
import { useGetFacultiesForSelection } from "./hooks/useGetFacultiesForSelection.hook";
// Define the faculty type
interface Faculty {
  facultyName: string;
  userRole: "ADMIN" | undefined | "USER";
  facultyId: number;
}
interface SelectFacultyModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const SelectFacultyModal = ({
  isModalOpen,
  setIsModalOpen,
}: SelectFacultyModalProps) => {
  const [selectedFaculties, setSelectedFaculties] = useState<Faculty[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [requestingFaculties, setRequestingFaculties] = useState<number[]>([]);

  const faculties: Faculty[] = [
    {
      facultyName: "Faculty of Electrical Engineering and Computer Science",
      userRole: "ADMIN",
      facultyId: 1,
    },
    { facultyName: "PMF", userRole: "ADMIN", facultyId: 2 },
    { facultyName: "FSB", userRole: "USER", facultyId: 3 },
    { facultyName: "PBF", userRole: undefined, facultyId: 4 },
    {
      facultyName: "Faculty of Electrical Engineering and Computer Science",
      userRole: undefined,
      facultyId: 5,
    },
  ];

  const filteredFaculties = faculties.filter((faculty) =>
    faculty.facultyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaculty = (faculty: Faculty) => {
    if (selectedFaculties.some((f) => f.facultyId === faculty.facultyId)) {
      setSelectedFaculties(
        selectedFaculties.filter((f) => f.facultyId !== faculty.facultyId)
      );
    } else {
      setSelectedFaculties([...selectedFaculties, faculty]);
    }
  };

  const toggleRequest = (facultyId: number) => {
    if (requestingFaculties.includes(facultyId)) {
      setRequestingFaculties(
        requestingFaculties.filter((id) => id !== facultyId)
      );
    } else {
      setRequestingFaculties([...requestingFaculties, facultyId]);
    }
  };

  const { data } = useGetFacultiesForSelection();

  return (
    <Modal
      width={800}
      title={
        <h2 className="text-xl font-bold">Select a faculty of your interest</h2>
      }
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button key="cancel" onClick={() => setIsModalOpen(false)}>
          Cancel
        </Button>,
        <Button
          key="save"
          type="primary"
          className="bg-primary"
          onClick={() => setIsModalOpen(false)}
        >
          Save
        </Button>,
      ]}
      className="max-w-6xl p-6"
    >
      <div className="flex gap-8 max-[750px]:flex-col ">
        {/* Left Panel: List of Faculties */}
        <div className="w-3/5 max-[750px]:w-full ">
          <Input
            placeholder="Search"
            className="mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <List
            dataSource={filteredFaculties}
            renderItem={(faculty) => (
              <List.Item className="flex items-center justify-between">
                <div>
                  <Checkbox
                    checked={selectedFaculties.some(
                      (f) => f.facultyId === faculty.facultyId
                    )}
                    onChange={() => toggleFaculty(faculty)}
                  >
                    {faculty.facultyName}
                  </Checkbox>
                </div>

                <div>
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full border cursor-pointer",
                      faculty.userRole === "ADMIN"
                        ? "bg-primary text-white pointer-events-none cursor-default"
                        : requestingFaculties.includes(faculty.facultyId)
                        ? "bg-red text-white border-red"
                        : "bg-white text-red border-red"
                    )}
                    onClick={() =>
                      faculty.userRole !== "ADMIN" &&
                      toggleRequest(faculty.facultyId)
                    }
                  >
                    Admin
                  </span>
                </div>
              </List.Item>
            )}
            className="p-2 rounded-lg"
          />
        </div>

        {/* Right Panel: Selected Faculties */}
        <div className="w-2/5 bg-gray-50 p-4 rounded-lg max-[750px]:w-full">
          <h4 className="text-lg font-medium mb-2">Selected faculties:</h4>
          <List
            dataSource={selectedFaculties}
            renderItem={(faculty) => (
              <List.Item className="break-normal">
                {faculty.facultyName}
              </List.Item>
            )}
            className="p-2 rounded-lg"
          />
        </div>
      </div>
    </Modal>
  );
};

export default SelectFacultyModal;
