import { VStack } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import MapMarker from "../MapMarkers";
import styles from "./Map.module.css";

export default function Map() {
  return (
    <VStack>
      <MapContainer
        center={{ lat: 55, lng: 10 }}
        className={styles.map}
        zoom={1}
        doubleClickZoom={false}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapMarker />
      </MapContainer>
    </VStack>
  );
}
