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

type newMarkerProps = {
  marker: markerType;
  index: number;
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

  const NewVertice = (props: newMarkerProps) => {
    const markerRef = useRef<any>();

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          let newMarkes = markers.slice();
          newMarkes[props.index] = markerRef.current.getLatLng();
          setMarkers(newMarkes);
        },
        click() {
          setMarkerSelected(props.index);
        },
      }),
      []
    );
    return (
      <Marker
        ref={markerRef}
        eventHandlers={eventHandlers}
        draggable
        position={props.marker}
        icon={props.index == markerSelected ? redMarker : blueMarker}
      />
    );
  };

  return (
    <>
      {markers?.map((marker, index) => (
        <NewVertice key={index} index={index} marker={marker} />
      ))}
    </>
  );
}
