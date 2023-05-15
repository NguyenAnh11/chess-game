import { flatMap } from "lodash";
import { Chess } from "chess.js";
import {
  PIECE_INDEX,
  WHITE_ROWS,
  WHITE_COLUMNS,
  getRandomNumber,
} from "../../utils";
import { BoardColumn } from "../../types";

export default class Zobrist {
  private zobristTable!: number[][];
  private castles!: number[];
  private blackTurn!: number;

  constructor() {
    this.generateKeys();
  }

  private generateKeys() {
    const min = 0,
      max = Math.pow(2, 64);

    this.zobristTable = [];

    for (let r = 0; r < 12; r++) {
      this.zobristTable[r] = [];
      for (let c = 0; c < 64; c++) {
        this.zobristTable[r][c] = getRandomNumber(min, max);
      }
    }

    this.castles = [];
    for (let c = 0; c < 4; c++) {
      this.castles[c] = getRandomNumber(min, max);
    }

    this.blackTurn = getRandomNumber(min, max);
  }

  public getZobristKey(game: Chess): number {
    let key = 0;

    const cells = flatMap(game.board());
    for (const cell of cells) {
      if (cell) {
        const pieceIdx =
          cell.color === "w"
            ? PIECE_INDEX[cell.type]
            : PIECE_INDEX[cell.type] + 6;
        const col = WHITE_COLUMNS[cell.square[0] as BoardColumn];
        const row = WHITE_ROWS[parseInt(cell.square[1]) - 1];
        const squareIdx = row * 8 + col;
        const value = this.zobristTable[pieceIdx][squareIdx];
        key ^= value;
      }
    }

    //castiling
    const turn = game.turn();
    const histories = game.history({ verbose: true });
    const castleQueenSide = "O-O-O",
      castleKingSide = "O-O";

    if (histories.some((p) => p.san === castleKingSide && p.color === "w"))
      key ^= this.castles[0];

    if (histories.some((p) => p.san === castleQueenSide && p.color === "w"))
      key ^= this.castles[1];

    if (histories.some((p) => p.san === castleKingSide && p.color === "b"))
      key ^= this.castles[2];

    if (histories.some((p) => p.san === castleQueenSide && p.color === "b"))
      key ^= this.castles[3];

    if (turn === "b") key ^= this.blackTurn;

    return key;
  }
}
