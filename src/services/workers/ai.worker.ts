import { Chess } from "chess.js"
import { findBestMove } from "../Ai"

self.onmessage = (e: MessageEvent<string>) => {
    console.log('AI...')
    const { fen } = JSON.parse(e.data) 

    const game = new Chess(fen)

    const move = findBestMove(game);

    self.postMessage(move)
}

