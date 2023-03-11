import {
  PieceColor as Pc,
  IPieceColorOption,
  SquareStyle,
  SquareColor as Sc,
} from "../types";

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
  a: 8,
  b: 7,
  c: 6,
  d: 5,
  e: 4,
  f: 3,
  g: 2,
  h: 1,
};

export const COLUMNS = "abcdefgh".split("");

export const PIECE_COLOR_OPTIONS: { [m in Pc]: IPieceColorOption } = {
  neo: {
    label: "Neo",
    value: "neo",
    pieces: {
      bn: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/bn.png",
      bb: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/bb.png",
      bq: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/bq.png",
      bk: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/bk.png",
      bp: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/bp.png",
      br: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/br.png",
      wn: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/wn.png",
      wb: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/wb.png",
      wq: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/wq.png",
      wk: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/wk.png",
      wr: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/wr.png",
      wp: import.meta.env.VITE_IMAGE_PIECES_URL + "neo/150/wp.png",
    },
  },
  neo_wood: {
    label: "Neo wood",
    value: "neo_wood",
    pieces: {
      bn: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/bn.png",
      bb: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/bb.png",
      bq: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/bq.png",
      bk: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/bk.png",
      br: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/br.png",
      bp: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/bp.png",
      wn: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/wn.png",
      wb: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/wb.png",
      wq: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/wq.png",
      wk: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/wk.png",
      wr: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/wr.png",
      wp: import.meta.env.VITE_IMAGE_PIECES_URL + "neo_wood/150/wp.png",
    },
  },
};

export const SQUARE_STYLE: { [color in Sc]: SquareStyle } = {
  green: {
    "default.dark": "#779952",
    "default.light": "#edeed1",
    "over": "inset 0 0 1px 6px rgba(255,255,255,0.75)",
    "highlight:dark": "#baca2b",
    "highlight:light": "#f6f669",
    "premove:dark": "#d46c51",
    "premove:light": "#ec7e6a",
  },
};
