import { fireEvent, render, screen } from "@testing-library/react";
import CustomModal from "../../components/Modal";
import { MapContext } from "../../context/MapContext";
import React from "react";

const countries = [
  {
    name: "brazil",
    country: "BR",
    location: {
      type: "Point",
      coordinates: [1, 2],
    },
  },
  {
    name: "italy",
    country: "IT",
    location: {
      type: "Point",
      coordinates: [3, 4],
    },
  },
];
describe("Modal component", () => {
  it("If Modal visible have been displayed correctly", () => {
    render(
      <MapContext.Provider
        value={
          {
            countriesFiltred: countries,
          } as any
        }
      >
        <CustomModal isVisible={true} setIsVisible={jest.fn()} />
      </MapContext.Provider>
    );
    expect(screen.getByText(/Países selecionados/i)).toBeInTheDocument();
    expect(screen.getByText(/brazil/i)).toBeInTheDocument();
    expect(screen.getByText(/italy/i)).toBeInTheDocument();
    expect(screen.getByText("BR")).toBeInTheDocument();
    expect(screen.getByText("IT")).toBeInTheDocument();

    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/3/i)).toBeInTheDocument();
    expect(screen.getByText(/4/i)).toBeInTheDocument();
  });

  it("If Modal close button have been called correctly", () => {
    const setIsVisibleMocked = jest.fn();

    render(
      <MapContext.Provider
        value={
          {
            countriesFiltred: countries,
          } as any
        }
      >
        <CustomModal isVisible={true} setIsVisible={setIsVisibleMocked} />
      </MapContext.Provider>
    );

    fireEvent.click(screen.getByText("Close"));
    expect(setIsVisibleMocked).toHaveBeenCalled();
  });

  it("If Modal unvisible have been displayed correctly", () => {
    render(
      <MapContext.Provider
        value={
          {
            countriesFiltred: countries,
          } as any
        }
      >
        <CustomModal isVisible={false} setIsVisible={jest.fn()} />
      </MapContext.Provider>
    );
    expect(screen.queryByText("Países selecionados")).toBeNull();
  });
});
