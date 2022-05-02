import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Map from ".";
import { MapContext } from "../../context/MapContext";
import React from "react";

const countries = [
  {
    name: "brazil",
    country: "BR",
    location: {
      type: "Point",
      coordinates: [10, 10],
    },
  },
  {
    name: "brazil2",
    country: "BR",
    location: {
      type: "Point",
      coordinates: [10, 10],
    },
  },
];

const MapMocked = ({ children }: { children: React.ReactElement<any> }) => (
  <div>{children}</div>
);

const TileLayerMocked = () => <div>title</div>;

const CircleMocked = ({
  children,
  center,
}: {
  children: React.ReactNode;
  center: { lat: number; lng: number };
}) => (
  <div>
    <p>circle</p>
    {center.lat + " " + center.lng}
    {children}
  </div>
);

const PopupMocked = ({ children }: { children: React.ReactNode }) => (
  <div>
    popup
    {children}
  </div>
);

jest.mock("react-leaflet", () => {
  return {
    MapContainer: MapMocked,
    TileLayer: TileLayerMocked,
    CircleMarker: CircleMocked,
    Popup: PopupMocked,
  };
});

jest.mock("../../services/MapAreaSelector", () => {
  return () => <div>MapAreaSelector</div>;
});

describe("Map component", () => {
  it("if Map have been displayed correctly", async () => {
    render(
      <MapContext.Provider
        value={
          {
            getAllCountries: jest.fn(),
            countries: countries,
          } as any
        }
      >
        <Map />
      </MapContext.Provider>
    );

    expect(screen.getByText(/map/i)).toBeInTheDocument();
    expect(screen.getByText(/title/i)).toBeInTheDocument();

    expect(screen.getAllByText(/BR/i).length).toEqual(2);
    expect(screen.getAllByText(/circle/i).length).toEqual(2);
    expect(screen.getAllByText(/popup/i).length).toEqual(2);
    expect(screen.getAllByText(/brazil/i).length).toEqual(2);
    expect(screen.getAllByText(/10 10/i).length).toEqual(2);
  });
});
