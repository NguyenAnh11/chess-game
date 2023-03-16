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
  HighlightSquare,
  MoveMethod,
  Premove,
  SquareColor as Sc,
  SquareStyle,
} from "../types";
import { SQUARE_STYLE, convertFen } from "../utils";

type ChessboardProviderProps = {
  children: React.ReactNode;
  squareColor: Sc;
  coordinate: Coordinate;
  orientation: BoardOrientation;
  moveMethod: MoveMethod;
  enablePremove: boolean;
  showHintMove: boolean;
  showHighlightMove: boolean;
};

type ChessContext = {
  game: Chess;
  position: BoardPosition;
  turn: string;
  enablePremove: boolean;
  orientation: "w" | "b";
  coordinate: Coordinate;
  moveMethod: MoveMethod;
  squareStyle: SquareStyle;
  highlightSquares: HighlightSquare[];
  legalMoves: Square[];
  lastMove: Move | undefined;
  onLeftClickDown: (sq: Square) => void;
  onClearLeftClick: () => void;
  onDropPiece: (source: Square, target: Square) => void;
  onRightClickDown: (square: Square) => void;
  onClearRightClicks: () => void;
  onDragPieceBegin: (square: Square) => void;
};

export const ChessContext = createContext({} as ChessContext);

export const useChess = () => useContext(ChessContext);

const ChessProvider = ({
  children,
  squareColor,
  coordinate,
  orientation,
  moveMethod,
  enablePremove,
  showHintMove,
  showHighlightMove,
}: ChessboardProviderProps) => {
  const [game, setGame] = useState(new Chess());
  const [turn, setTurn] = useState<"w" | "b">("w");
  const [position, setPosition] = useState(convertFen(game.fen()));
  const [history, setHistory] = useState<Move[]>([]);
  const [premoves, setPrremoves] = useState<Premove[]>([]);
  const [rightClicks, setRightClicks] = useState<Square[]>([]);
  const [leftClick, setLeftClick] = useState<Square | undefined>(undefined);
  const [highlightSquares, setHighlightSquares] = useState<HighlightSquare[]>(
    []
  );
  const [hintMoves, setHintMoves] = useState<Square[]>([]);

  const onClearLeftClick = () => setLeftClick(undefined);

  const onLeftClickDown = (square: Square) => {
    if (
      game.isGameOver() ||
      game.isDraw() ||
      game.isCheck() ||
      (!leftClick && !position[square])
    )
      return;

    const sq = !leftClick ? square : leftClick === square ? undefined : null;
    if (sq !== null) {
      setLeftClick(sq);
      return;
    }

    try {
      const newGame = new Chess(game.fen());
      const move = newGame.move({ from: leftClick!, to: square });
      setHistory((prev) => [...prev, move]);
      setGame(newGame);
    } catch {
      showHighlightMove && position[square]
        ? setLeftClick(square)
        : setLeftClick(undefined);
    }
  };

  const onClearRightClicks = () => setRightClicks([]);

  const onRightClickDown = (square: Square) => {
    if (!rightClicks.some((p) => p === square)) {
      setRightClicks((prev) => [...prev, square]);
    } else {
      setRightClicks((prev) => prev.filter((p) => p !== square));
    }
  };

  const onDragPieceBegin = (square: Square) => {
    if (leftClick) return;
    setLeftClick(square);
  };

  const onDropPiece = (source: Square, target: Square) => {
    if (game.isCheck()) {
      const kingSquares = game
        .board()
        .flatMap((p) => p.filter((p) => p !== null && p.type === "k"));

      console.log(kingSquares);

      const kingSquare =
        turn === "w"
          ? kingSquares.find((p) => p?.color === "w")
          : kingSquares.find((p) => p?.color === "b");

      if (kingSquare) {
        setHighlightSquares((prev) => [
          ...prev,
          { square: kingSquare.square, type: "king:check" },
        ]);
        return;
      }
    }

    if (source === target) return;

    try {
      const newGame = new Chess(game.fen());
      const move = newGame.move({ from: source, to: target });
      setHistory((prev) => [...prev, move]);
      setGame(newGame);
    } catch (e) {}
  };

  const lastMove = useMemo(
    (): Move | undefined =>
      history.length === 0 ? undefined : history[history.length - 1],
    []
  );

  useEffect(() => {
    setPosition(convertFen(game.fen()));
    setLeftClick(undefined);
    setTurn(game.turn());
  }, [game]);

  useEffect(() => {
    const squares: HighlightSquare[] = [];

    if (rightClicks.length > 0) {
      squares.push(
        ...(rightClicks.map((square) => ({
          square,
          type: "right",
        })) as HighlightSquare[])
      );
    }

    if (showHighlightMove) {
      const lefts: Square[] = [];

      if (leftClick) lefts.push(leftClick);

      const lastMove =
        history.length === 0 ? undefined : history[history.length - 1];
      if (lastMove) lefts.push(lastMove.from, lastMove.to);

      for (const left of [...new Set(lefts)]) {
        if (!rightClicks.includes(left)) {
          squares.push({ square: left, type: "left" });
        }
      }
    }

    setHighlightSquares(squares);
  }, [leftClick, history, showHighlightMove, rightClicks]);

  useEffect(() => {
    if (showHintMove) {
      let moves = game
        .moves({ square: leftClick, verbose: true })
        .map((p) => p.to) as Square[];

      setHintMoves(moves);
    }
  }, [leftClick, showHintMove]);

  return (
    <ChessContext.Provider
      value={{
        game,
        position,
        turn,
        enablePremove,
        orientation,
        moveMethod,
        coordinate,
        squareStyle: SQUARE_STYLE[squareColor],
        highlightSquares,
        legalMoves: hintMoves,
        lastMove,
        onLeftClickDown,
        onClearLeftClick,
        onDropPiece,
        onRightClickDown,
        onClearRightClicks,
        onDragPieceBegin,
      }}
    >
      {children}
    </ChessContext.Provider>
  );
};

export default ChessProvider;
