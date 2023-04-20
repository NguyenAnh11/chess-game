export type TimeState = "init" | "start" | "pause" | "stop";

export type Direction = "forward" | "backward";

export type Unit = "ms" | "s" | "m" | "h" | "d";

export type TimePart = { [u in Unit]: number };

export type TimeValue = TimePart & { state: TimeState };

export type TimeFn = (time: TimePart) => any;