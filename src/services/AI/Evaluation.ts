import { flatMap, uniq } from "lodash";
import { Chess, Square, PieceSymbol, Color, Move } from "chess.js";
import { BoardColumn } from "../../types";
import {
  BISHOP_EVAL,
  KING_ENDGAME_EVAL,
  KNIGHT_EVAL,
  PAWN_EVAL,
  PIECE_SCORES,
  QUEEN_EVAL,
  ROOK_EVAL,
  WHITE_ROWS,
  WHITE_COLUMNS,
  PAWN_EVAL_BLACK,
  BISHOP_EVAL_BLACK,
  ROOK_EVAL_BLACK,
  QUEEN_EVAL_BLACK,
  KING_ENDGAME_EVAL_BLACK,
  KNIGHT_EVAL_BLACK,
  KING_EVAL,
  KING_EVAL_BLACK,
  KINGHT_PAWN_ADJUSTMENT,
  ROOK_PAWN_ADJUSTMENT,
  DUAL_BISHOP_ADJUSTMENT,
  PHASE_CONSTANT,
  PAWN_PELANTY,
} from "../../utils";

function getPieceScore(type: PieceSymbol): number {
  return PIECE_SCORES[type] * 100;
}

function getPos(square: Square) {
  const col = WHITE_COLUMNS[square[0] as BoardColumn];
  const row = WHITE_ROWS[parseInt(square[1]) - 1];
  const index = row * 8 + col;
  return index;
}

function getPieces(game: Chess, piece: PieceSymbol, color: Color) {
  const squares: Square[] = [];
  const cells = flatMap(game.board());
  for (const cell of cells) {
    if (cell !== null && cell.type === piece && cell.color === color) {
      squares.push(cell.square);
    }
  }

  return squares;
}

function getPhase(game: Chess) {
  let knightPhase = 1,
    bishopPhase = 1,
    rookPhase = 2,
    queenPhase = 4;
  const totalPhase =
    knightPhase * 4 + bishopPhase * 4 + rookPhase * 2 + queenPhase * 2;
  let phase = totalPhase;

  phase -= getPieces(game, "n", "w").length * knightPhase;
  phase -= getPieces(game, "n", "b").length * knightPhase;
  phase -= getPieces(game, "b", "w").length * bishopPhase;
  phase -= getPieces(game, "b", "b").length * bishopPhase;
  phase -= getPieces(game, "r", "w").length * rookPhase;
  phase -= getPieces(game, "r", "b").length * rookPhase;
  phase -= getPieces(game, "q", "w").length * queenPhase;
  phase -= getPieces(game, "q", "b").length * queenPhase;

  return (phase * PHASE_CONSTANT + totalPhase / 2) / totalPhase;
}

