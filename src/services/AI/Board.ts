import { Chess, Move } from "chess.js";
import Zobrist from "./Zobrist";

export default class Board {
    private _game: Chess;
    private _zobrist: Zobrist;
    private _zobristKey!: number;
    
    constructor(game: Chess) {
        this._game = game;
        this._zobrist = new Zobrist(this._game);
        this._zobristKey = this._zobrist.getZobristKey();
    }

    public get zobristKey(): number {
        return this._zobristKey;
    }

    public makeMove(move: Move) {

    }

    public undoMove() {
        
    }
}