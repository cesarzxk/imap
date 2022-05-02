import { render, screen } from "@testing-library/react";
import React, { useContext, useEffect } from "react";
import { fireEvent } from "@testing-library/dom";

import { MapContext, MapProvider } from "../../context/MapContext";
import { act } from "react-dom/test-utils";

const countries = [
  {
    name: "brazil",
    country: "BR",
    location: {
      type: "Point",
      coordinates: [1, 1],
    },
  },
  {
    name: "italy",
    country: "IT",
    location: {
      type: "Point",
      coordinates: [2, 2],
    },
  },
];

jest.mock("../../services/Api", () => {
  return {
    getCountriesApi: {
      get: jest.fn().mockResolvedValue({ data: countries }),
    },
    filterCountriesApi: {
      post: jest.fn().mockResolvedValue({ data: countries }),
    },
  };
});

describe("MapContext Context", () => {
  it("If getAllCountries function have been called correctly", async () => {
    //
    function FakeComponent() {
      const { countries, getAllCountries } = useContext(MapContext);
      return (
        <div>
          <button onClick={() => getAllCountries()}>getAllCountries</button>
          {countries.map((country) => (
            <p key={country.name}>{country.name}</p>
          ))}
        </div>
      );
    }

    render(
      <MapProvider>
        <FakeComponent />
      </MapProvider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText("getAllCountries"));
    });

    expect(screen.getByText("brazil")).toBeInTheDocument();
    expect(screen.getByText("italy")).toBeInTheDocument();
  });

  it("If getFiltredCountries function have been called correctly", async () => {
    //
    function FakeComponent() {
      const {
        countriesFiltred,
        getFiltredCountries,
        polygonMarkers,
        setPolygonMarkers,
      } = useContext(MapContext);

      useEffect(() => {
        setPolygonMarkers([
          { lat: 1, lng: 1 },
          { lat: 2, lng: 2 },
        ]);
      }, []);

      return (
        <div>
          <button onClick={() => getFiltredCountries()}>
            getFiltredCountries
          </button>

          {countriesFiltred.map((country) => (
            <p key={country.name}>{country.name}</p>
          ))}

          {polygonMarkers.map((country) => (
            <p key={country.lat}>{country.lat + " " + country.lng}</p>
          ))}
        </div>
      );
    }

    render(
      <MapProvider>
        <FakeComponent />
      </MapProvider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText("getFiltredCountries"));
    });

    expect(screen.getByText("brazil")).toBeInTheDocument();
    expect(screen.getByText("italy")).toBeInTheDocument();
    expect(screen.getByText("2 2")).toBeInTheDocument();
    expect(screen.getByText("1 1")).toBeInTheDocument();
  });
});
