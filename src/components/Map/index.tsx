import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

import { useMapContext } from "../../context/MapContext";
import MapAreaSelector from "../../services/MapAreaSelector";
import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";

type countryType = {
  name: string;
  country: string;
  location: {
    type: string;
    coordinates: number[];
  };
};

export default function Map() {
  const { getAllCountries, countries } = useMapContext();

  useEffect(() => {
    getAllCountries();
  }, []);

  useEffect(() => {
    console.log(countries);
  }, [countries]);

  return (
    <MapContainer
      center={{ lat: 35, lng: 20 }}
      className={styles.map}
      zoom={2}
      doubleClickZoom={false}
      zoomControl={true}
      scrollWheelZoom={true}
    >
      <>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapAreaSelector />

        {countries?.map((country: countryType) => {
          return (
            <CircleMarker
              radius={4}
              color={"#35A6E7"}
              center={{
                lat: country.location.coordinates[1],
                lng: country.location.coordinates[0],
              }}
            >
              <Popup>
                <Box>
                  <Text fontWeight="bold">
                    {country.name} - {country.country}
                  </Text>
                </Box>
              </Popup>
            </CircleMarker>
          );
        })}
      </>
    </MapContainer>
  );
}
