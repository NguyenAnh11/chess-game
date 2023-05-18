import { Move } from "chess.js";
import Board from "./Board";

export default class TranspositionTable {
  private size: number;
  private _board: Board;
  private _hashNodes: HashNode[];

  constructor(size: number, board: Board) {
    this.size = size;
    this._board = board;
    this._hashNodes = new Array(size);
  }

  public clear() {
    this._hashNodes = new Array(this.size);
  }

  public getIndex(): number {
    return this._board.zobristKey % this.size;
  }

  public getMove(): Move {
    return this._hashNodes[this.getIndex()].move;
  }

  public getScore(): number {
    return this._hashNodes[this.getIndex()].score;
  }

  public store(depth: number, score: number, move: Move, type: NodeType): void {
    const hashNode: HashNode = new HashNode(
      this._board.zobristKey,
      depth,
      score,
      move,
      type
    );
    this._hashNodes[this.getIndex()] = hashNode;
  }

  public lookup(): HashNode {
    const hashNode = this._hashNodes[this.getIndex()];

    return hashNode;
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
