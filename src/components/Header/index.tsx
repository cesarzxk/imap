import { HStack, Image, Spacer } from "@chakra-ui/react";

export default function Header() {
  return (
    <HStack borderBottom="1px solid" h="17%" w="100vw" padding="1rem">
      <Image marginLeft="2rem" src="./logo.svg" />
      <Spacer />
    </HStack>
  );
}
