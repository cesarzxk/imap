import React from "react";
import { render, screen } from "@testing-library/react";
import Vertices from "../../../services/MapAreaSelector/Vertices";

const markersEdges = [
  {
    lat: 10,
    lng: 10,
  },
  {
    lat: 10,
    lng: 10,
  },
];

type MarkerTypes = {
  icon: React.ReactNode;
  eventHandlers: any;
  position: {
    lat: number;
    lng: number;
  };
};

jest.mock("react-leaflet", () => {
  return {
    Marker: jest
      .fn()
      .mockImplementation((props: MarkerTypes) => (
        <div onClick={() => props.eventHandlers.click()}>
          Marker {props.icon}
        </div>
      )),
  };
});

jest.mock("leaflet", () => {
  return {
    Icon: jest.fn().mockImplementation(() => <div>Icon</div>),
    Point: jest.fn(),
  };
});

describe("Vertices MapAreaSelector Service", () => {
  it("if Vertices have been displayed correctly", async () => {
    const useRefSpy = jest.spyOn(React, "useRef");

    useRefSpy.mockReturnValueOnce({
      current: {
        getLatLng: jest.fn(),
      },
    });

    render(
      <Vertices
        markers={markersEdges}
        markerSelected={undefined}
        setMarkers={() => jest.fn()}
        setMarkerSelected={() => jest.fn()}
      />
    );

    expect(screen.getAllByText(/Marker/i).length).toEqual(2);
    expect(screen.getAllByText(/Icon/i).length).toEqual(2);
  });
});
