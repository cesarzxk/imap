import { useEffect, useState, useRef, useMemo } from "react";
import { useMapEvents, Marker, Polygon } from "react-leaflet";

import { Icon, Point } from "leaflet";
import { Box, Button } from "@chakra-ui/react";
import { FaDrawPolygon, FaRegTrashAlt } from "react-icons/fa";

type markerType = {
  lat: number;
  lng: number;
};

export default function MapMarker() {
  const [markers, setMarkers] = useState<markerType[]>([]);
  const [enabledMarkers, setEnabledMarkers] = useState(false);
  const [markerSelected, setMarkerSelected] = useState<number>();
  const [polygonMarkers, setPolygonMarkers] = useState<
    { lat: number; lng: number }[]
  >([]);

  function removeMarker() {
    let newMarkes = markers.slice();
    newMarkes = markers.filter((item, index) => markerSelected !== index);
    setMarkerSelected(undefined);
    setMarkers(newMarkes);
  }

  useEffect(() => {
    markers.length > 0 && setPolygonMarkers([...markers, markers[0]]);
    markers.length == 0 && setPolygonMarkers([]);
  }, [markers]);

  useMapEvents({
    mouseout() {
      setMarkerSelected(undefined);
    },
    dblclick(event) {
      enabledMarkers && setMarkers([event.latlng, ...markers]);
    },
  });

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
      <Box marginRight="10px" className="leaflet-top leaflet-right">
        <Box borderRadius={25} className="leaflet-control leaflet-bar">
          <Button
            h="3rem"
            w="3rem"
            borderRadius={25}
            colorScheme={enabledMarkers ? "blue" : "gray"}
            onClick={() => {
              setEnabledMarkers(!enabledMarkers);
            }}
          >
            <FaDrawPolygon size={26} />
          </Button>
        </Box>

        <Box borderRadius={25} className="leaflet-control leaflet-bar">
          <Button
            h="3rem"
            w="3rem"
            disabled={markerSelected == undefined}
            borderRadius={25}
            colorScheme={markerSelected != undefined ? "red" : "gray"}
            onClick={() => {
              removeMarker();
            }}
          >
            <FaRegTrashAlt size={25} />
          </Button>
        </Box>
      </Box>

      {markers?.map((marker, index) => (
        <NewMarker key={index} index={index} marker={marker} />
      ))}

      {markers && <Polygon positions={polygonMarkers} />}
    </>
  );
}
