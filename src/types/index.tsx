import { Square } from "chess.js";

export type Piece =
  | "bn"
  | "bb"
  | "bq"
  | "bk"
  | "br"
  | "bp"
  | "wn"
  | "wb"
  | "wq"
  | "wk"
  | "wr"
  | "wp";

export type BoardPosition = { [sq in Square]?: Piece };

export type Coord = {
  x: number;
  y: number;
};

export type Dimession = { 
  width: number;
  height: number;
}

export type BoardOrientation = "w" | "b";

export type BoardColor = "green";

export type MoveMethod = "dc" | "d" | "c";

export type Coordinate = "none" | "inside" | "outside";

export type PieceColor = "neo" | "neo_wood";

export type Turn = "w" | "b";

export interface IPieceColorOption {
  label: string;
  value: PieceColor;
  pieces: { [c in Piece]: string };
}

export type SquareColor = "green";

export type SquareStyle = {
  [prop in
    | "default.light"
    | "default.dark"
    | "over"
    | "highlight:light"
    | "highlight:dark"
    | "premove:light"
    | "premove:dark"]: string;
};

export type Setting = {
  pieceColor: PieceColor;
  squareColor: SquareColor;
  coordinate: Coordinate;
};
