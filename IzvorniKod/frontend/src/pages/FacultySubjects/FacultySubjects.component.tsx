import { useNavigate } from "@tanstack/react-router";
import { FacultySubject } from "../../components/FacultySubject/FacultySubject";
import {
  facultySubjectsRoute,
  subjectPostsRoute,
} from "../../routes/faculty-subjects.routes";
import { useGetFacultySubjects } from "./hooks/useGetFacultySubjects.hook";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Search } from "../../components/Search/Search";
import { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { usePostFacultySubject } from "./hooks/usePostFacultySubject.hook";
import { useQueryClient } from "@tanstack/react-query";

export const FacultySubjects = () => {
  const [filterSubjectsByName, setfilterSubjectsByName] = useState<
    string | undefined
  >(undefined);

  const { yearId } = facultySubjectsRoute.useParams();

  const { data } = useGetFacultySubjects({ facultyYearId: yearId });
  const navigate = useNavigate();

  const filteredSubjects = filterSubjectsByName
    ? data?.filter((subject) =>
        subject.title.toLowerCase().includes(filterSubjectsByName.toLowerCase())
      )
    : data;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const [form] = Form.useForm();
  const [isOkDisabled, setIsOkDisabled] = useState(true);

  const handleFormChange = () => {
    const values = form.getFieldsValue();
    const isDisabled = !values.facultyName || !values.facultyDescription;
    setIsOkDisabled(isDisabled);
  };

  const queryClient = useQueryClient();

  const { mutate: postFacultySubject, isPending: isPostFacultySubjectPending } =
    usePostFacultySubject({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["faculty-subjects"],
        });
        setIsModalOpen(false);
      },
    });

  return (
    <div>
      <div className="flex align-middle mt-5">
        <h1 className="px-4 text-[1.5rem] font-medium ml-4  my-auto ">
          Faculty Subjects
        </h1>

        <button
          className="bg-primary w-8 h-8 rounded-sm justify-center flex my-auto"
          onClick={showModal}
        >
          <PlusIcon className="w-5 h-5 m-auto" color="white" />
        </button>
        <Modal
          footer={[
            <Button key="cancel" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>,
            <Button
              key="save"
              type="primary"
              className="bg-primary"
              disabled={isOkDisabled || isPostFacultySubjectPending}
              onClick={() => {
                form.validateFields().then((values) => {
                  postFacultySubject({
                    facultyName: values.facultyName,
                    facultyDescription: values.facultyDescription,
                    facultyYearId: yearId,
                  });
                });
              }}
            >
              Save
            </Button>,
          ]}
          centered
          title="Add Faculty Subject"
          open={isModalOpen}
        >
          <Form
            form={form}
            layout="vertical"
            onValuesChange={handleFormChange} // Trigger on every form change
          >
            <Form.Item
              label="Faculty Subject Name"
              name="facultyName"
              rules={[
                { required: true, message: "Please enter the faculty name" },
              ]}
              hasFeedback
            >
              <Input placeholder="Enter faculty name" />
            </Form.Item>
            <Form.Item
              label="Faculty Subject Description"
              name="facultyDescription"
              rules={[
                {
                  required: true,
                  message: "Please enter the faculty description",
                },
              ]}
              hasFeedback
            >
              <Input.TextArea
                rows={4}
                placeholder="Enter faculty description"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <div className="w-4/5 my-4 px-4 max-[1000px]:w-full ">
        <Search setFilterState={setfilterSubjectsByName} />
      </div>

      <div className="flex flex-wrap gap-4 mt-4 p-2 max-[600px]:justify-evenly max-[600px]:gap-x-0">
        {filteredSubjects?.map((facultySubject, i) => (
          <FacultySubject
            key={i}
            onClick={() => {
              navigate({
                to: subjectPostsRoute.to,
                params: {
                  subjectId: facultySubject.id,
                },
              });
            }}
            subjectDescription={facultySubject.description}
            subjectTitle={facultySubject.title}
          />
        ))}
      </div>
    </div>
  );
};
