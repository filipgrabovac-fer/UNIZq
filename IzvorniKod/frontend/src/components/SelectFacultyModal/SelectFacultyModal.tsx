import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal, Button, Checkbox, List, Input } from "antd";
import { cn } from "../../utils/cn.util";
import { useGetFacultiesForSelection } from "./hooks/useGetFacultiesForSelection.hook";
import { usePostSelectFaculties } from "./hooks/usePostSelectFaculties.hook";
import { useQueryClient } from "@tanstack/react-query";
// Define the faculty type
interface Faculty {
  facultyName: string;
  userRole: UserRoleEnum | undefined;
  facultyId: number;
}
interface SelectFacultyModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export enum UserRoleEnum {
  ADMIN = "ADMIN",
  USER = "USER",
}

const SelectFacultyModal = ({
  isModalOpen,
  setIsModalOpen,
}: SelectFacultyModalProps) => {
  const [selectedFaculties, setSelectedFaculties] = useState<Faculty[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const queryClient = useQueryClient();

  const toggleFaculty = (faculty: Faculty) => {
    if (selectedFaculties?.some((f) => f.facultyId === faculty.facultyId)) {
      setSelectedFaculties(
        selectedFaculties?.filter((f) => f.facultyId !== faculty.facultyId)
      );
    } else {
      setSelectedFaculties([
        ...selectedFaculties,
        {
          facultyId: faculty.facultyId,
          facultyName: faculty.facultyName,
          userRole: UserRoleEnum.USER,
        },
      ]);
    }
  };

  const toggleRequest = (facultyId: number) => {
    setSelectedFaculties((prev) => {
      const toggledPrev = prev.map((faculty) => ({
        facultyId: faculty.facultyId,
        facultyName: faculty.facultyName,
        userRole:
          faculty.facultyId == facultyId
            ? faculty.userRole === UserRoleEnum.ADMIN
              ? UserRoleEnum.USER
              : UserRoleEnum.ADMIN
            : faculty.userRole,
      }));

      return toggledPrev;
    });
  };
  const { data: facultiesForSelectionData } = useGetFacultiesForSelection();

  useEffect(() => {
    if (facultiesForSelectionData != undefined) {
      setSelectedFaculties(
        facultiesForSelectionData.filter(
          (faculty) => faculty.userRole != undefined
        )
      );
    }
  }, [facultiesForSelectionData]);
  const filteredFaculties = facultiesForSelectionData?.filter((faculty) =>
    faculty.facultyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { mutate: selectFaculties } = usePostSelectFaculties({
    onSuccess: () => {
      setIsModalOpen(false);
      setSelectedFaculties([]);
      queryClient.invalidateQueries({ queryKey: ["selected-faculties"] });
    },
  });

  return (
    <Modal
      centered
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
          onClick={() => {
            if (selectedFaculties.length === 0) {
              return;
            }

            const filteredSelectedFaculties = selectedFaculties.filter(
              (selectedFaculty) =>
                facultiesForSelectionData?.filter(
                  (prevSelectedFaculty) =>
                    prevSelectedFaculty.facultyId ==
                      selectedFaculty.facultyId &&
                    (prevSelectedFaculty.userRole != selectedFaculty.userRole ||
                      (prevSelectedFaculty.userRole == null &&
                        selectedFaculty.userRole != null))
                )?.length != 0
            );

            selectFaculties({
              facultyList: filteredSelectedFaculties.map((faculty) => ({
                facultyId: faculty.facultyId,
                userRole: faculty.userRole,
              })),
            });
          }}
        >
          Save
        </Button>,
      ]}
      className="max-w-6xl p-6"
    >
      <div className="flex gap-8 max-[750px]:flex-col h-[400px] ">
        {/* Left Panel: List of Faculties */}
        <div className="w-3/5 max-[750px]:w-full ">
          <Input
            placeholder="Search"
            className="mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="overflow-y-scroll h-[350px]">
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
                          : selectedFaculties.filter(
                              (fa) => fa.facultyId == faculty.facultyId
                            )[0]?.userRole == UserRoleEnum.ADMIN
                          ? "bg-red text-white border-red"
                          : "bg-white text-red border-red"
                      )}
                      onClick={() => toggleRequest(faculty.facultyId)}
                    >
                      Admin
                    </span>
                  </div>
                </List.Item>
              )}
              className="p-2 rounded-lg"
            />
          </div>
        </div>

        {/* Right Panel: Selected Faculties */}
        <div className="w-2/5 bg-gray-50 p-4 rounded-lg max-[750px]:w-full">
          <h4 className="text-lg font-medium mb-2">Selected faculties:</h4>
          <div className=" overflow-y-scroll h-[350px]">
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
      </div>
    </Modal>
  );
};

export default SelectFacultyModal;
