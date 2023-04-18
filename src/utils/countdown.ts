import { CountdownTime, CountdownTimeOptions } from "../types";

export function calcTimeLeft(date: Date | number, options: CountdownTimeOptions): CountdownTime {
    let startTime: number = date instanceof Date ? date.getTime() : date;

    startTime += options.offsetTime

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