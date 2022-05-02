import { act, fireEvent, render, screen } from "@testing-library/react";
import Header from "../../containers/Header";
import { MapContext } from "../../context/MapContext";

jest.mock("../../components/Modal", () => {
  return () => <div>Modal</div>;
});

jest.mock("../../components/Info", () => {
  return () => <div>Info</div>;
});

jest.mock("../../components/Warnning", () => {
  return () => <div>Warnning</div>;
});

describe("Header container", () => {
  it("if Header have been displayed correctly", () => {
    render(
      <MapContext.Provider
        value={{ getFiltredCountries: jest.fn(), polygonMarkers: [] } as any}
      >
        <Header />
      </MapContext.Provider>
    );
    expect(screen.getByText(/Modal/i)).toBeInTheDocument();
    expect(screen.getByText(/Info/i)).toBeInTheDocument();
    expect(screen.getByText(/Warnning/i)).toBeInTheDocument();
    expect(screen.getByText(/SELECIONAR/i)).toBeInTheDocument();
  });

  it("if getFiltredCountries have been called correctly", async () => {
    const getFiltredCountriesMocked = jest.fn().mockResolvedValue(200);
    render(
      <MapContext.Provider
        value={
          {
            getFiltredCountries: getFiltredCountriesMocked,
            polygonMarkers: [1, 2, 3, 4],
          } as any
        }
      >
        <Header />
      </MapContext.Provider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText(/SELECIONAR/i));
    });

    expect(getFiltredCountriesMocked).toHaveBeenCalled();
  });
});
