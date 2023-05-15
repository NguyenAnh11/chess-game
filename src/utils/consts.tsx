import { PieceSymbol } from "chess.js";
import {
  SquareStyle,
  SquareColor as Sc,
  PieceColor,
  PieceImages,
  Animation,
  BoardPosition,
  BoardColumn,
} from "../types";

export const BOARD_WIDTH = 576;

export const DEFAULT_WAITTIME = 1000;

export const DEFAULT_DURATION = 15 * 60000;

export const WHITE_ROWS = [7, 6, 5, 4, 3, 2, 1, 0];

export const BLACK_ROWS = [0, 1, 2, 3, 4, 5, 6, 7];

export const WHITE_COLUMNS: { [col in BoardColumn]: number } = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
};

export const BLACK_COLUMNS: { [col in BoardColumn]: number } = {
  a: 7,
  b: 6,
  c: 5,
  d: 4,
  e: 3,
  f: 2,
  g: 1,
  h: 0,
};

export const COLUMNS = "abcdefgh".split("");

export const SQUARE_STYLE: { [color in Sc]: SquareStyle } = {
  green: {
    "default.dark": "#779952",
    "default.light": "#edeed1",
    over: "inset 0 0 1px 6px rgba(255,255,255,0.75)",
    highlight: "#ffff00",
    suggest: "#dd998b",
    "premove:dark": "#d46c51",
    "premove:light": "#ec7e6a",
    "arrow:ctrl": "#ca6c47",
    "arrow:alt": "#84d2eb",
    "arrow:shift": "#91ba47",
    "arrow:default": "#cea31f",
  },
  bases: {
    "default.dark": "#c7703c",
    "default.light": "#f0cba0",
    over: "inset 0 0 1px 6px rgba(255,255,255,0.75)",
    highlight: "#f0c963",
    suggest: "#dd998b",
    "premove:dark": "#e3634b",
    "premove:light": "#ec7761",
    "arrow:ctrl": "#ca6c47",
    "arrow:alt": "#84d2eb",
    "arrow:shift": "#91ba47",
    "arrow:default": "#cea31f",
  },
};

export const PIECE_COLOR_IMAGES: {
  [pc in PieceColor]: PieceImages;
} = {
  neo: {
    bB: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/bb.png",
    bK: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/bk.png",
    bN: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/bn.png",
    bP: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/bp.png",
    bQ: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/bq.png",
    bR: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/br.png",
    wB: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/wb.png",
    wK: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/wk.png",
    wN: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/wn.png",
    wP: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/wp.png",
    wQ: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/wq.png",
    wR: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/wr.png",
  },
  neo_wood: {
    bB: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/bb.png",
    bK: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/bk.png",
    bN: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/bn.png",
    bP: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/bp.png",
    bQ: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/bq.png",
    bR: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/br.png",
    wB: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/wb.png",
    wK: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/wk.png",
    wN: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/wn.png",
    wP: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/wp.png",
    wQ: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/wq.png",
    wR: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/wr.png",
  },
  wood: {
    bB: import.meta.env.VITE_IMAGE_PIECES_URL + "wood/150/bb.png",
    bK: import.meta.env.VITE_IMAGE_PIECES_URL + "wood/150/bk.png",
    bN: import.meta.env.VITE_IMAGE_PIECES_URL + "wood/150/bn.png",
    bP: import.meta.env.VITE_IMAGE_PIECES_URL + "wood/150/bp.png",
    bQ: import.meta.env.VITE_IMAGE_PIECES_URL + "wood/150/bq.png",
    bR: import.meta.env.VITE_IMAGE_PIECES_URL + "wood/150/br.png",
    wB: import.meta.env.VITE_IMAGE_PIECES_URL + "wood/150/wb.png",
    wK: import.meta.env.VITE_IMAGE_PIECES_URL + "wood/150/wk.png",
    wN: import.meta.env.VITE_IMAGE_PIECES_URL + "wood/150/wn.png",
    wP: import.meta.env.VITE_IMAGE_PIECES_URL + "wood/150/wp.png",
    wQ: import.meta.env.VITE_IMAGE_PIECES_URL + "wood/150/wq.png",
    wR: import.meta.env.VITE_IMAGE_PIECES_URL + "wood/150/wr.png",
  },
  book: {
    bB: import.meta.env.VITE_IMAGE_PIECES_URL + "book/150/bb.png",
    bK: import.meta.env.VITE_IMAGE_PIECES_URL + "book/150/bk.png",
    bN: import.meta.env.VITE_IMAGE_PIECES_URL + "book/150/bn.png",
    bP: import.meta.env.VITE_IMAGE_PIECES_URL + "book/150/bp.png",
    bQ: import.meta.env.VITE_IMAGE_PIECES_URL + "book/150/bq.png",
    bR: import.meta.env.VITE_IMAGE_PIECES_URL + "book/150/br.png",
    wB: import.meta.env.VITE_IMAGE_PIECES_URL + "book/150/wb.png",
    wK: import.meta.env.VITE_IMAGE_PIECES_URL + "book/150/wk.png",
    wN: import.meta.env.VITE_IMAGE_PIECES_URL + "book/150/wn.png",
    wP: import.meta.env.VITE_IMAGE_PIECES_URL + "book/150/wp.png",
    wQ: import.meta.env.VITE_IMAGE_PIECES_URL + "book/150/wq.png",
    wR: import.meta.env.VITE_IMAGE_PIECES_URL + "book/150/wr.png",
  },
};

