import { Chess, Color, Move } from "chess.js";

export default class Board {
  private _game: Chess;

  constructor(game: Chess) {
    this._game = game;
  }

  public get game(): Chess {
    return this._game;
  }

  public makeMove(move: Move) {
    this.game.move({ from: move.from, to: move.to, promotion: "q" });
  }

  public undoMove() {
    this.game.undo();
  }

  public getAvailableMoves(): Move[] {
    return this.game.moves({ verbose: true });
  }

  public isCheckMate(): boolean {
    return this.game.isCheckmate();
  }

  public isStalemate(): boolean {
    return this.game.isStalemate();
  }

  public isThreefoldRepetition(): boolean {
    return this.game.isThreefoldRepetition();
  }

  public turn(): Color {
    return this.game.turn();
  }
}
