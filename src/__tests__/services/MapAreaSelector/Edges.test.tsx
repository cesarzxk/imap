import React from "react";
import { render, screen } from "@testing-library/react";
import Edges from "../../../services/MapAreaSelector/Edges";

const PolygonEdges = [
  {
    parent0: 0,
    parent1: 1,
    object: {
      lat: 10,
      lng: 20,
    },
  },
  {
    parent0: 1,
    parent1: 2,
    object: {
      lat: 10,
      lng: 20,
    },
  },
];

type MarkerTypes = {
  icon: React.ReactNode;
  //ref: MutableRefObject<any>;
  eventHandlers: any;
  position: {
    lat: number;
    lng: number;
  };
};

jest.mock("react-leaflet", () => {
  return {
    Marker: (props: MarkerTypes) => (
      <div onClick={() => props.eventHandlers.click()}>Marker {props.icon}</div>
    ),
  };
});

jest.mock("leaflet", () => {
  return {
    Icon: jest.fn().mockImplementation(() => <div>Icon</div>),
    Point: jest.fn(),
  };
});

describe("Edges MapAreaSelector", () => {
  it("if Edges have been displayed correctly", async () => {
    render(<Edges edges={PolygonEdges} createMarker={() => jest.fn()} />);

    expect(screen.getAllByText(/Marker/i).length).toEqual(2);
    expect(screen.getAllByText(/Icon/i).length).toEqual(2);
  });
});
