import { now } from "lodash";
import { Direction, TimeState, TimeValue } from "../../types";
import TimerState from "./TimerState";

export default class Timer {
  private initialTime: number;
  private innerTime: number;
  private time: number;
  private state: TimerState;
  private interval: number;
  private direction: Direction;
  private timerId: NodeJS.Timer | undefined;
  private onTick: (time: TimeValue) => void;

  constructor({
    initialTime,
    state,
    interval,
    direction,
    onTick,
  }: {
    initialTime: number;
    state: TimeState;
    interval: number;
    direction: Direction;
    onTick: (time: TimeValue) => void;
  }) {
    this.initialTime = initialTime;
    this.innerTime = now();
    this.time = initialTime;
    this.state = new TimerState({ state });
    this.interval = interval;
    this.direction = direction;
    this.timerId = undefined;
    this.onTick = onTick;
  }

  private clearTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
  }

  public start() {
    if (!this.state.setPlay()) return;
    this.clearTimer();
    this.innerTime = now();
    this.timerId = setInterval(this.tick, this.interval);
  }

  public pause() {
    if (!this.state.setPause()) return;
    this.clearTimer();
  }

  public stop() {
  }

  private tick() {
    const currentInnerTime = now();
    const delta = currentInnerTime - this.innerTime;
    switch (this.direction) {
      case "forward": {
        this.time = this.time + delta;
        this.innerTime = currentInnerTime;
        break;
      }
      case "backward": {
        this.time = this.time - delta;
        this.innerTime = currentInnerTime;

        if (this.time <= 0) {
          this.stop();
          this.time = 0
        }
      }
    }

    
  }
}
