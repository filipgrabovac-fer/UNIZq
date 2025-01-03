import { useState } from "react";
import { Modal, Form, Input, Upload, message } from "antd";
import { PlusIcon } from "@heroicons/react/24/solid";
import { CustomButton } from "../CustomButton/CustomButton"; // Adjust the path as necessary

const { TextArea } = Input;

interface NewPostModalProps {
  onCreate: (values: any) => void;
}

const NewPostModal = ({ onCreate }: NewPostModalProps) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(true);
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
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate({ ...values, images: fileList });
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
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
            beforeUpload={() => false}
            multiple
          >
            {fileList.length >= 5 ? null : (
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
                  .then((values) => {
                    form.resetFields();
                    setFileList([]);
                    onCreate({ ...values, images: fileList });
                  })
                  .catch((info) => {
                    console.log("Validate Failed:", info);
                  });
              }}
            />
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default NewPostModal;
