import { flatMap } from "lodash";
import { Chess, Square, PieceSymbol, Color, Move } from "chess.js";
import { BoardColumn } from "../../types";
import {
  BISHOP_EVAL,
  KING_ENDGAME_EVAL,
  KING_EVAL,
  KNIGHT_EVAL,
  PAWN_EVAL,
  PIECE_SCORES,
  QUEEN_EVAL,
  ROOK_EVAL,
  WHITE_ROWS,
  WHITE_COLUMNS,
  PAWN_EVAL_BLACK,
  KING_EVAL_BLACK,
  BISHOP_EVAL_BLACK,
  ROOK_EVAL_BLACK,
  QUEEN_EVAL_BLACK,
  KING_ENDGAME_EVAL_BLACK,
  KNIGHT_EVAL_BLACK,
} from "../../utils";

function checkIsEndGame(game: Chess): boolean {
  let queens = 0,
    minors = 0;
  const cells = flatMap(game.board());

  for (const cell of cells) {
    if (cell) {
      const piece = cell.type;
      if (piece === "q") queens += 1;
      if (piece === "b" || piece === "n") minors += 1;
    }
  }

  return queens === 0 || (queens === 2 && minors <= 1);
}

function isGameFinished(game: Chess) {
  return (
    game.isStalemate() ||
    game.isInsufficientMaterial() ||
    game.isThreefoldRepetition()
  );
}

function getPieceScore(type: PieceSymbol): number {
  return PIECE_SCORES[type] * 100;
}

function evalMaterial(game: Chess) {
  const cells = flatMap(game.board());

  let score = 0;
  for (const cell of cells) {
    if (cell) {
      const value = getPieceScore(cell.type);
      const perspective = cell.color === "w" ? 1 : -1;
      score += perspective * value;
    }
  }

  return score;
}

function evalPiece(
  piece: PieceSymbol,
  square: Square,
  color: Color,
  isEndGame: boolean
): number {
  const col = WHITE_COLUMNS[square[0] as BoardColumn];
  const row = WHITE_ROWS[parseInt(square[1]) - 1];

  const index = row * 8 + col;
  let mapping = [];

  switch (piece) {
    case "p":
      mapping = color === "w" ? PAWN_EVAL : PAWN_EVAL_BLACK;
      break;
    case "n":
      mapping = color === "w" ? KNIGHT_EVAL : KNIGHT_EVAL_BLACK;
      break;
    case "b":
      mapping = color === "w" ? BISHOP_EVAL : BISHOP_EVAL_BLACK;
      break;
    case "r":
      mapping = color === "w" ? ROOK_EVAL : ROOK_EVAL_BLACK;
      break;
    case "q":
      mapping = color === "w" ? QUEEN_EVAL : QUEEN_EVAL_BLACK;
      break;
    case "k":
      mapping = isEndGame
        ? color === "w"
          ? KING_ENDGAME_EVAL
          : KING_ENDGAME_EVAL_BLACK
        : color === "w"
        ? KING_EVAL
        : KING_EVAL_BLACK;
      break;
  }

  return mapping[index];
}

function evalPlacement(game: Chess) {
  const isEndGame = checkIsEndGame(game);

  const cells = flatMap(game.board());

  let score = 0;
  for (const cell of cells) {
    if (cell) {
      score += evalPiece(cell.type, cell.square, cell.color, isEndGame);
    }
  }

  return score;
}

function evalCapture(game: Chess, move: Move): number {
  if (move.flags.includes("e")) return getPieceScore("p");

  const pieceFrom = game.get(move.from);
  const pieceTo = game.get(move.to);

  if (!pieceFrom || !pieceTo) throw new Error("invalid capture");

  return getPieceScore(pieceTo.type) - getPieceScore(pieceFrom.type);
}

export function evalMove(game: Chess, move: Move): number {
  let moveValue: number = 0;

  const isEndGame = checkIsEndGame(game);
  const turnMultiplier = game.turn() === "w" ? 1 : -1;

  //promotion move
  if (move.flags.includes("p")) {
    return turnMultiplier * Number.POSITIVE_INFINITY;
  }

  //change move
  const pieceFromEval = evalPiece(move.piece, move.from, move.color, isEndGame);
  const pieceToEval = evalPiece(move.piece, move.to, move.color, isEndGame);
  const positionChangeValue = pieceToEval - pieceFromEval;

  //capture move
  let captureValue = 0;
  if (move.flags.includes("c") || move.flags.includes("e")) {
    captureValue = evalCapture(game, move);
  }

  moveValue = positionChangeValue + captureValue;

  return turnMultiplier * moveValue;
}

export function evalBoard(game: Chess): number {
  const maximize = game.turn() === "w";

  if (game.isCheckmate())
    return maximize ? -Number.POSITIVE_INFINITY : Number.POSITIVE_INFINITY;

  if (isGameFinished(game)) return 0;

  let score = 0;

  score += evalMaterial(game);
  score += evalPlacement(game);

  return score;
}

