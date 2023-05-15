import { sortBy, omit, cloneDeep } from "lodash";
import { Chess, Move } from "chess.js";
import { evaluateMove } from "./Evaluation";

type MoveValue = Move & { value: number };

export function getOrderMoves(game: Chess, moves: Move[]): Move[] {
  const cloneGame = cloneDeep(game);

  for (const move of moves) {
    cloneGame.move({ from: move.from, to: move.to, promotion: "q" });
    if (game.isCheckmate()) {
      cloneGame.undo();
      return [move];
    }
  }

  const moveValues: MoveValue[] = moves.map((move) => ({
    ...move,
    value: evaluateMove(game, move),
  }));

  return sortBy(moveValues, (p) => p.value).map((p) => omit(p, ["value"]));
}
