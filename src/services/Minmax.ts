import { Chess, Color, Move, Piece, PieceSymbol } from "chess.js";
import { BoardPosition } from "../types";
import { PIECE_SCORES } from "../utils";

const CHECKMATE = 1000;
const STALEMATE = 0;

export const findRandomMove = (game: Chess): Move => {
  const possibleMoves = game.moves({ verbose: true });
  const randomIndex = Math.floor(Math.random() * possibleMoves.length);
  return possibleMoves[randomIndex];
};

export const findBestMove = (game: Chess) => {
  let possibleMoves = game.moves({ verbose: true });

};

function evaluateBoard(position: BoardPosition, color: Color): number {
  return Object.values(position)
    .filter((p) => p)
    .reduce((prev, piece) => {
      return (
        prev +
        (piece[0] === color ? 1 : -1) * PIECE_SCORES[piece[1] as PieceSymbol]
      );
    }, 0);
}
