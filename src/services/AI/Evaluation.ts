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

function getPieceScore(type: PieceSymbol): number {
  return PIECE_SCORES[type] * 100;
}

export function evaluateBoard(game: Chess): number {
  const isEndGame = checkIsEndGame(game);
  const turnMultiplier = game.turn() === "w" ? 1 : -1;

  let score = 0;
  const cells = flatMap(game.board());
  for (const cell of cells) {
    if (cell) {
      const val =
        getPieceScore(cell.type) +
        evaluatePiece(cell.type, cell.square, cell.color, isEndGame);
      score += val * turnMultiplier;
    }
  }

  return score;
}

export function evaluatePiece(
  piece: PieceSymbol,
  square: Square,
  color: Color,
  isEndGame: boolean
): number {
  const col = WHITE_COLUMNS[square[0] as BoardColumn];
  const row = WHITE_ROWS[parseInt(square[1]) - 1];

  const index = color === "w" ? row * 8 + col : (7 - row) * col;
  let mapping = [];

  switch (piece) {
    case "p":
      mapping = PAWN_EVAL;
      break;
    case "n":
      mapping = KNIGHT_EVAL;
      break;
    case "b":
      mapping = BISHOP_EVAL;
      break;
    case "r":
      mapping = ROOK_EVAL;
      break;
    case "q":
      mapping = QUEEN_EVAL;
      break;
    case "k":
      mapping = isEndGame ? KING_ENDGAME_EVAL : KING_EVAL;
      break;
  }

  return mapping[index];
}

function evaluateCapture(game: Chess, move: Move): number {
  if (move.flags.includes("e")) return getPieceScore("p");

  const pieceFrom = game.get(move.from);
  const pieceTo = game.get(move.to);
  return getPieceScore(pieceTo.type) - getPieceScore(pieceFrom.type);
}

export function evaluateMove(game: Chess, move: Move): number {
  let moveValue: number = 0;

  const isEndGame = checkIsEndGame(game);
  const turnMultiplier = game.turn() === "w" ? 1 : -1;

  //promotion move
  if (move.flags.includes("p")) {
    return turnMultiplier * Number.POSITIVE_INFINITY;
  }

  //change move
  const pieceFromEval = evaluatePiece(
    move.piece,
    move.from,
    move.color,
    isEndGame
  );
  const pieceToEval = evaluatePiece(move.piece, move.to, move.color, isEndGame);
  const positionChangeValue = pieceToEval - pieceFromEval;

  //capture move
  let captureValue = 0;
  if (move.flags.includes("n")) {
    captureValue = evaluateCapture(game, move);
  }

  moveValue = positionChangeValue + captureValue;

  return turnMultiplier * moveValue;
}
