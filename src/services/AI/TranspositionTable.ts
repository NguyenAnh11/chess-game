import { Move } from "chess.js";
import Board from "./Board";

export default class TranspositionTable {
  private size: number;
  private board: Board;
  private hashNodes: HashNode[];

  constructor(size: number, board: Board) {
    this.size = size;
    this.board = board;
    this.hashNodes = new Array(size);
  }

  public clear() {
    this.hashNodes = new Array(this.size);
  }

  public getIndex(): number {
    return this.board.zobristKey % this.size;
  }

  public getMove(): Move {
    return this.hashNodes[this.getIndex()].move;
  }

  public getScore(): number {
    return this.hashNodes[this.getIndex()].score;
  }

  public store(depth: number, score: number, move: Move, type: NodeType): void {
    const hashNode: HashNode = new HashNode(
      this.board.zobristKey,
      depth,
      score,
      move,
      type
    );
    this.hashNodes[this.getIndex()] = hashNode;
  }

  public lookup(depth: number, alpha: number, beta: number): number {
    const hashNode = this.hashNodes[this.getIndex()];

    //Ignore if the depth of the position is greater than the one already searched
    if (
      !hashNode ||
      hashNode.depth <= depth ||
      hashNode.hash !== this.board.zobristKey
    )
      return Number.NEGATIVE_INFINITY;

    if (hashNode.type === "Exact") return hashNode.score;

    if (hashNode.type === "Upper" && hashNode.score <= alpha)
      return hashNode.score;

    if (hashNode.type === "Lower" && hashNode.score >= beta)
      return hashNode.score;

    return Number.NEGATIVE_INFINITY;
  }
}

type NodeType = "Exact" | "Lower" | "Upper";

export class HashNode {
  public hash: number;
  public depth: number;
  public score: number;
  public move: Move;
  public type: NodeType;
  constructor(
    hash: number,
    depth: number,
    score: number,
    move: Move,
    type: NodeType
  ) {
    this.hash = hash;
    this.depth = depth;
    this.score = score;
    this.move = move;
    this.type = type;
  }
}
