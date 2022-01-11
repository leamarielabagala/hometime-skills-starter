import React, { useRef } from "react";
import { Box, Text } from "@chakra-ui/react";
import useMouseLocation from "./hooks";

export default function One() {
  const ref = useRef(null);
  // ❗ This our target API
  const { x, y, elementWidth, elementHeight } = useMouseLocation(ref);

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
        ref={ref}
      >
        { !!(x && y) &&
          <Text
            position="absolute"
            p={2}
            background="gray.600"
            rounded="md"
            color="gray.100"
            fontSize="sm"
            fontWeight="bold"
            style={{
              top: `${y && y > (elementHeight || 0) ? elementHeight : y}px`,
              left: `${x && x > (elementWidth || 0) ? elementWidth : x}px`,
            }}
          >
            x: {x}, y: {y}
          </Text> }
      </Box>
    </>
  );
}
