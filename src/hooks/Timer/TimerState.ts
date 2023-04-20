import { TimeState } from "../../types";

export default class TimerState {
  private state: TimeState;

  constructor({ state }: { state: TimeState }) {
    this.state = state;
  }

  public getState() {
    return this.state;
  }

  public setPlay() {
    if (this.state === "start") {
      return false;
    }

    this.state = "start";
    return true;
  }

  public setPause() {
    if (this.state === "pause") {
        return false;
    }

    this.state = "pause";
    return true;
  }
}
