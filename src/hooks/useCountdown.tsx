import { useState, useEffect, useRef } from "react";
import {
  CountdownState,
  CountdownTime,
  CountdownTimeFn,
  CountdownTimeFormatOptions,
} from "../types";
import { calcTimeLeft } from "../utils";

type CountdownProps = CountdownTimeFormatOptions & {
  date: Date | number;
  interval?: number;
  autoStart?: boolean;
  onStart?: CountdownTimeFn;
  onPause?: CountdownTimeFn;
  onStop?: CountdownTimeFn;
  onComplete: CountdownTimeFn;
  onTick?: CountdownTimeFn;
};

export default function useCountdown({
  zeroPadDays = 2,
  zeroPadTime = 2,
  autoStart = true,
  interval = 1000,
  ...props
}: CountdownProps) {
  const intervalRef = useRef<NodeJS.Timer>();

  const [offsetTime, setOffsetTime] = useState<number>(0);  

  const [countdown, setCountdown] = useState<CountdownState>(() => {
    const timeLeft = calcTimeLeft(props.date, { offsetTime });
    return {
      timeLeft,
      status: timeLeft.completed ? "completed" : "stopped"
    };
  });

  useEffect(() => {
    if (autoStart) start();
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(tick, interval);
    return () => clearInterval(intervalRef.current);
  }, [countdown])

  const isStarted = () => countdown.status === "started";

  const isPaused = () => countdown.status === "paused";

  const isStopped = () => countdown.status === "stopped";

  const clearTimmer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }

  const start = () => {
    if (isStarted()) return;


  };

  const pause = () => {
    if (isPaused()) return;
  };

  const stop = () => {
    if (isStopped()) return;
  };

  const update = (time: CountdownTime, callback?: CountdownTimeFn) => {
    
  }

  const tick = () => {};

  return {
    start,
    pause,
    stop,
    tick,
    isStarted,
    isPaused,
    isStopped
  };
}
