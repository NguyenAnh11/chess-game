import { Color, Square } from "chess.js";
import {
  BoardPosition,
  Piece,
  BoardOrientation,
  Position,
  BoardDifference,
} from "../types";
import {
  BLACK_COLUMNS,
  BLACK_ROWS,
  WHITE_COLUMNS,
  WHITE_ROWS,
  COLUMNS,
  BOARD_WIDTH,
} from "./consts";

export function getPositionDifference(
  current: BoardPosition,
  next: BoardPosition
): BoardDifference {
  const difference: BoardDifference = { added: {}, removed: {} };

  (Object.keys(current) as Array<keyof typeof current>).forEach((sq) => {
    if (current[sq] && next[sq] !== current[sq]) {
      difference.removed[sq] = current[sq];
    }
  });

  (Object.keys(next) as Array<keyof typeof next>).forEach((sq) => {
    if (next[sq] && next[sq] !== current[sq]) {
      difference.added[sq] = next[sq];
    }
  });

  return difference;
}

export function getRelativePosition(
  square: Square,
  orientation: BoardOrientation
): Position {
  const squareWidth = BOARD_WIDTH / 8;
  const pos = getPosition(square, orientation);
  const row = pos.row * squareWidth + squareWidth / 2;
  const col = pos.col * squareWidth + squareWidth / 2;
  return { row, col };
}

export function getPosition(
  square: Square,
  orientation: BoardOrientation = "w"
): Position {
  const rows = orientation === "w" ? WHITE_ROWS : BLACK_ROWS;
  const row = rows[parseInt(square[1]) - 1];
  const cols = orientation === "w" ? WHITE_COLUMNS : BLACK_COLUMNS;
  const col = cols[square[0]];
  return { row, col };
}

export function getColor(row: number, col: number): Color {
  return (row + col) % 2 === 0 ? "w" : "b";
}

export function convertFen(fen: string | BoardPosition): BoardPosition {
  if (typeof fen === "string") {
    if (!isValidFen(fen)) return {};
    fen = fen.replace(/ .+$/, "");
    const grid: BoardPosition = {};
    let rIdx = 8;
    for (const row of fen.split("/")) {
      let cIdx = 0;
      for (const col of row.split("")) {
        if (/[1-9]/.test(col)) {
          cIdx += parseInt(col);
        } else {
          const cell = toColumn(cIdx) + rIdx;
          const piece = toPiece(col);
          if (piece) grid[cell as Square] = piece as any;
          cIdx += 1;
        }
      }
      rIdx -= 1;
    }

    return grid;
  }

  return fen as BoardPosition;
}

function isValidFen(fen: string): boolean {
  fen = fen.replace(/ .+$/, "");

  fen = fen
    .replace(/8/g, "11111111")
    .replace(/7/g, "1111111")
    .replace(/6/g, "111111")
    .replace(/5/g, "11111")
    .replace(/4/g, "1111")
    .replace(/3/g, "111")
    .replace(/2/g, "11");

  const chunks = fen.split("/");
  if (chunks.length !== 8) return false;

  for (const chunk of chunks) {
    if (chunk.length !== 8 || chunk.search(/[^kqrnbpKQRNBP1]/) !== -1)
      return false;
  }

  return true;
}

function toPiece(piece: string): Piece {
  return (piece === piece.toLowerCase()
    ? "b" + piece.toUpperCase()
    : "w" + piece) as unknown as Piece;
}

function toColumn(index: number): string {
  return COLUMNS[index];
}

export function calcTimeExcute<T>(cb: () => T): { time: number; value: T } {
  const startTime = performance.now();

  const value = cb();

  const endTime = performance.now();

  return { time: endTime - startTime, value };
}
