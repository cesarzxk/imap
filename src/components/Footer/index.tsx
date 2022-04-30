import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function Footer() {
  return (
    <Flex
      alignContent="center"
      justifyContent="center"
      w="100%"
      marginTop="2rem"
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
    </Flex>
  );
}
