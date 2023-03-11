import { Chess, Move, Square } from "chess.js";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";
import {
  BoardPosition,
  BoardOrientation,
  Coordinate,
  MoveMethod,
  PieceColor as Pc,
  Turn,
  SquareColor as Sc,
  SquareStyle,
  Coord,
  Dimession,
} from "../types";
import { SQUARE_STYLE } from "../utils/consts";
import { convertFen, makeMove } from "../utils/function";

type ChessboardProviderProps = {
  children: React.ReactNode;
  width: number;
  pieceColor: Pc;
  squareColor: Sc;
  coordinate: Coordinate;
  orientation?: BoardOrientation;
  moveMethod?: MoveMethod;
  enablePremove?: boolean;
};

type ChessContext = {
  game: Chess;
  position: BoardPosition;
  width: number;
  turn: string;
  enablePremove: boolean;
  orientation: BoardOrientation;
  coordinate: Coordinate;
  moveMethod: MoveMethod;
  pieceColor: Pc;
  squareStyle: SquareStyle;
  squareCoords: { [sq in Square]?: Coord };
  selectedSquare: Square | undefined;
  highlightSquares: Square[];
  onLeftClickDown: (sq: Square) => void;
  onClearSelectedSquare: () => void;
  setSquareCoords: Dispatch<SetStateAction<{ [sq in Square]?: Coord }>>;
  onDropPiece: (source: Square, target: Square) => void;
};

export const ChessContext = createContext({} as ChessContext);

export const useChess = () => useContext(ChessContext);

const ChessProvider = ({
  children,
  width,
  pieceColor,
  squareColor,
  coordinate,
  orientation = "w",
  moveMethod = "dc",
  enablePremove = true,
}: ChessboardProviderProps) => {
  const [game, setGame] = useState(new Chess());
  const [turn, setTurn] = useState<Turn>("w");
  const [position, setPosition] = useState(convertFen(game.fen()));
  const [selectedSquare, setSelectedSquare] = useState<Square | undefined>(
    undefined
  );
  const [history, setHistory] = useState<(Move & { fen: string })[]>([]);
  const [squareCoords, setSquareCoords] = useState<{ [sq in Square]?: Coord }>(
    {}
  );

  const highlightSquares = useMemo((): Square[] => {
    const squares: Square[] = [];
    if (selectedSquare) squares.push(selectedSquare);

    const lastMove =
      history.length === 0 ? undefined : history[history.length - 1];
    if (lastMove) {
      squares.push(lastMove.from, lastMove.to);
    }

    return squares;
  }, [selectedSquare, history]);

  const onClearSelectedSquare = () => setSelectedSquare(undefined);

  const onLeftClickDown = (square: Square) => {
    if (game.isCheckmate() || (!selectedSquare && !position[square])) return;

    const sq = !selectedSquare
      ? square
      : selectedSquare === square
      ? undefined
      : null;
    if (sq !== null) {
      setSelectedSquare(sq);
      return;
    }

    const newGame = makeMove(
      game,
      selectedSquare!,
      square,
      onClearSelectedSquare
    );
    setGame(newGame);
  };

  const onDropPiece = (source: Square, target: Square) => {};

  useEffect(() => {
    setPosition(convertFen(game.fen()));

    setTurn(game.turn());

    setHistory(game.history({ verbose: true }));
  }, [game]);

  return (
    <ChessContext.Provider
      value={{
        game,
        position,
        width,
        turn,
        enablePremove,
        orientation,
        moveMethod,
        coordinate,
        pieceColor,
        squareStyle: SQUARE_STYLE[squareColor],
        squareCoords,
        selectedSquare,
        highlightSquares,
        onLeftClickDown,
        onClearSelectedSquare,
        onDropPiece,
        setSquareCoords,
      }}
    >
      {children}
    </ChessContext.Provider>
  );
};

export default ChessProvider;