function getSquareValue(
  piece: PieceSymbol,
  square: Square,
  color: Color,
  isEndGame: boolean
): number {
  const index = getPos(square);
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

function countPieces(game: Chess, color: Color) {
  const pawnCnt = getPieces(game, "p", color).length;
  const knightCnt = getPieces(game, "n", color).length;
  const bishopCnt = getPieces(game, "b", color).length;
  const queenCnt = getPieces(game, "q", color).length;
  const rookCnt = getPieces(game, "r", color).length;

  return (
    pawnCnt * getPieceScore("p") +
    knightCnt * getPieceScore("n") +
    bishopCnt * getPieceScore("b") +
    queenCnt * getPieceScore("q") +
    rookCnt * getPieceScore("r")
  );
}

function evalCapture(game: Chess, move: Move): number {
  if (move.flags.includes("e")) return getPieceScore("p");

  const pieceFrom = game.get(move.from);
  const pieceTo = game.get(move.to);

  return getPieceScore(pieceTo.type) - getPieceScore(pieceFrom.type);
}

export function evalMove(game: Chess, move: Move): number {
  let moveValue: number = 0;

  const phase = getPhase(game);
  const turnMultiplier = game.turn() === "w" ? 1 : -1;

  //promotion move
  if (move.flags.includes("p")) {
    return turnMultiplier * Number.POSITIVE_INFINITY;
  }

  //change move
  const pieceFromEval = getSquareValue(
    move.piece,
    move.from,
    move.color,
    phase > 80
  );
  const pieceToEval = getSquareValue(
    move.piece,
    move.to,
    move.color,
    phase > 80
  );
  const positionChangeValue = pieceToEval - pieceFromEval;

  //capture move
  let captureValue = 0;
  if (move.flags.includes("c") || move.flags.includes("e")) {
    captureValue = evalCapture(game, move);
  }

  moveValue = positionChangeValue + captureValue;

  return turnMultiplier * moveValue;
}

function evalPawn(game: Chess, color: Color) {
  const pawns = getPieces(game, "p", color);
  const uniqueColumns = uniq(
    pawns.map((sq) => WHITE_COLUMNS[sq[0] as BoardColumn])
  );

  const badPawns = (pawns.length - uniqueColumns.length) * 2;
  return badPawns * PAWN_PELANTY;
}

function kingSafety(game: Chess) {
  const whiteKingSquare = getPieces(game, "k", "w")[0];
  const blackKingSquare = getPieces(game, "k", "b")[0];

  const whiteKingPos = getPos(whiteKingSquare);
  const blackKingPos = getPos(blackKingSquare);

  let whiteKingRank = whiteKingPos >> 3,
    blackKingRank = blackKingPos >> 3,
    whiteKingFile = whiteKingPos & 7,
    blackKingFile = blackKingPos & 7;

  let blackSafety = 0,
    whiteSafety = 0,
    blackAttacked = 0,
    whiteAttacked = 0,
    whiteRatio = 0,
    blackRatio = 0,
    wmat = 0,
    bmat = 0;

  const cells = flatMap(game.board());

  for (const cell of cells) {
    if (cell) {
      const cellPos = getPos(cell.square);

      const cellFile = cellPos & 7,
        cellRank = cellPos >> 3;

      const whiteDistance = Math.max(
        Math.abs(whiteKingRank - cellRank),
        Math.abs(whiteKingFile - cellFile)
      );

      const blackDistance = Math.max(
        Math.abs(blackKingRank - cellRank),
        Math.abs(blackKingFile - cellFile)
      );

      const pieceScore = PIECE_SCORES[cell.type];

      if (cell.color === "w") {
        blackAttacked += pieceScore * blackDistance;
        whiteSafety += pieceScore * whiteDistance;
        wmat += pieceScore;
      } else {
        whiteAttacked += pieceScore * whiteDistance;
        blackSafety += pieceScore * blackDistance;
        bmat += pieceScore;
      }
    }
  }

  whiteRatio = (whiteSafety - whiteAttacked) / bmat;
  blackRatio = (blackSafety - blackAttacked) / wmat;

  return blackRatio - whiteRatio
}

function isGameFinsihed(game: Chess) {
  return (
    game.isStalemate() ||
    game.isInsufficientMaterial() ||
    game.isThreefoldRepetition()
  );
}

function calculatePieceSquare(
  game: Chess,
  turn: Color,
  isEndGame: boolean
): number {
  let score = 0;

  let knightCnt = 0,
    bishopCnt = 0,
    rookCnt = 0,
    pawnCnt = 0;

  const cells = flatMap(game.board());

  for (const cell of cells) {
    if (cell !== null && cell.color === turn) {
      if (cell.type === "n") knightCnt += 1;
      if (cell.type === "b") bishopCnt += 1;
      if (cell.type === "r") rookCnt += 1;
      if (cell.type === "p") pawnCnt += 1;
      score += getSquareValue(cell.type, cell.square, cell.color, isEndGame);
    }
  }

  if (knightCnt > 0) {
    score += KINGHT_PAWN_ADJUSTMENT[pawnCnt] * knightCnt;
  }

  if (rookCnt > 0) {
    score += ROOK_PAWN_ADJUSTMENT[pawnCnt] * rookCnt;
  }

  if (bishopCnt > 1) {
    score += DUAL_BISHOP_ADJUSTMENT[pawnCnt] * bishopCnt;
  }

  return score;
}

export function evalBoard(game: Chess): number {
  if (isGameFinsihed(game)) return 0;

  if (game.isCheckmate() && game.turn() === "w")
    return -Number.POSITIVE_INFINITY;

  if (game.isCheckmate() && game.turn() === "b")
    return Number.NEGATIVE_INFINITY;

  const phase = getPhase(game);

  let score = 0;

  const whiteMaterial = countPieces(game, "w");
  const blackMaterial = countPieces(game, "b");
  const whitePieceSquare = calculatePieceSquare(game, "w", phase > 80);
  const blackPieceSquare = calculatePieceSquare(game, "b", phase > 80);
  const whitePawn = evalPawn(game, "w");
  const blackPawn = evalPawn(game, "b");
  const safety = kingSafety(game);

  score +=
    whiteMaterial -
    blackMaterial +
    whitePieceSquare +
    blackPieceSquare +
    whitePawn -
    blackPawn +
    safety

  return score;
}
