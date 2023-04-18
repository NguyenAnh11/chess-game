import { useState } from "react";
import {
  CountdownState,
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
  ...props
}: CountdownProps) {
  const [countdown, setCountdown] = useState<CountdownState>(() => {
    const timeLeft = calcTimeLeft(props.date);
    return {
      timeLeft,
      status: timeLeft.completed ? "completed" : "stopped"
    };
  });

  const isStarted = () => countdown.status === "started";

  const isPaused = () => countdown.status === "paused";

  const isStopped = () => countdown.status === "stopped";

  const start = () => {};

  const pause = () => {};

  const stop = () => {};

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
