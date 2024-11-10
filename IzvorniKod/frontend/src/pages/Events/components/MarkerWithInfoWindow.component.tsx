import {
  InfoWindow,
  Marker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useState } from "react";

type MarkerWithInfoWindowProps = {
  lng: number;
  lat: number;
  title: string;
};

export const MarkerWithInfoWindow = ({
  lng,
  lat,
  title,
}: MarkerWithInfoWindowProps) => {
  const [isInfoWindowVisible, setIsInfoWindowVisible] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <Marker
        ref={markerRef}
        position={{ lat, lng }}
        onClick={() => setIsInfoWindowVisible(!isInfoWindowVisible)}
      />
      {isInfoWindowVisible && (
        <InfoWindow
          anchor={marker}
          onCloseClick={() => setIsInfoWindowVisible(false)}
        >
          <p className="text-sm">{title}</p>
        </InfoWindow>
      )}
    </>
  );
};
