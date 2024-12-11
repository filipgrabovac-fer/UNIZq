import { Dispatch, SetStateAction, useState } from "react";
import { CustomInput } from "../CustomInput/CustomInput";
import { CustomButton } from "../CustomButton/CustomButton";
import { Map, Marker, useMarkerRef } from "@vis.gl/react-google-maps";
import { usePostEvent } from "./hooks/usePostEvent.hook";

type CreateEventModalProps = {
  setState: Dispatch<SetStateAction<boolean>>;
};

export const CreateEventModal = ({ setState }: CreateEventModalProps) => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [longitude, setLongitude] = useState<number | undefined>();
  const [latitude, setLatitude] = useState<number | undefined>();

  const markerExists = longitude && latitude;
  const [markerRef] = useMarkerRef();

  const { mutate: postEvent } = usePostEvent({
    onSuccess: () => setState(false),
  });

  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray bg-opacity-20 w-screen h-screen flex">
      <div className="flex flex-col m-auto bg-white px-8 pt-4 pb-8 rounded-lg max-[950px]:w-full max-[950px]:rounded-none">
        <h1 className="text-xxl font-semibold mb-4">Add event</h1>
        <div className="flex m-auto w-max gap-x-20 max-[950px]:flex-col  max-[950px]:w-full">
          <Map
            className="w-full max-[950px]:h-[400px]"
            defaultZoom={14}
            defaultCenter={{ lat: 45.815, lng: 15.9819 }}
            onClick={(event) => {
              const { lat, lng } = event.detail.latLng ?? {};
              setLatitude(lat);
              setLongitude(lng);
            }}
          >
            {markerExists && (
              <Marker
                position={{ lat: latitude, lng: longitude }}
                ref={markerRef}
              />
            )}
          </Map>
          <div className="w-[800px]  max-[950px]:w-full">
            <div className="w-3/5 max-[950px]:w-1/2  max-[950px]:mt-4">
              <CustomInput
                type="text"
                placeholder="event title"
                title="event title"
                setValue={setEventTitle}
              />
            </div>
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
                onClick={() =>
                  postEvent({
                    description: eventDescription,
                    latitude: latitude ?? 0,
                    longitude: longitude ?? 0,
                    title: eventTitle,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
