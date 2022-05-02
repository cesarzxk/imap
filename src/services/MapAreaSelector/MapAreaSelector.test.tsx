import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MapAreaSelector from ".";
import { MapContext } from "../../context/MapContext";
import { act } from "react-dom/test-utils";

let countries = [
  {
    name: "brazil",
    country: "BR",
    location: {
      type: "Point",
      coordinates: { lat: 1, lng: 1 },
    },
  },
  {
    name: "italy",
    country: "IT",
    location: {
      type: "Point",
      coordinates: { lat: 2, lng: 2 },
    },
  },
];

let markersMock = [
  { lat: 1, lng: 1 },
  { lat: 2, lng: 2 },
];

let threeMarkersMock = [
  { lat: 1, lng: 1 },
  { lat: 2, lng: 2 },
  { lat: 3, lng: 3 },
];

jest.mock("./Vertices", () => {
  return ({
    setMarkerSelected,
    markerSelected,
    markers,
    setMarkers,
  }: {
    markerSelected: number;
    setMarkerSelected: (num: number) => void;
    markers: typeof markersMock;
    setMarkers: (markers: typeof markersMock) => void;
  }) => (
    <>
      <button onClick={() => setMarkerSelected(0)}>Vertices</button>
      <div>Selected:{markerSelected}</div>
      <button onClick={() => setMarkers(markersMock)}>createVertices</button>
      <button onClick={() => setMarkers(threeMarkersMock)}>
        createThreeVertices
      </button>
      <div>Markers:{markers.length}</div>
    </>
  );
});

jest.mock("./Edges", () => {
  return ({
    createMarker,
    edges,
  }: {
    createMarker: (parent1: number, edge: typeof markersMock[0]) => void;
    edges: typeof countries[];
  }) => (
    <>
      <button onClick={() => createMarker(0, markersMock[0])}>Edges</button>
      <div>Edges:{edges.length}</div>
    </>
  );
});

jest.mock("react-leaflet", () => {
  return {
    useMapEvents: jest.fn(),
    Polygon: () => <div>Polygon</div>,
  };
});

describe("Vertices Service", () => {
  it("if MapAreaSelector have been displayed correctly", () => {
    render(
      <MapContext.Provider
        value={
          {
            polygonMarkers: [],
            setPolygonMarkers: jest.fn(),
          } as any
        }
      >
        <MapAreaSelector />
      </MapContext.Provider>
    );
    expect(screen.getByText(/Polygon/i)).toBeInTheDocument();
  });

  it("if enabledMarkersButton have been called correctly", () => {
    render(
      <MapContext.Provider
        value={
          {
            polygonMarkers: [],
            setPolygonMarkers: jest.fn(),
          } as any
        }
      >
        <MapAreaSelector />
      </MapContext.Provider>
    );
    fireEvent.click(screen.getByTestId(/enabledMarkersButton/i));

    expect(screen.getByText(/Polygon/i)).toBeInTheDocument();
    expect(screen.getByText("Vertices")).toBeInTheDocument();
    expect(screen.getByText("Edges")).toBeInTheDocument();
  });

  it("if removeMarkersButton have been called correctly", () => {
    render(
      <MapContext.Provider
        value={
          {
            polygonMarkers: [],
            setPolygonMarkers: jest.fn(),
          } as any
        }
      >
        <MapAreaSelector />
      </MapContext.Provider>
    );
    fireEvent.click(screen.getByTestId(/enabledMarkersButton/i));
    fireEvent.click(screen.getByText("createVertices"));
    fireEvent.click(screen.getByText("Vertices"));

    expect(screen.getByText("Markers:2")).toBeInTheDocument();
    expect(screen.getByText("Selected:0")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId(/deleteMarkersButton/i));

    expect(screen.getByText("Markers:1")).toBeInTheDocument();
  });

  it("if createMarker have been called correctly", () => {
    render(
      <MapContext.Provider
        value={
          {
            polygonMarkers: [],
            setPolygonMarkers: jest.fn(),
          } as any
        }
      >
        <MapAreaSelector />
      </MapContext.Provider>
    );
    fireEvent.click(screen.getByTestId(/enabledMarkersButton/i));
    expect(screen.getByText("Markers:0")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Edges"));
    expect(screen.getByText("Markers:1")).toBeInTheDocument();
  });

  type PolygonEdgestype = {
    parent0: number;
    parent1: number;
    object: {
      lat: number;
      lng: number;
    };
  };

  it("if have more than 2 markers", () => {
    let polygonMarkers = [] as PolygonEdgestype[];

    render(
      <MapContext.Provider
        value={
          {
            polygonMarkers: polygonMarkers,
            setPolygonMarkers: (poligon: PolygonEdgestype[]) =>
              (polygonMarkers = poligon),
          } as any
        }
      >
        <MapAreaSelector />
      </MapContext.Provider>
    );
    fireEvent.click(screen.getByTestId(/enabledMarkersButton/i));
    expect(polygonMarkers.length).toEqual(0);

    act(() => {
      fireEvent.click(screen.getByText("createThreeVertices"));
    });
    expect(polygonMarkers.length).toEqual(4);
  });
});
