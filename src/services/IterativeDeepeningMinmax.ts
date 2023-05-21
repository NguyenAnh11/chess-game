import { Chess, Move } from "chess.js";
import Board from "./AI/Board";
import { evalBoard } from "./AI/Evaluation";
import { sortMove } from "./AI/MoveOrder";

export default class MinMax {
  private TIMEOUT_MILISECONDS: number = 60000;
  private DEPTH: number = 3;
  private board: Board;

  private cutoff!: boolean;

  constructor(game: Chess) {
    this.board = new Board(game);
  }

  public chooseMove(): Move {
    const isMaximisingPlayer = this.board.turn() === "w";

    let bestScore = isMaximisingPlayer
      ? -Number.POSITIVE_INFINITY
      : Number.POSITIVE_INFINITY;

    const moves = sortMove(this.board.game, this.board.getAvailableMoves());
    let bestMove = moves[0];

    const timeLimit = Math.floor(this.TIMEOUT_MILISECONDS / moves.length);

    for (const move of moves) {
      //make move
      this.board.makeMove(move);
      //score
      let score = this.iterativeDeepeningSearch(!isMaximisingPlayer, timeLimit);

      this.board.undoMove();

      if (
        (isMaximisingPlayer && score >= Number.POSITIVE_INFINITY) ||
        (!isMaximisingPlayer && score <= -Number.POSITIVE_INFINITY)
      )
        return move;

      if (isMaximisingPlayer && score >= bestScore) {
        bestScore = score;
        bestMove = move;
      } else if (!isMaximisingPlayer && score <= bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return bestMove;
  }

  public iterativeDeepeningSearch(
    isMaximisingPlayer: boolean,
    timeLimit: number
  ): number {
    this.cutoff = false;
    const startTime = Date.now();
    const endTime = startTime + timeLimit;
    let depth = 0,
      score = 0;
    while (true) {
      const currentTime = Date.now();

      if (currentTime >= endTime) break;

      if (depth === this.DEPTH - 1) break;

      let value = this.search(
        depth,
        -Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        isMaximisingPlayer,
        currentTime,
        endTime - currentTime
      );

      //if the search find a wining move, stop search
      if (
        (isMaximisingPlayer && value <= -Number.POSITIVE_INFINITY) ||
        (!isMaximisingPlayer && value >= Number.POSITIVE_INFINITY)
      ) {
        console.log('Checkmate....')
        break;
      }
      if (!this.cutoff) score = value;

      depth += 1;
    }

    return score;
  }

  private search(
    depth: number,
    alpha: number,
    beta: number,
    isMaximisingPlayer: boolean,
    startTime: number,
    timeLeft: number
  ): number {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    if (elapsedTime >= timeLeft) {
      console.log('Cut off')
      this.cutoff = true;
    }

    console.log('Depth: ', depth)

    //posible moves
    const moves = sortMove(this.board.game, this.board.getAvailableMoves());

    //evaluate board to get score
    const score = evalBoard(this.board.game);

    // if this is terminal node, a win for either player or abort search
    if (
      depth === 0 ||
      this.cutoff === true ||
      moves.length === 0 ||
      score >= Number.POSITIVE_INFINITY ||
      score <= -Number.POSITIVE_INFINITY
    ) {
      console.log('Score: ', score)
      return score;
    }

    if (isMaximisingPlayer) {
      for (const move of moves) {
        //make move
        this.board.makeMove(move);

        alpha = Math.max(
          alpha,
          this.search(
            depth - 1,
            alpha,
            beta,
            !isMaximisingPlayer,
            startTime,
            timeLeft
          )
        );

        console.log('Alpha: ', alpha);
        //undo move
        this.board.undoMove();

        if (beta <= alpha) {
          console.log('Pruning..');
          break;
        }
      }

      return alpha;
    }

    for (const move of moves) {
      //make move
      this.board.makeMove(move);

      beta = Math.min(
        beta,
        this.search(
          depth - 1,
          alpha,
          beta,
          !isMaximisingPlayer,
          startTime,
          timeLeft
        )
      );
      //undo move
      this.board.undoMove();

      console.log('Beta: ', beta);

      if (beta <= alpha) {
        console.log('Pruning..');
        break;
      }
    }

    return beta;
  }
}
