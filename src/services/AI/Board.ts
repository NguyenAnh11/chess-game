import { Chess } from "chess.js";

export default class Board {
    private _game: Chess;
    private _zobristKey!: number;
    
    constructor(game: Chess) {
        this._game = game;
    }

    public get zobristKey(): number {
        return this._zobristKey;
    }
}