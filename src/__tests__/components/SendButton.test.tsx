import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../../components/SendButton";
import React from "react";

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
