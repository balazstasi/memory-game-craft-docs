import { useState, useEffect } from "react";

export const useTimer = (isRunning: boolean) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const resetTimer = () => {
    setElapsedTime(0);
  };

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setElapsedTime(elapsedTime + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [elapsedTime, isRunning]);

  return [elapsedTime, resetTimer as any];
};
