import { CustomButton } from "../../CustomButton/CustomButton";
import { CustomInput } from "../../CustomInput/CustomInput";
import { Select } from "antd";

import { useFormikContext } from "formik";
import { CreateEventSchemaType } from "../CreateEventModal.component";

export type CreateEventModalFormProps = {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  facultyOptions: { value: number; label: string }[];
};

export const CreateEventModalForm = ({
  setState,
  facultyOptions,
}: CreateEventModalFormProps) => {
  const { setFieldValue, touched, handleSubmit, errors } =
    useFormikContext<CreateEventSchemaType>();

  const titleErrorMessage =
    errors.title && touched.title ? "Please provide a title" : "";

  const descriptionErrorMessage =
    errors.description && touched.description
      ? "Please provide a description"
      : "";
  return (
    <div className="w-[800px] max-[950px]:w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-x-2">
          <div className="w-1/2 max-[950px]:mt-4">
            <CustomInput
              type="text"
              placeholder="event title"
              title="event title"
              onChange={(event) => {
                setFieldValue("title", event.target.value);
              }}
              errorMessage={titleErrorMessage}
            />
          </div>
          <Select
            className="m-auto mt-6  w-1/2 h-[2.5rem] max-[950px]:mt-10"
            placeholder="Select faculty"
            defaultValue={facultyOptions[0].value}
            options={facultyOptions}
            onChange={(value) => setFieldValue("faculty_id", value)}
          />
        </div>
        <CustomInput
          type="text"
          rows={15}
          placeholder="event description"
          title="event description"
          onChange={(event) => setFieldValue("description", event.target.value)}
          errorMessage={descriptionErrorMessage}
        />
        <div className="flex ml-auto w-60 mt-2">
          <CustomButton
            variant="secondary"
            title="Cancel"
            onClick={() => setState(false)}
          />
          <CustomButton
            variant="primary"
            type="submit"
            title="Save"
            onClick={() => null}
          />
        </div>
      </form>
    </div>
  );
};
