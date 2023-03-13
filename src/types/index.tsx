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

export type SquareColor = "green";

export type SquareStatus =
  | "default"
  | "over"
  | "highlight"
  | "premove"
  | "legal";

export type SquareStyle = {
  [prop in
    | "default.light"
    | "default.dark"
    | "over"
    | "highlight"
    | "premove:light"
    | "premove:dark"
    | "legal:light"
    | "legal:dark"]: string;
};

export type PromotionPiece = "n" | "b" | "q" | "r";

export type Setting = {
  squareColor: SquareColor;
  coordinate: Coordinate;
  moveMethod: MoveMethod;
  showLegalMove: boolean;
  enablePremove: boolean;
  showHighlightMove: boolean;
};
