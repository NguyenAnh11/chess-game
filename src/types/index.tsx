import { Square, PieceSymbol, Color, Move } from "chess.js";
import { ReactNode } from "react";
import { IconType } from "react-icons/lib";

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

export type BoardIndex = {
  break: number;
  step: number;
};

export type BoardDifference = {
  added: BoardPosition;
  removed: BoardPosition;
};

export type BoardPromotion = {
  show: boolean;
  waiting: boolean;
  square?: Square;
  color?: "w" | "b";
  choosedPiece?: string;
};

export type Position = {
  row: number;
  col: number;
};

export type BoardColumn = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";

export type BoardOrientation = "w" | "b";

export type MoveAction = "drop" | "click";

export type MoveMethod = "dc" | "d" | "c";

export type Coordinate = "none" | "inside" | "outside";

export type SquareColor = "green" | "bases";

export type Animation = "none" | "slow" | "medium" | "fast";

export type SquareStyle = {
  [prop in
    | "default.light"
    | "default.dark"
    | "over"
    | "highlight"
    | "suggest"
    | "premove:light"
    | "premove:dark"
    | "arrow:shift"
    | "arrow:alt"
    | "arrow:ctrl"
    | "arrow:default"]: string;
};

export type PieceColor = "neo" | "wood" | "neo_wood" | "book";

export type PieceImages = { [p in Piece]: string };

export type Premove = {
  source: Square;
  target: Square;
  piece: Piece;
};

export type ArrowColor =
  | "arrow:shift"
  | "arrow:alt"
  | "arrow:ctrl"
  | "arrow:default";

export type Arrow = {
  source: Square;
  target: Square;
  color: ArrowColor;
};

export type CustomSquare = {
  square: Square;
  row: number;
  col: number;
};

export type HighlightSquare = CustomSquare & {
  type: "left" | "right" | "premove" | "king:check" | "suggest";
  color: "w" | "b";
};

export type HintMove = CustomSquare & {
  type: "hint" | "capture";
};

export type SuggestMove = {
  move: Move | undefined;
  hidden: boolean;
  loading: boolean;
}

export type KingSquare = CustomSquare;

export type Mode = "AI" | "Multiplayer";

export type TabContent = {
  icon: IconType;
  label: string;
  component: ReactNode;
};

export type BaseSetting = {};

export type BoardSetting = BaseSetting & {
  pieceColor: PieceColor;
  squareColor: SquareColor;
  moveMethod: MoveMethod;
  animation: Animation;
  playSound: number;
  showArrow: number;
  showHintMove: number;
  highlightMove: number;
};

export type PlaySetting = BaseSetting & {
  enablePremove: number;
  alwaysPromoteToQueen: number;
  showTimestamps: number;
  confirmResignDraw: number;
};

export type PlayerInfo = {
  id: string;
  name: string;
  avatar: string;
  color: Color;
};

export type PlayerInfoGame = PlayerInfo & {
  lose: boolean;
};

export type CapturePieces = {
  [c in Color]: { [p in Exclude<PieceSymbol, "k">]: number };
};

export type Setting = {
  board: BoardSetting;
  play: PlaySetting;
};

export type SettingProps<T extends BaseSetting> = {
  setting: T;
  onChange: (key: keyof T, value: ControlValue) => void;
};

export type ControlValue = string | number;

export type ControlProps<T> = {
  name: keyof T;
  label: string;
  value: ControlValue;
  onChange: (name: keyof T, value: ControlValue) => void;
};

export type ControlSelectProps<T> = ControlProps<T> & {
  options: Option<ControlValue>[];
};

export type Option<T extends ControlValue> = {
  label: string;
  value: T;
};

export class FieldControl<T> {
  name: keyof T;
  label: string;
  value: ControlValue;
  onChange: (name: keyof T, value: ControlValue) => void;

  constructor(
    name: keyof T,
    label: string,
    value: ControlValue,
    onChange: (name: keyof T, value: ControlValue) => void
  ) {
    this.name = name;
    this.label = label;
    this.value = value;
    this.onChange = onChange;
  }
}

export class FieldSelectControl<T> extends FieldControl<T> {
  options: Option<ControlValue>[];

  constructor(
    name: keyof T,
    label: string,
    value: ControlValue,
    onChange: (name: keyof T, value: ControlValue) => void,
    options: Option<ControlValue>[]
  ) {
    super(name, label, value, onChange);
    this.options = options;
  }
}

export class FieldSwitchControl<T> extends FieldControl<T> {
  constructor(
    name: keyof T,
    label: string,
    value: ControlValue,
    onChange: (name: keyof T, value: ControlValue) => void
  ) {
    super(name, label, value, onChange);
  }
}
