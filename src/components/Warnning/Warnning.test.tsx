import { fireEvent, render, screen } from "@testing-library/react";
import Warnning from ".";
import "@testing-library/jest-dom";

const statusList = {
  500: {
    type: "error" as "error",
    msg: "Formato poligonal inválido, verifique se não há linhas sobrepondo linhas!",
  },
};

describe("Warnning component", () => {
  it("If Warnning displayed on status 412 is correctly", () => {
    let status = 500;
    const setStatus = (value: number) => (status = value);

    render(<Warnning status={status} setStatus={setStatus} />);

    expect(screen.getByText(statusList[500].msg)).toBeInTheDocument();
  });

  it("If Warnning close button is closed correctly", () => {
    let status = 412;
    const setStatus = (value: number) => (status = value);

    render(<Warnning status={status} setStatus={setStatus} />);

    fireEvent.click(screen.getByTestId("close"));

    expect(status).toEqual(0);
  });
});
