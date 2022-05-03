import { useState } from "react";
import { Box, HStack, Image, Spacer } from "@chakra-ui/react";

import { useMapContext } from "../../context/MapContext";

import SendButton from "../../components/SendButton";
import CustomModal from "../../components/Modal";
import Info from "../../components/Info";
import Warnning from "../../components/Warnning";

export default function Header() {
  const { getFiltredCountries, polygonMarkers } = useMapContext();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState(0);

  async function onsubmit() {
    setIsLoading(true);
    const status = await getFiltredCountries();
    if (status == 200) {
      setModalIsVisible(true);
    }
    setRequestStatus(status);
    setIsLoading(false);
  }

  return (
    <>
      <HStack
        borderBottom="1px solid #ddd"
        h="14%"
        w="100%"
        paddingY="1rem"
        paddingX="1rem"
        bg="linear-gradient(180deg, #FFFFFF 0%, #DEDEDE 100%)"
      >
        <Image src="./logo.svg" />
        <Spacer />

        <Info />

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

      <Warnning status={requestStatus} setStatus={setRequestStatus} />
    </>
  );
}
