import { Dispatch, SetStateAction, useState } from "react";
import { CustomInput } from "../CustomInput/CustomInput";
import { CustomButton } from "../CustomButton/CustomButton";
import { Map } from "@vis.gl/react-google-maps";

type CreateEventModalProps = {
  setState: Dispatch<SetStateAction<boolean>>;
};
export const CreateEventModal = ({ setState }: CreateEventModalProps) => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray bg-opacity-20 w-screen h-screen flex">
      <div className="flex flex-col m-auto bg-white px-8 py-4 rounded-lg">
        <h1 className="text-xxl font-semibold mb-4">Add event</h1>
        <div className="flex m-auto w-max gap-x-20">
          <Map
            className="w-full"
            defaultZoom={14}
            defaultCenter={{ lat: 35.1231, lng: 25.123123 }}
            onClick={(event) => console.log(event)}
          />
          <div className="w-[800px]">
            <CustomInput
              type="text"
              placeholder="event title"
              title="event title"
              setValue={setEventTitle}
            />
            <CustomInput
              type="text"
              rows={15}
              placeholder="event description"
              title="event description"
              setValue={setEventDescription}
            />
            <div className="flex ml-auto w-60 mt-2">
              <CustomButton
                variant="secondary"
                title="Cancel"
                onClick={() => setState(false)}
              />
              <CustomButton
                variant="primary"
                title="Save"
                onClick={() => console.log("save")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
