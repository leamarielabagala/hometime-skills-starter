import { VStack } from "@chakra-ui/react";
import React from "react";

import Timer, { TimerDisplay, TimerControls } from "./Timer";

/* ❗ NOTE ❗
 * Do not change this file.
 *
 * This is our target public API, and it's up to you to
 * implement it the way we designed. :D
 *
 */
export default function Three() {
  return (
    <Timer>
      <VStack rounded="md" spacing={6} mt={6}>
        <TimerDisplay />
        <TimerControls />
      </VStack>
    </Timer>
  );
}
