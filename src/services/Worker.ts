import { Chess } from "chess.js"
//import MinMax from "./IterativeDeepeningMinmax";
import MinMax from "./MinMax";


self.onmessage = (e: MessageEvent<string>) => {
    const { fen } = JSON.parse(e.data) 

    const game = new Chess(fen)

    const minmax = new MinMax(game);

    const move = minmax.chooseMove();

    self.postMessage(move)
}

