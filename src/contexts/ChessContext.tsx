import { Chess, Move, Square } from "chess.js";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import {
  BoardOrientation,
  BoardPosition,
  Coordinate,
  MoveMethod,
  SquareColor as Sc,
  SquareStyle,
} from "../types";
import { SQUARE_STYLE, convertFen } from "../utils";

type ChessboardProviderProps = {
  children: React.ReactNode;
  boardWidth: number;
  squareColor: Sc;
  coordinate: Coordinate;
  orientation: BoardOrientation;
  moveMethod: MoveMethod;
  enablePremove: boolean;
  showLegalMove: boolean;
  showHighlightMove: boolean;
};

type ChessContext = {
  game: Chess;
  position: BoardPosition;
  boardWidth: number;
  turn: string;
  enablePremove: boolean;
  orientation: "w" | "b";
  coordinate: Coordinate;
  moveMethod: MoveMethod;
  squareStyle: SquareStyle;
  highlightSquares: Square[];
  legalMoves: Square[];
  onLeftClickDown: (sq: Square) => void;
  onClearSelectedSquare: () => void;
  onDropPiece: (source: Square, target: Square) => void;
};

export const ChessContext = createContext({} as ChessContext);

export const useChess = () => useContext(ChessContext);

const ChessProvider = ({
  children,
  boardWidth,
  squareColor,
  coordinate,
  orientation,
  moveMethod,
  enablePremove,
  showLegalMove,
  showHighlightMove,
}: ChessboardProviderProps) => {
  const [game, setGame] = useState(new Chess());
  const [turn, setTurn] = useState<"w" | "b">("w");
  const [position, setPosition] = useState(convertFen(game.fen()));
  const [history, setHistory] = useState<Move[]>([]);
  const [selectedSquare, setSelectedSquare] = useState<Square | undefined>(
    undefined
  );

  const onClearSelectedSquare = () => setSelectedSquare(undefined);

  const onLeftClickDown = (square: Square) => {
    if (
      game.isGameOver() ||
      game.isDraw() ||
      game.isCheckmate() ||
      (!selectedSquare && !position[square])
    )
      return;

    const sq = !selectedSquare
      ? square
      : selectedSquare === square
      ? undefined
      : null;
    if (sq !== null) {
      setSelectedSquare(sq);
      return;
    }

    try {
      const newGame = new Chess(game.fen());
      const move = newGame.move({ from: selectedSquare!, to: square });
      setHistory((prev) => [...prev, move]);
      setGame(newGame);
    } catch {
      showHighlightMove && position[square]
        ? setSelectedSquare(square)
        : setSelectedSquare(undefined);
    }
  };

  const onDropPiece = (source: Square, target: Square) => {};

  const highlightSquares = useMemo((): Square[] => {
    const moves: Square[] = [];
    if (showHighlightMove) {
      if (selectedSquare) moves.push(selectedSquare);

      const lastMove =
        history.length === 0 ? undefined : history[history.length - 1];
      if (lastMove) moves.push(lastMove.from, lastMove.to);
    }

    return moves;
  }, [selectedSquare, history, showHighlightMove]);

  const legalMoves = useMemo((): Square[] => {
    let moves: Square[] = [];
    if (showLegalMove && selectedSquare) {
      moves = game
        .moves({ square: selectedSquare, verbose: true })
        .map((p) => p.to) as Square[];
    }

    return moves;
  }, [selectedSquare, showLegalMove]);

  useEffect(() => {
    setPosition(convertFen(game.fen()));
    setSelectedSquare(undefined);
    setTurn(game.turn());
  }, [game]);

  return (
    <ChessContext.Provider
      value={{
        game,
        position,
        boardWidth,
        turn,
        enablePremove,
        orientation,
        moveMethod,
        coordinate,
        squareStyle: SQUARE_STYLE[squareColor],
        highlightSquares,
        legalMoves,
        onLeftClickDown,
        onClearSelectedSquare,
        onDropPiece,
      }}
    >
      {children}
    </ChessContext.Provider>
  );
};

export default ChessProvider;
