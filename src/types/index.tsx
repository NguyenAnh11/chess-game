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

export type PieceColor =  "neo"

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
    | "premove:dark"
    | "arrow:shift"
    | "arrow:alt"
    | "arrow:ctrl"
    | "arrow:default" ]: string;
};

export type PieceStyle = { [p in Piece]: string }

export type Premove = {
  source: Square;
  target: Square;
  piece: Piece;
};

export type ArrowColor = "arrow:shift" | "arrow:alt" | "arrow:ctrl" | "arrow:default"

export type Arrow = {
  source: Square;
  target: Square;
  color: ArrowColor
}

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
  pieceColor: PieceColor;
  squareColor: SquareColor;
  coordinate: Coordinate;
  moveMethod: MoveMethod;
  enablePremove: boolean;
  showArrow: boolean;
  showHintMove: boolean;
  showHighlightMove: boolean;
};
