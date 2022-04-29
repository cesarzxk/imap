import { VStack } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer } from "react-leaflet";
import styles from "./Map.module.css";

export default function Map() {
  const position = [51.505, -0.09];
  return (
    <VStack>
      <MapContainer
        center={{ lat: 55, lng: 10 }}
        className={styles.map}
        zoom={1}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </VStack>
  );
}
