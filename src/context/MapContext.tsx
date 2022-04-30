import React, { useContext, useEffect, useState } from "react";
import { createContext, ReactNode } from "react";
import { filterCountriesApi, getCountriesApi } from "../services/api";

type mapContextData = {
  getAllCountries: () => Promise<void>;
  getFiltredCountries: (coordinates: coordinatesType) => Promise<200 | 500>;
  countries: countryType[];
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

type coordinatesType = coordinateType[];

type coordinateType = number[];

export function MapProvider({ children }: mapProviderProps) {
  const [countries, setCountries] = useState<countryType[]>([]);

  async function getAllCountries() {
    try {
      const { data } = await getCountriesApi.get("");
      setCountries(data);
    } catch (e) {
      console.log("Erro na requisição!");
    }
  }

  async function getFiltredCountries(coordinates: coordinatesType) {
    try {
      const { data } = await filterCountriesApi.post("", {
        data: {
          coordinates: coordinates,
        },
      });

      console.log(data);
      return 200;
    } catch (e) {
      return 500;
    }
  }

  return (
    <MapContext.Provider
      value={{
        getAllCountries,
        getFiltredCountries,
        countries,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export const useMapContext = () => useContext(MapContext);
