import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from ".";

describe("Footer container", () => {
  it("If Footer have been displayed correctly", () => {
    render(<Footer />);
    expect(screen.getByText(/Powered by/i)).toBeInTheDocument();
  });
});
