import { useState } from "react";
import { Event } from "./components/Event.component";
import { Map } from "@vis.gl/react-google-maps";
import { MarkerWithInfoWindow } from "./components/MarkerWithInfoWindow.component";

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
  {
    title: "Novska",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, deleniti?",
    lat: 45.34,
    lng: 16.9786,
  },
  {
    title: "Novska",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, deleniti?",
    lat: 45.34,
    lng: 16.9786,
  },
  {
    title: "Novska",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, deleniti?",
    lat: 45.34,
    lng: 16.9786,
  },
  {
    title: "Novska",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, deleniti?",
    lat: 45.34,
    lng: 16.9786,
  },
  {
    title: "Novska",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, deleniti?",
    lat: 45.34,
    lng: 16.9786,
  },
  {
    title: "Novska",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, deleniti?",
    lat: 45.34,
    lng: 16.9786,
  },
];

type SelectedEventType = {
  lng: number;
  lat: number;
};

export const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<SelectedEventType>();

  const defaultCenter = { lat: 45.815, lng: 15.9819 };

  return (
    <div className="flex mt-7 w-full justify-center gap-x-10  max-[1160px]:flex-col max-[1160px]:px-20 max-[500px]:px-2">
      <div className="flex flex-col ">
        <p className="text-[40px] font-medium max-[500px]:text-[28px]">
          What events are currently active?
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
          className="w-full h-[300px] max-[300px]:hidden mt-7 object-cover"
        />
      </div>

      <div className="flex flex-col min-[500px]:mt-[60px]">
        <img
          src="/images/events-crowd.jpg"
          alt="placeholder image"
          className="w-full h-[300px] max-[1160px]:hidden mt-7 object-cover"
        />
        <p
          className="text-[40px] font-medium mt-7 max-[500px]:text-[28px]"
          id="google-maps"
        >
          Where can I find those events?
        </p>

        <Map
          className="w-full mt-7 h-[512px] max-[500px]:h-[320px]"
          defaultZoom={12}
          defaultCenter={defaultCenter}
          center={selectedEvent}
          onCameraChanged={() => setSelectedEvent(undefined)}
        >
          {eventsMockData.map((event, i) => (
            <MarkerWithInfoWindow key={i} {...event} />
          ))}
        </Map>
      </div>
    </div>
  );
};
