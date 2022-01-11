import React, { useContext } from "react";
import { Button, HStack, Text } from "@chakra-ui/react";
import { TimerProvider, TimerContext } from "./context";

type TimerProps = {
  children: JSX.Element;
};

export default function Timer({ children }: TimerProps) {
  return (
    <TimerProvider>{children}</TimerProvider>
  );
}

const getTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.round((seconds % 60) * 10) / 10;
  const milli = secs % 1;

  const formatValue = (value: number) => {
    const str = `${Math.floor(value)}`;
    if (str.length === 1) return `0${str}`;
    if (str === '60') return '00';
    return str;
  };

  return {
    minutes: formatValue(mins),
    seconds: formatValue(secs),
    milliseconds: (`${milli}`.split('.')[1] || '0').charAt(0),
  }
};

export function TimerDisplay() {
  const [{ elapsedTime }] = useContext(TimerContext);
  const { minutes, seconds, milliseconds } = getTime(elapsedTime);
  return (
    <Text
      fontSize="7xl"
      color="gray.600"
      sx={{
        fontVariantNumeric: "tabular-nums"
      }}
    >
      {minutes}:{seconds}:{milliseconds}
    </Text>
  );
}

export function TimerControls() {
  const [{ elapsedTime, isRunning }, { startTimer, pauseTimer, resetTimer }] = useContext(TimerContext)
  return (
    <HStack>
      { isRunning ?
        <Button colorScheme="red" onClick={pauseTimer}>Pause</Button> :
        <Button colorScheme="green" onClick={startTimer}>Start</Button> }
      { elapsedTime > 0 && <Button onClick={resetTimer}>Reset</Button> }
    </HStack>
  );
}
