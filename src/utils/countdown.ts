import { CountdownTime } from "../types";

export function calcTimeLeft(date: Date | number): CountdownTime {
    let startTime: number = date instanceof Date ? date.getTime() : date;
    const timeLeft = startTime - Date.now();
    const seconds = timeLeft / 1000
    return {
        days: Math.floor(seconds / (3600 * 24)),
        hours: Math.floor((seconds / 3600) % 24),
        minutes: Math.floor((seconds / 60) % 60),
        seconds: Math.floor(seconds % 60),
        miliseconds: Number(((seconds % 1) * 1000).toFixed()),
        completed: timeLeft <= 0
    }
}