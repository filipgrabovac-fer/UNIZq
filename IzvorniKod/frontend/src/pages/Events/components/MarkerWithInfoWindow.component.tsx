import { InfoWindow, Marker, useMarkerRef } from "@vis.gl/react-google-maps";
import { useState } from "react";

type MarkerWithInfoWindowProps = {
  longitude: number;
  latitude: number;
  title: string;
};

export const MarkerWithInfoWindow = ({
  longitude,
  latitude,
  title,
}: MarkerWithInfoWindowProps) => {
  const [isInfoWindowVisible, setIsInfoWindowVisible] = useState(false);
  const [markerRef, marker] = useMarkerRef();

  return (
    <>
      <Marker
        ref={markerRef}
        position={{ lat: latitude, lng: longitude }}
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
