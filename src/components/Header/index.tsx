import { HStack, Image, Spacer } from "@chakra-ui/react";

export default function Header() {
  return (
    <HStack borderBottom="1px solid #ddd" h="17%" w="100%" paddingY="1rem">
      <Image marginLeft="2rem" src="./logo.svg" />
      <Spacer />
    </HStack>
  );
}
