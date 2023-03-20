import { Square } from "chess.js";

export type Piece =
  | "bN"
  | "bB"
  | "bQ"
  | "bK"
  | "bR"
  | "bP"
  | "wN"
  | "wB"
  | "wQ"
  | "wK"
  | "wR"
  | "wP";

export type BoardPosition = { [sq in Square]?: Piece };

export type Coord = {
  row: number;
  col: number;
};

export type Dimession = {
  width: number;
  height: number;
};

export type BoardOrientation = "w" | "b";

export type MoveMethod = "dc" | "d" | "c";

export type Coordinate = "none" | "inside" | "outside";

export type SquareColor = "green" | "bases";

export type SquareInfo = Coord & { color: "w" | "b" };

export type SquareStatus =
  | "default"
  | "over"
  | "highlight"
  | "premove"
  | "legal"
  | "check";

export type SquareStyle = {
  [prop in
    | "default.light"
    | "default.dark"
    | "over"
    | "highlight"
    | "premove:light"
    | "premove:dark"]: string;
};

export type Premove = {
  source: Square;
  target: Square;
  piece: Piece;
};

export type CustomSquare = {
  square: Square;
  row: number;
  col: number;
};

export type HighlightSquare = CustomSquare & {
  type: "left" | "right" | "premove" | "king:check";
  color: "w" | "b";
};

export type HintMove = CustomSquare & {
  type: "hint" | "capture";
};

export type KingSquare = CustomSquare;

export type Setting = {
  squareColor: SquareColor;
  coordinate: Coordinate;
  moveMethod: MoveMethod;
  enablePremove: boolean;
  showHintMove: boolean;
  showHighlightMove: boolean;
};
