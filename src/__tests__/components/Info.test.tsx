import { render, screen } from "@testing-library/react";
import Info from "../../components/Info";

describe("Info component", () => {
  it("if Footer have been displayed correctly", () => {
    render(<Info />);

    expect(screen.getByText("Bem-vindo!")).toBeInTheDocument();

    expect(
      screen.getByText(
        /Esse projeto faz parte de um desafio proposto pela empresa/i
      )
    ).toBeInTheDocument();

    expect(screen.getByText("Instrução")).toBeInTheDocument();

    expect(
      screen.getByText(
        "Ao ativar a ferramenta de seleção de polígono, realize 2 clickes/toques no mapa para criar um novo vértice, após adicionar 3 vértices, surgirá um quadrado em cada aresta, ao clicar em um dos quadrados, um novo vértice será adicionadas o substituindo."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Para excluir basta selecionar o vértice que deseja excluir e em seguida clickar no ícone de lixeira."
      )
    ).toBeInTheDocument();
  });
});
