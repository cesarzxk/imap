import { render, screen } from "@testing-library/react";
import Home from "../../pages";

jest.mock("../../containers/Footer", () => {
  return () => <div>Footer</div>;
});

jest.mock("../../containers/Header", () => {
  return () => <div>Header</div>;
});

jest.mock("next/dynamic", () =>
  jest.fn().mockImplementation(() => () => <div>Map</div>)
);

describe("Home page", () => {
  it("if Home have been displayed correctly", async () => {
    render(<Home />);
    expect(screen.getByText(/Footer/i)).toBeInTheDocument();
    expect(screen.getByText(/Header/i)).toBeInTheDocument();
    expect(screen.getByText(/Map/i)).toBeInTheDocument();
  });
});
