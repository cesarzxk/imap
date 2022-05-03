import {
  Button,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Grid,
  GridItem,
  Box,
} from "@chakra-ui/react";
import { useEffect } from "react";

import { useMapContext } from "../../context/MapContext";

type CustomModaltype = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

type countryType = {
  name: string;
  country: string;
  location: {
    type: string;
    coordinates: number[];
  };
};

export default function CustomModal(props: CustomModaltype) {
  const { countriesFiltred } = useMapContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (props.isVisible) {
      onOpen();
    } else {
      onClose();
    }
  }, [props.isVisible]);

  const CountryItem = ({ country }: { country: countryType }) => (
    <>
      <GridItem>{country.name}</GridItem>
      <GridItem>{country.country}</GridItem>
      <GridItem>{country.location.coordinates[1]}</GridItem>
      <GridItem>{country.location.coordinates[0]}</GridItem>
    </>
  );

  return (
    <Modal isOpen={isOpen} size="xl" onClose={() => props.setIsVisible(false)}>
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent>
        <ModalHeader>Países selecionados</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns="3fr 1fr 2fr 2fr">
            <GridItem fontWeight="bold">Nome</GridItem>
            <GridItem fontWeight="bold">Sigla</GridItem>
            <GridItem fontWeight="bold">lat</GridItem>
            <GridItem fontWeight="bold">lng</GridItem>

            {countriesFiltred?.map((country) => (
              <CountryItem key={country.name} country={country} />
            ))}
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => props.setIsVisible(false)}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
