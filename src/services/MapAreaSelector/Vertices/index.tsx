import { useRef, useMemo } from "react";
import { Marker } from "react-leaflet";
import { Icon, Point } from "leaflet";

type markerType = {
  lat: number;
  lng: number;
};

type verticesProps = {
  markers: markerType[];
  markerSelected: number | undefined;
  setMarkers: (markers: markerType[]) => void;
  setMarkerSelected: (select: number) => void;
};

export default function Vertices({
  markerSelected,
  markers,
  setMarkers,
  setMarkerSelected,
}: verticesProps) {
  const blueMarker = new Icon({
    iconUrl: "/marker.svg",
    iconRetinaUrl: "/marker.svg",
    iconSize: new Point(10, 10),
  });

  const redMarker = new Icon({
    iconUrl: "/redmarker.svg",
    iconRetinaUrl: "/marker.svg",
    iconSize: new Point(10, 10),
  });

  const NewMarker = ({
    marker,
    index,
  }: {
    marker: markerType;
    index: number;
  }) => {
    const markerRef = useRef<any>();
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          let newMarkes = markers.slice();
          newMarkes[index] = markerRef.current.getLatLng();
          setMarkers(newMarkes);
        },
        click() {
          setMarkerSelected(index);
        },
      }),
      []
    );
    return (
      <Marker
        ref={markerRef}
        eventHandlers={eventHandlers}
        draggable
        position={marker}
        icon={index == markerSelected ? redMarker : blueMarker}
      />
    );
  };

  return (
    <>
      {markers?.map((marker, index) => (
        <NewMarker key={index} index={index} marker={marker} />
      ))}
    </>
  );
}
