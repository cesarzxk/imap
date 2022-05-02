import { useRef, useMemo } from "react";

import { Marker } from "react-leaflet";
import { Icon, Point } from "leaflet";

type markerType = {
  lat: number;
  lng: number;
};

type PolygonEdgestype = {
  parent0: number;
  parent1: number;
  object: {
    lat: number;
    lng: number;
  };
};

type edgesProps = {
  edges: PolygonEdgestype[];
  createMarker: (parent1: number, object: markerType) => void;
};

export default function Edges({ createMarker, edges }: edgesProps) {
  const rectangleMarker = new Icon({
    iconUrl: "/rectangle.svg",
    iconRetinaUrl: "/rectangle.svg",
    iconSize: new Point(10, 10),
  });

  const NewRectangleMarker = ({ marker }: { marker: PolygonEdgestype }) => {
    const eventHandlers = useMemo(
      () => ({
        click() {
          createMarker(marker.parent1, marker.object);
        },
      }),
      []
    );

    return (
      <Marker
        eventHandlers={eventHandlers}
        position={marker.object}
        icon={rectangleMarker}
      />
    );
  };

  return (
    <>
      {edges?.map((marker, index) => (
        <NewRectangleMarker key={index} marker={marker} />
      ))}
    </>
  );
}
