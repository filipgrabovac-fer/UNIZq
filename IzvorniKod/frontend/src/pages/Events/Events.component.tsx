import { useState } from "react";
import { Event } from "./components/Event.component";
import { Map, MapCameraChangedEvent } from "@vis.gl/react-google-maps";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

const eventsMockData = [
  {
    title: "Zagreb",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, deleniti?",
    lat: 45.815,
    lng: 15.9819,
  },
  {
    title: "Tokyo",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, deleniti?",
    lat: 35.6764,
    lng: 139.65,
  },
  {
    title: "Novska",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, deleniti?",
    lat: 45.34,
    lng: 16.9786,
  },
];

type SelectedEventType =
  | {
      lng: Float;
      lat: Float;
    }
  | undefined;

export const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<SelectedEventType>();

  return (
    <div className="flex max-[500px]:flex-wrap mt-7 w-full justify-center gap-x-10 mb-[500px]">
      <div className="flex flex-col">
        <p className="text-[40px] font-medium">
          What events are currenlty active?
        </p>
        <div className="border-[1px] border-gray_border mt-7 flex flex-col gap-2 max-h-[600px] overflow-y-scroll">
          {eventsMockData.map((event, i) => (
            <Event
              key={i}
              onClick={() =>
                setSelectedEvent({ lng: event.lng, lat: event.lat })
              }
              title={event.title}
              description={event.description}
            />
          ))}
        </div>
        <img
          src="/images/events-crowd.jpg"
          alt="placeholder image"
          className="w-full h-[300px] max-[300px]:hidden mt-7"
        />
      </div>

      <div className="flex flex-col min-[500px]:mt-[60px]">
        <img
          src="/images/events-crowd.jpg"
          alt="placeholder image"
          className="w-full h-[300px] max-[300px]:hidden mt-7 "
        />
        <p className="text-[40px] font-medium mt-7" id="google-maps">
          Where can I find those events?
        </p>
        <Map
          className="w-full mt-7 h-[512px]"
          defaultZoom={13}
          defaultCenter={{ lat: 45.815, lng: 15.9819 }}
          center={selectedEvent}
        />
      </div>
    </div>
  );
};
