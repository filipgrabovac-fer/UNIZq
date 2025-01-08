import { Dispatch, SetStateAction, useState } from "react";
import { Modal, Form, Input, Upload, message, UploadFile } from "antd";
import { PlusIcon } from "@heroicons/react/24/solid";
import { CustomButton } from "../CustomButton/CustomButton"; // Adjust the path as necessary
import { usePostCreatePost } from "./hooks/usePostCreatePost.hook";
import { subjectPostsRoute } from "../../routes/faculty-subjects.routes";
import { useQueryClient } from "@tanstack/react-query";

const { TextArea } = Input;

interface NewPostModalProps {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

export const CreatePostModal = ({
  isModalVisible,
  setIsModalVisible,
}: NewPostModalProps) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>();

  const queryClient = useQueryClient();

  const { mutate: createPost } = usePostCreatePost({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", subjectId] });
      setIsModalVisible(false);
    },
  });

  const { facultyId, subjectId } = subjectPostsRoute.useParams();

  const handleUploadChange = ({ fileList }: any) => {
    const isImage = fileList.every((file: any) =>
      file.type.startsWith("image/")
    );
    if (!isImage) {
      message.error("Please upload only images");
      return;
    }
    setFileList(fileList);
  };

  const onCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setFileList([]);
  };

  return (
    <Modal
      footer={null}
      open={isModalVisible}
      title="Create a new post"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" name="new_post_form">
        <Form.Item
          name="header"
          label="Post Header"
          rules={[{ required: true, message: "Please input the post header!" }]}
        >
          <Input placeholder="enter post header" />
        </Form.Item>
        <Form.Item
          name="body"
          label="Post Body"
          rules={[{ required: true, message: "Please input the post body!" }]}
        >
          <TextArea rows={4} placeholder="enter post body" />
        </Form.Item>
        <Form.Item name="images" label="Add images to post">
          <Upload
            accept="image/*"
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            multiple
          >
            {fileList?.length && fileList.length >= 5 ? null : (
              <div>
                <PlusIcon />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item name="links" label="Add link to meeting">
          <Input placeholder="enter meeting link" />
        </Form.Item>
        <div className="flex justify-end space-x-2 mt-4">
          <div
            className="w-32
          "
          >
            <CustomButton
              variant="secondary"
              title="Cancel"
              onClick={onCancel}
            />
          </div>
          <div className="w-32">
            <CustomButton
              variant="primary"
              title="Create"
              onClick={() => {
                form
                  .validateFields()
                  .then(() => {
                    const images: FormData = new FormData();
                    fileList?.forEach((file) => {
                      if (file.originFileObj) {
                        images.append("images", file.originFileObj);
                      }
                    });
                    createPost({
                      images: images,
                      postHeader: form.getFieldValue("header"),
                      postContent: form.getFieldValue("body"),
                      subjectId: Number(subjectId),
                      facultyId: Number(facultyId),
                    });
                    form.resetFields();
                    setFileList([]);
                  })
                  .catch(() => {
                    message.error(
                      "Validation Failed: Please check the form fields and try again."
                    );
                  });
              }}
            />
          </div>
        </div>
      </Form>
    </Modal>
  );
};
