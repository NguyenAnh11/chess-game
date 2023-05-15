export * from "./consts";
export * from "./chessboard";

export function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}