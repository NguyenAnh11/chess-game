import {
  SquareStyle,
  SquareColor as Sc,
  Piece,
  PieceColor,
} from "../types";

export const BOARD_WIDTH = 576;

export const WHITE_ROWS = [7, 6, 5, 4, 3, 2, 1, 0];

export const BLACK_ROWS = [0, 1, 2, 3, 4, 5, 6, 7];

export const WHITE_COLUMNS: { [col: string]: number } = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
};

export const BLACK_COLUMNS: { [col: string]: number } = {
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
    "premove:dark": "#e3634b",
    "premove:light": "#ec7761",
    "arrow:ctrl": "#ca6c47",
    "arrow:alt": "#84d2eb",
    "arrow:shift": "#91ba47",
    "arrow:default": "#cea31f",
  },
};

export const PIECE_COLOR_IMAGES: { [pc in PieceColor]: { [p in Piece]: string } } = {
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
};
