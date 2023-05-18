import { Chess, Move } from "chess.js";
import { evaluateBoard } from "./AI/Evaluation";

export default class Search {
  private CHECKMATE: number = 10000;
  private STALEMATE: number = 0;
  private DEPTH: number = 2;
  private TIMEOUT_MILISECONDS: number = 6000;

  private game: Chess;
  private start: number;
  private timeout: boolean;
  private bestMove!: Move;
  private globalMove!: Move;
  private currentDepth!: number;

  constructor(game: Chess) {
    this.game = game;
    this.start = 0;
    this.timeout = false;
  }

  private makeMove(move: Move) {
    this.game.move({ from: move.from, to: move.to, promotion: "q" });
  }

  private undoMove() {
    this.game.undo();
  }

  public search(): Move {
    this.currentDepth = 2;

    const turn = this.game.turn();

    if (turn === "b")
      this.minimizer(this.currentDepth, -this.CHECKMATE, this.CHECKMATE);
    else this.maximizer(this.currentDepth, -this.CHECKMATE, this.CHECKMATE);

    return this.bestMove;
  }

  public interativeDeepeningSearch(): Move {
    this.timeout = false;
    this.start = Date.now();
    const turn = this.game.turn();
    const moves = this.game.moves({ verbose: true });
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    this.globalMove = randomMove;

    for (let depth = 0; depth < this.DEPTH; depth++) {
      if (depth > 0) {
        this.globalMove = this.bestMove;
        console.log(
          `Completed search with depth: ${this.currentDepth}.\nBest move: ${this.globalMove}`
        );
      }

      this.currentDepth = depth + 1;
      if (turn === "w")
        this.maximizer(this.currentDepth, -this.CHECKMATE, this.CHECKMATE);
      else this.minimizer(this.currentDepth, -this.CHECKMATE, this.CHECKMATE);

      if (this.timeout) {
        console.log("\n");
        return this.globalMove;
      }
    }

    return this.globalMove;
  }

  private maximizer(depth: number, alpha: number, beta: number): number {
    if (this.start !== 0 && Date.now() - this.start > this.TIMEOUT_MILISECONDS) {
      this.timeout = true;
      return alpha;
    }

    if (this.game.isCheckmate()) return -this.CHECKMATE;

    if (
      this.game.isStalemate() ||
      this.game.isInsufficientMaterial() ||
      this.game.isThreefoldRepetition()
    )
      return this.STALEMATE;

    if (depth === 0) return evaluateBoard(this.game);

    const moves = this.game.moves({ verbose: true });
    for (const move of moves) {
      this.makeMove(move);

      let rating = this.minimizer(depth - 1, alpha, beta);

      this.undoMove();
      if (rating > alpha) {
        alpha = rating;
        if (depth === this.currentDepth) {
          this.bestMove = move;
        }
      }

      if (alpha >= beta) return alpha;
    }

    return alpha;
  }

  private minimizer(depth: number, alpha: number, beta: number): number {
    if (this.start !== 0 && Date.now() - this.start > this.TIMEOUT_MILISECONDS) {
      this.timeout = true;
      return alpha;
    }

    if (this.game.isCheckmate()) return this.CHECKMATE;

    if (
      this.game.isStalemate() ||
      this.game.isThreefoldRepetition() ||
      this.game.isInsufficientMaterial()
    )
      return this.STALEMATE;

    if (depth === 0) return evaluateBoard(this.game);
    const moves = this.game.moves({ verbose: true });
    for (const move of moves) {
      this.makeMove(move);

      let rating = this.maximizer(depth - 1, alpha, beta);

      this.undoMove();
      if (rating < beta) {
        beta = rating;
        if (depth === this.currentDepth) {
          this.bestMove = move;
        }
      }

      if (alpha >= beta) return beta;
    }

    return beta;
  }
}
