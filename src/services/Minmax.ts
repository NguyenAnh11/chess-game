import _ from "lodash";
import { Chess, Move } from "chess.js";
import { PIECE_SCORES } from "../utils";

const CHECKMATE = 1000;
const STALEMATE = 0;

export const findRandomMove = (game: Chess): Move => {
  const possibleMoves = game.moves({ verbose: true });
  const randomIndex = Math.floor(Math.random() * possibleMoves.length);
  return possibleMoves[randomIndex];
};

export const findBestMove = (game: Chess): Move => {
  const turn = game.turn();
  const turnMultiiplier = turn === "w" ? 1 : -1;
  let bestMove: Move

  if (turn === "w") {
    let minMaxScore = -CHECKMATE;
    const moves = shuffle(game.moves({ verbose: true }));
    for (const move of moves) {
      makeMove(game, move);

      const opponentMoves = game.moves({ verbose: true });

      let opponentMaxScore = CHECKMATE;

      for (const opponentMove of opponentMoves) {
        makeMove(game, opponentMove);

        let score = 0;
        if (game.isCheckmate()) score = -turnMultiiplier * CHECKMATE;
        else if (game.isStalemate() || game.isDraw()) score = STALEMATE;
        else score = -turnMultiiplier * evaluateBoard(game);
        if (score < opponentMaxScore) {
          opponentMaxScore = score;
        }

        game.undo();
      }

      if (opponentMaxScore > minMaxScore) {
        minMaxScore = opponentMaxScore;
        bestMove = move
      }

      game.undo();
    }

    return bestMove!
  }

  return findRandomMove(game)
};

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
  let value = 0;

  game.board().forEach((row) => {
    row.forEach((piece) => {
      if (piece) {
        value += (piece.color === "w" ? 1 : -1) * PIECE_SCORES[piece.type];
      }
    });
  });

  return value;
}
