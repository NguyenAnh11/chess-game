import { Move } from "chess.js";
import Board from "./AI/Board";
import { evaluateBoard } from "./AI/Evaluation";
import { getOrderMoves } from "./AI/MoveOrder";
import TranspositionTable from "./AI/TranspositionTable";

export default class Search {
  private _abortSearch!: boolean;
  private _board: Board;
  private _tt: TranspositionTable;

  private _numPositions: number;
  private _numTranspositions: number;

  constructor(board: Board) {
    this._board = board;
    this._tt = new TranspositionTable(64000, board);

    this._numPositions = 0;
    this._numTranspositions = 0;
  }

  public startSearch(depth: number, isIterative: boolean): Move | null {
    this._numPositions = 0;
    this._numTranspositions = 0;

    this._abortSearch = false;

    this._tt.clear();

    let finalDepth = 0,
      bestEval = 0;

    if (isIterative) {
      for (let i = 0; i < depth; i++) {}
    }

    return null;
  }

  private search(depth: number, alpha: number, beta: number) {
    this._numPositions += 1;

    if (this._abortSearch) return 0;

    if (depth === 0) return this.quiescenseSearch(alpha, beta);

    const moves = this._board.game.moves({ verbose: true });
    const orderMoves = getOrderMoves(this._board.game, moves);  
    let bestScore = Number.NEGATIVE_INFINITY;
    for (const move of orderMoves) {
    }
  }

  private quiescenseSearch(alpha: number, beta: number): number {
    let score = evaluateBoard(this._board.game);

    if (score >= beta) return beta;
    if (score > alpha) alpha = score;

    const captureMoves = this._board.game
      .moves({ verbose: true })
      .filter((p) => p.flags.includes("c"));

    for (const move of captureMoves) {
      this._board.makeMove(move);

      score = -this.quiescenseSearch(-beta, -alpha);

      this._board.undoMove();

      if (score >= beta) return beta;

      if (score > alpha) alpha = score;
    }

    return alpha;
  }
}
