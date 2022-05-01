import { useEffect, useState } from "react";
import { useMapEvents, Polygon } from "react-leaflet";
import { Box, IconButton } from "@chakra-ui/react";
import { FaDrawPolygon, FaRegTrashAlt } from "react-icons/fa";

import { useMapContext } from "../../context/MapContext";
import Vertices from "./Vertices";
import Edges from "./Edges";

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

export default function MapAreaSelector() {
  const { polygonMarkers, setPolygonMarkers } = useMapContext();
  const [enabledMarkers, setEnabledMarkers] = useState(false);

  const [markerSelected, setMarkerSelected] = useState<number>();
  const [markers, setMarkers] = useState<markerType[]>([]);
  const [edges, setEdges] = useState<PolygonEdgestype[]>([]);

  function removeMarker() {
    let newMarkes = markers.slice();
    newMarkes = markers.filter((item, index) => markerSelected !== index);
    setMarkerSelected(undefined);
    setMarkers(newMarkes);
  }

  function createEdges() {
    let newEdges = [] as PolygonEdgestype[];
    for (let i = 0; i < polygonMarkers.length - 1; i++) {
      const lat = (polygonMarkers[i].lat + polygonMarkers[i + 1].lat) / 2;
      const lng = (polygonMarkers[i].lng + polygonMarkers[i + 1].lng) / 2;
      newEdges.push({
        parent0: i,
        parent1: i + 1,
        object: { lat: lat, lng: lng },
      });
    }
    setEdges(newEdges);
  }

  function createMarker(parent1: number, object: markerType) {
    let start = markers.slice(0, parent1);
    let end = markers.slice(parent1, markers.length);
    setMarkers([...start, object, ...end]);
  }

  useEffect(() => {
    markers.length > 0 && setPolygonMarkers([...markers, markers[0]]);
    markers.length < 1 && setPolygonMarkers([]);
  }, [markers]);

  useEffect(() => {
    markers.length > 2 && createEdges();
    markers.length < 3 && setEdges([]);
  }, [polygonMarkers]);

  useMapEvents({
    mouseout() {
      setMarkerSelected(undefined);
    },
    dblclick(event) {
      enabledMarkers &&
        markers.length < 3 &&
        setMarkers([event.latlng, ...markers]);
    },
  });

  return (
    <>
      <Box className="leaflet-top leaflet-right">
        <Box borderRadius={25} className="leaflet-control leaflet-bar">
          <IconButton
            h="3rem"
            w="3rem"
            aria-label=""
            borderRadius={25}
            colorScheme={enabledMarkers ? "blue" : "gray"}
            onClick={() => {
              setEnabledMarkers(!enabledMarkers);
            }}
            icon={<FaDrawPolygon size={26} />}
          />
        </Box>

        <Box borderRadius={25} className="leaflet-control leaflet-bar">
          <IconButton
            h="3rem"
            w="3rem"
            aria-label=""
            disabled={markerSelected == undefined}
            borderRadius={25}
            colorScheme={markerSelected != undefined ? "red" : "gray"}
            onClick={() => {
              removeMarker();
            }}
            icon={<FaRegTrashAlt size={25} />}
          />
        </Box>
      </Box>

      {enabledMarkers && <Edges createMarker={createMarker} edges={edges} />}

      {enabledMarkers && (
        <Vertices
          markerSelected={markerSelected}
          markers={markers}
          setMarkers={setMarkers}
          setMarkerSelected={setMarkerSelected}
        />
      )}

      {markers && <Polygon positions={polygonMarkers} />}
    </>
  );
}
