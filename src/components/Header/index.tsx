import { Box, Button, HStack, Image, Spacer } from "@chakra-ui/react";
import { useMapContext } from "../../context/MapContext";
import SendButton from "../SendButton";
import { GrCircleInformation } from "react-icons/gr";
import CustomModal from "../Modal";
import { useState } from "react";

export default function Header() {
  const { getFiltredCountries, polygonMarkers } = useMapContext();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onsubmit() {
    setIsLoading(true);
    if ((await getFiltredCountries()) == 200) {
      setModalIsVisible(true);
    }
    setIsLoading(false);
  }

  return (
    <>
      <HStack
        borderBottom="1px solid #ddd"
        h="17%"
        w="100%"
        paddingY="1rem"
        paddingX="1rem"
        bg="linear-gradient(180deg, #FFFFFF 0%, #DEDEDE 100%)"
      >
        <Image src="./logo.svg" />
        <Spacer />


        <Box marginRight="2rem">
          <SendButton
            disabled={polygonMarkers.length <= 3}
            onClick={onsubmit}
            title="Selecionar"
            isLoading={isLoading}
          />
        </Box>
      </HStack>

      <CustomModal
        setIsVisible={setModalIsVisible}
        isVisible={modalIsVisible}
      />
    </>
  );
}
