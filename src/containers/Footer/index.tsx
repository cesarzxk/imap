import { Box, HStack, Link, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

export default function Footer() {
  return (
    <VStack
      alignContent="center"
      justifyContent="center"
      w="100%"
      h="6rem"
      bg="linear-gradient(180deg, #FFFFFF 0%, #DEDEDE 100%)"
      borderTop="1px solid #ddd"
    >
      <Link href="https://github.com/cesarzxk">
        <HStack>
          <Text>Powered by </Text>
          <Box>
            <Image src="/cesarzxk.svg" alt="cesarzxk" width={110} height={36} />
          </Box>
        </HStack>
      </Link>
    </VStack>
  );
}
