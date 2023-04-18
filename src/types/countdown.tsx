export type CountdownTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  miliseconds: number;
  completed: boolean;
};

export type CountdownTimeFn = (time: CountdownTime) => void;

export type CountdownTimeFormatOptions = {
  dayInHours?: boolean;
  zeroPadTime?: number;
  zeroPadDays?: number;
}

export type CountdownTimeFormatted = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

export type CountdownState = {
  timeLeft: CountdownTime;
  status: "started" | "paused" | "stopped" | "completed";
}

export type CountdownTimeOptions = {
  offsetTime: number;
}