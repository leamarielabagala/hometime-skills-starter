import { Button, HStack, Text } from "@chakra-ui/react";
import React from "react";

type TimerProps = {
  children: JSX.Element;
};

export default function Timer({ children }: TimerProps) {
  return children;
}

export function TimerDisplay() {
  return (
    <Text
      fontSize="7xl"
      color="gray.600"
      sx={{
        fontVariantNumeric: "tabular-nums"
      }}
    >
      0:00:0
    </Text>
  );
}

export function TimerControls() {
  return (
    <HStack>
      <Button colorScheme="green">Start</Button>
      <Button colorScheme="red">Pause</Button>
      <Button>Reset</Button>
    </HStack>
  );
}
