import React, { useContext, useState } from "react";
import { createContext, ReactNode } from "react";
import { filterCountriesApi, getCountriesApi } from "../services/Api";

type mapContextData = {
  getAllCountries: () => Promise<void>;
  getFiltredCountries: () => Promise<200 | 500>;
  setPolygonMarkers: (markers: polygonType[]) => void;
  countries: countryType[];
  polygonMarkers: polygonType[];
  countriesFiltred: countryType[];
};

export const MapContext = createContext({} as mapContextData);

type mapProviderProps = {
  children: ReactNode;
};

type countryType = {
  name: string;
  country: string;
  location: {
    type: string;
    coordinates: number[];
  };
};

type polygonType = {
  lat: number;
  lng: number;
};

export function MapProvider({ children }: mapProviderProps) {
  const [countries, setCountries] = useState<countryType[]>([]);
  const [polygonMarkers, setPolygonMarkers] = useState<polygonType[]>([]);

  const [countriesFiltred, setCountriesFiltred] = useState<countryType[]>([]);

  function markers2Coordinates() {
    const newCoordinates = polygonMarkers.map((marker) => {
      return [marker.lng, marker.lat];
    });

    newCoordinates.push();

    return newCoordinates;
  }

  async function getAllCountries() {
    try {
      const { data } = await getCountriesApi.get("");
      setCountries(data);
    } catch (e) {
      console.log("Erro na requisição!");
    }
  }

  async function getFiltredCountries() {
    try {
      const { data } = await filterCountriesApi.post("", {
        coordinates: markers2Coordinates(),
      });
      setCountriesFiltred(data);
      return 200;
    } catch (e) {
      console.log(e);
      return 500;
    }
  }

  return (
    <MapContext.Provider
      value={{
        getAllCountries,
        getFiltredCountries,
        setPolygonMarkers,
        countries,
        polygonMarkers,
        countriesFiltred,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export const useMapContext = () => useContext(MapContext);
