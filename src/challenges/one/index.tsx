import { Box, Text } from "@chakra-ui/react";
import React from "react";

function useMouseLocation(ref: React.RefObject<HTMLElement>) {
  // implement me!
}

export default function One() {
  // ❗ This our target API
  // const { x, y } = useMouseLocation(ref);

  return (
    <>
      <Box
        h="350px"
        w="full"
        bg="red.200"
        rounded="xl"
        position="relative"
        mt={6}
        _hover={{
          shadow: "lg"
        }}
      >
        <Text
          position="absolute"
          p={2}
          background="gray.600"
          rounded="md"
          color="gray.100"
          fontSize="sm"
          fontWeight="bold"
        >
          x: 0, y: 0
        </Text>
      </Box>
      <Text color="gray.500" fontSize="sm" mt="4" textAlign="center">
        Edit me at /src/challenges/one/index.tsx
      </Text>
    </>
  );
}
