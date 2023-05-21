import { Chess, Move } from "chess.js";
import Board from "./AI/Board";
import { evalBoard } from "./AI/Evaluation";
import { sortMove } from "./AI/MoveOrder";

export default class MinMax {
  private DEPTH: number = 4;
  private board: Board;
  constructor(game: Chess) {
    this.board = new Board(game);
  }

  public chooseMove(): Move {
    const move = this.minmaxRoot(this.DEPTH);
    return move;
  }

  private minmaxRoot(depth: number): Move {
    const maximize = this.board.turn() === "w";
    let bestScore = maximize
      ? -Number.POSITIVE_INFINITY
      : Number.POSITIVE_INFINITY;

    const moves = sortMove(this.board.game, this.board.getAvailableMoves());
    let bestMove = moves[0];

    for (const move of moves) {
      this.board.makeMove(move);
      let score = this.minmax(
        depth - 1,
        -Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        !maximize
      );
      this.board.undoMove();
      if (maximize) {
        if (score >= bestScore) {
          bestScore = score;
          bestMove = move;
        }
      } else {
        if (score <= bestScore) {
          bestScore = score;
          bestMove = move;
        }
      }
    }

    return bestMove;
  }

  private minmax(
    depth: number,
    alpha: number,
    beta: number,
    isMaximisingPlayer: boolean
  ): number {
    let score = evalBoard(this.board.game);

    console.log("Depth: ", depth);

    const moves = sortMove(this.board.game, this.board.getAvailableMoves());

    if (
      depth === 0 ||
      moves.length === 0 ||
      depth >= Number.POSITIVE_INFINITY ||
      depth <= -Number.POSITIVE_INFINITY
    ) {
      return score;
    }

    let bestScore = isMaximisingPlayer
      ? -Number.POSITIVE_INFINITY
      : Number.POSITIVE_INFINITY;
    for (const move of moves) {
      this.board.makeMove(move);
      let score = this.minmax(depth - 1, alpha, bestScore, !isMaximisingPlayer);
      this.board.undoMove();
      if (isMaximisingPlayer) {
        bestScore = Math.max(bestScore, score);
        alpha = Math.max(alpha, bestScore);
      } else {
        bestScore = Math.min(bestScore, score);
        beta = Math.min(beta, bestScore);
      }
      if (beta <= alpha) {
        console.log("Pruning...");
        break;
      }
    }

    return bestScore;
  }
}
