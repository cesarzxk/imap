import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from ".";
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
describe("SendButton component", () => {
  it("If SendButton enabled have been displayed correctly", () => {
    render(<Button onClick={() => {}} title="test" isLoading={false} />);

    expect(screen.getByText("TEST")).toBeInTheDocument();
  });

  it("If SendButton have been called correctly", () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick} title="test" isLoading={false} />);
    fireEvent.click(screen.getByText("TEST"));
    expect(onClick).toHaveBeenCalled();
  });

  it("If SendButton disabled have been displayed correctly", () => {
    render(<Button onClick={() => {}} title="test" isLoading={true} />);

    expect(screen.getByTestId("loadingButton")).toBeInTheDocument();
  });
});
