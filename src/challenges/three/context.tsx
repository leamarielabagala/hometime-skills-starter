import React, { createContext, useState, useEffect } from "react";

export type TimerContextProps = [
  {
    elapsedTime: number,
    isRunning: boolean
  },
  {
    resetTimer: () => void,
    startTimer: () => void,
    pauseTimer: () => void
  }
]

export const TimerContext =
  createContext<TimerContextProps>([
    { elapsedTime: 0, isRunning: false },
    {
      resetTimer: () => {},
      startTimer: () => {},
      pauseTimer: () => {},
    }
  ])

export const TimerProvider: React.FC = ({
  children,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(
        () => setElapsedTime((prevElapsedTime) => prevElapsedTime + 0.1),
        100
      );
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  return (
    <TimerContext.Provider
      value={[
        { elapsedTime, isRunning },
        {
          resetTimer: () => handleReset(),
          startTimer: () => setIsRunning(true),
          pauseTimer: () => setIsRunning(false),
        }
      ]}
    >
      {children}
    </TimerContext.Provider>
  )
}
