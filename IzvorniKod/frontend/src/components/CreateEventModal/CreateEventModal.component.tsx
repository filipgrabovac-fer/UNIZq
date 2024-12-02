import { useState } from "react";
import { CustomInput } from "../CustomInput/CustomInput";

export const CreateEventModal = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray bg-opacity-20 w-screen h-screen flex">
      <div className="flex flex-col m-auto">
        <h1 className="text-xxl font-semibold">Add event</h1>
        <div className="flex m-auto w-max gap-x-20">
          <div>google maps</div>
          <div className="w-[500px] ">
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
          </div>
        </div>
      </div>
    </div>
  );
};
