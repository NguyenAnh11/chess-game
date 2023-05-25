import { Chess, Move } from "chess.js";
import Board from "./AI/Board";
import { evalBoard } from "./AI/Evaluation";
import { sortMove } from "./AI/MoveOrder";

export default class MinMax {
  private DEPTH: number = 3;
  private board: Board;
  constructor(game: Chess) {
    this.board = new Board(game);
  }

  public chooseMove(): Move {
    const [score, move] = this.minmax(
      this.DEPTH,
      -Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      this.board.turn() === "w"
    );

    console.log("Score: ", score);

    return move!;
  }

  private minmax(
    depth: number,
    alpha: number,
    beta: number,
    isMaximizePlayer: boolean
  ): [number, Move | undefined] {
    if (
      depth === 0 ||
      this.board.isCheckMate() ||
      this.board.isStalemate() ||
      this.board.isThreefoldRepetition()
    ) {
      const score = evalBoard(this.board.game);
      return [score, undefined];
    }

    const moves = sortMove(this.board.game, this.board.getAvailableMoves());

    let bestMove = moves[0],
      bestScore = isMaximizePlayer
        ? -Number.POSITIVE_INFINITY
        : Number.POSITIVE_INFINITY;

    if (isMaximizePlayer) {
      for (const move of moves) {
        this.board.makeMove(move);
        let score = this.minmax(depth - 1, alpha, beta, !isMaximizePlayer)[0];
        this.board.undoMove();

        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }

        alpha = Math.max(alpha, bestScore);
        if (alpha >= beta) break;
      }
    } else {
      for (const move of moves) {
        this.board.makeMove(move);
        let score = this.minmax(depth - 1, alpha, beta, !isMaximizePlayer)[0];
        this.board.undoMove();

        if (score < bestScore) {
          bestScore = score;
          bestMove = move;
        }

        beta = Math.min(beta, bestScore);
        if (beta <= alpha) break;
      }
    }

    return [bestScore, bestMove];
  }
}
