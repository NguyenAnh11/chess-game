import { sortBy, omit } from "lodash";
import { Chess, Move } from "chess.js";
import { evalMove } from "./Evaluation";

type MoveValue = Move & { value: number };

export function sortMove(game: Chess, moves: Move[]): Move[] {
  let hasCheckmate = false;
  for (const move of moves) {
    if (move.flags.includes("p")) move.promotion = "q";
    game.move({ from: move.from, to: move.to, promotion: move.promotion });
    hasCheckmate = game.isCheckmate();
    game.undo();
    if (hasCheckmate) return [move];
  }

  const moveValues: MoveValue[] = moves.map((move) => ({
    ...move,
    value: evalMove(game, move),
  }));

  return sortBy(moveValues, (p) => p.value).map((p) => omit(p, ["value"]));
}
