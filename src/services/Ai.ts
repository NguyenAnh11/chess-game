import _ from "lodash";
import { Chess, Move } from "chess.js";
import { PIECE_SCORES } from "../utils";

const CHECKMATE = 1000;
const STALEMATE = 0;
const DEPTH = 3;

export function findBestMove(game: Chess): Move {
  const move = minMax(game, DEPTH, game.turn() === "w")[1];

  return move!;
}

function minMax(
  game: Chess,
  depth: number,
  whiteToMove: boolean
): [number, Move | undefined] {
  if (depth === 0) {
    const value = evaluateBoard(game);
    return [value, undefined];
  }

  let bestMove: Move;
  const moves = shuffle(game.moves({ verbose: true }));

  let bestScore: number = whiteToMove ? -CHECKMATE : CHECKMATE;

  for (let index = 0; index < moves.length; index++) {
    const move = moves[index];

    makeMove(game, move);

    const score = minMax(game, depth - 1, !whiteToMove)[0];

    if (whiteToMove) {
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    } else {
      if (score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    game.undo();
  }

  return [bestScore, bestMove!];
}

function makeMove(game: Chess, move: Move) {
  game.move({ from: move.from, to: move.to, promotion: move.promotion || "q" });
}

function shuffle(moves: Move[]): Move[] {
  let currentIndex = moves.length,
    randomIndex = 0;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
  }

  [moves[currentIndex], moves[randomIndex]] = [
    moves[randomIndex],
    moves[currentIndex],
  ];

  return moves;
}

function evaluateBoard(game: Chess): number {
  if (game.isStalemate()) return STALEMATE;

  if (game.isCheckmate()) {
    if (game.turn() === "w") return CHECKMATE;
    return -CHECKMATE;
  }

  const score = _.flatten(game.board()).reduce((prev, piece) => {
    if (piece) {
      const pieceMultiplier = piece.color === "w" ? 1 : -1;
      prev += pieceMultiplier * PIECE_SCORES[piece.type];
    }

    return prev;
  }, 0);

  return score;
}
