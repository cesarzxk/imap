import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  IconButton,
  Link,
  Text,
} from "@chakra-ui/react";

import { GrCircleInformation } from "react-icons/gr";

import { PopoverTrigger as OrigPopoverTrigger } from "@chakra-ui/react";

export const PopoverTriggerPached: React.FC<{ children: React.ReactNode }> =
  OrigPopoverTrigger;

export default function Info() {
  return (
    <Popover>
      <PopoverTriggerPached>
        <IconButton
          borderRadius="25"
          w="3rem"
          h="3rem"
          aria-label=""
          icon={<GrCircleInformation size={25} />}
        />
      </PopoverTriggerPached>

      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold">Bem-vindo!</PopoverHeader>
        <PopoverBody>
          <Text>
            Esse projeto faz parte de um desafio proposto pela empresa{" "}
            <Link fontWeight="bold" href="https://isket.com.br/">
              Isket
            </Link>
            , fique a vontade para testar!
          </Text>
        </PopoverBody>
        <PopoverHeader fontWeight="bold">Instrução</PopoverHeader>
        <PopoverBody>
          <Text>
            Ao ativar a ferramenta de seleção de polígono, realize 2
            clickes/toques no mapa para criar um novo vértice, após adicionar 3
            vértices, surgirá um quadrado em cada aresta, ao clicar em um dos
            quadrados, um novo vértice será adicionadas o substituindo.
          </Text>
          <br />
          <Text>
            Para excluir basta selecionar o vértice que deseja excluir e em
            seguida clickar no ícone de lixeira.
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