export const ANIMATIONS: { [a in Animation]: number } = {
  none: 0,
  slow: 500,
  medium: 300,
  fast: 200,
};

export const INITIAL_BOARD_POSITION: BoardPosition = {
  a8: "bR",
  b8: "bN",
  c8: "bB",
  d8: "bQ",
  e8: "bK",
  f8: "bB",
  g8: "bN",
  h8: "bR",
  a7: "bP",
  b7: "bP",
  c7: "bP",
  d7: "bP",
  e7: "bP",
  f7: "bP",
  g7: "bP",
  h7: "bP",
  a2: "wP",
  b2: "wP",
  c2: "wP",
  d2: "wP",
  e2: "wP",
  f2: "wP",
  g2: "wP",
  h2: "wP",
  a1: "wR",
  b1: "wN",
  c1: "wB",
  d1: "wQ",
  e1: "wK",
  f1: "wB",
  g1: "wN",
  h1: "wR",
};

export const PROMOTION_PIECES = ["b", "r", "n", "q"];

export const PIECE_SCORES: { [p in PieceSymbol]: number } = {
  q: 9,
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  k: 0,
};

export const PIECE_INDEX: { [p in PieceSymbol]: number } = {
  k: 0,
  q: 1,
  b: 2,
  n: 3,
  r: 4,
  p: 5
};

export const PAWN_EVAL = [
  0,  0,  0,  0,  0,  0,  0,  0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
  5,  5, 10, 25, 25, 10,  5,  5,
  0,  0,  0, 20, 20,  0,  0,  0,
  5, -5,-10,  0,  0,-10, -5,  5,
  5, 10, 10,-20,-20, 10, 10,  5,
  0,  0,  0,  0,  0,  0,  0,  0
]

export const KNIGHT_EVAL = [
  -50,-40,-30,-30,-30,-30,-40,-50,
  -40,-20,  0,  0,  0,  0,-20,-40,
  -30,  0, 10, 15, 15, 10,  0,-30,
  -30,  5, 15, 20, 20, 15,  5,-30,
  -30,  0, 15, 20, 20, 15,  0,-30,
  -30,  5, 10, 15, 15, 10,  5,-30,
  -40,-20,  0,  5,  5,  0,-20,-40,
  -50,-40,-30,-30,-30,-30,-40,-50,
]

export const BISHOP_EVAL = [
  -20,-10,-10,-10,-10,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5, 10, 10,  5,  0,-10,
  -10,  5,  5, 10, 10,  5,  5,-10,
  -10,  0, 10, 10, 10, 10,  0,-10,
  -10, 10, 10, 10, 10, 10, 10,-10,
  -10,  5,  0,  0,  0,  0,  5,-10,
  -20,-10,-10,-10,-10,-10,-10,-20,
]

export const ROOK_EVAL = [
  0,  0,  0,  0,  0,  0,  0,  0,
  5, 10, 10, 10, 10, 10, 10,  5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  0,  0,  0,  5,  5,  0,  0,  0
]

export const QUEEN_EVAL = [
  -20,-10,-10, -5, -5,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5,  5,  5,  5,  0,-10,
  -5,  0,  5,  5,  5,  5,  0, -5,
  0,  0,  5,  5,  5,  5,  0, -5,
  -10,  5,  5,  5,  5,  5,  0,-10,
  -10,  0,  5,  0,  0,  0,  0,-10,
  -20,-10,-10, -5, -5,-10,-10,-20
]

export const KING_EVAL = [
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -20,-30,-30,-40,-40,-30,-30,-20,
  -10,-20,-20,-20,-20,-20,-20,-10,
  20, 20,  0,  0,  0,  0, 20, 20,
  20, 30, 10,  0,  0, 10, 30, 20
]

export const KING_ENDGAME_EVAL = [
  -50, -40, -30, -20, -20, -30, -40, -50,
  -30, -20, -10,  0,  0, -10, -20, -30,
  -30, -10, 20, 30, 30, 20, -10, -30,
  -30, -10, 30, 40, 40, 30, -10, -30,
  -30, -10, 30, 40, 40, 30, -10, -30,
  -30, -10, 20, 30, 30, 20, -10, -30,
  -30, -30,  0,  0,  0,  0, -30, -30,
  50, -30, -30, -30, -30, -30, -30, -50,
]