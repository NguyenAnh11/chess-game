import { Chess, Move, Square } from "chess.js";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  BoardOrientation,
  BoardPosition,
  Coordinate,
  HighlightSquare,
  MoveMethod,
  SquareColor as Sc,
  SquareStyle,
  HintMove,
  KingSquare,
} from "../types";
import { SQUARE_STYLE, convertFen, getCoord, getColor } from "../utils";

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
  gameOver: boolean;
  position: BoardPosition;
  turn: string;
  enablePremove: boolean;
  orientation: "w" | "b";
  coordinate: Coordinate;
  moveMethod: MoveMethod;
  squareStyle: SquareStyle;
  moves: Move[];
  lastMove: Move | undefined;
  highlightSquares: HighlightSquare[];
  hintMoves: HintMove[];
  leftClick: Square | undefined;
  kingUnderAttack: KingSquare | undefined;
  onLeftClickDown: (sq: Square) => void;
  onClearLeftClick: () => void;
  onDropPiece: (source: Square, target: Square) => void;
  onRightClickDown: (square: Square) => void;
  onClearRightClicks: () => void;
  onDragPieceBegin: (square: Square) => void;
  onResign: () => void;
  onNewGame: () => void;
  onMoveBack: () => void;
  onMoveFoward: () => void;
  onShowHint: () => void;
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
  const game = useRef<Chess>(new Chess());
  const [gameOver, setGameOver] = useState(
    game.current.isGameOver() || game.current.isCheckmate()
  );
  const [moves, setMoves] = useState<Move[]>([]);
  const [rightClicks, setRightClicks] = useState<Square[]>([]);
  const [leftClick, setLeftClick] = useState<Square | undefined>(undefined);
  const [kingUnderAttack, setKingUnderAttack] = useState<
    KingSquare | undefined
  >();
  const [breakIndex, setBreakIndex] = useState(0);
  const [lastestIndex, setLastestIndex] = useState(0);

  const turn = useMemo(
    (): "w" | "b" => game.current.turn(),
    [game.current.fen()]
  );
  const position = useMemo(
    (): BoardPosition => convertFen(game.current.fen()),
    [game.current.fen()]
  );

  const onClearLeftClick = () => setLeftClick(undefined);

  const onLeftClickDown = (square: Square) => {
    if (game.current.isGameOver() || game.current.isDraw()) return;

    if (!leftClick) {
      setKingUnderAttack(undefined);
      setLeftClick(square);
      return;
    }

    if (leftClick === square) {
      setLeftClick(undefined);
      return;
    }

    try {
      const move = game.current.move({ from: leftClick!, to: square });
      console.log(game.current.history({ verbose: true }));
      setMoves((prev) => [...prev, move]);
      setLeftClick(undefined);
    } catch {
      if (game.current.inCheck()) {
        const king = game.current
          .board()
          .flatMap((rows) =>
            rows.filter(
              (col) => col !== null && col.type === "k" && col.color === turn
            )
          )[0];

        if (king && !kingUnderAttack) {
          setKingUnderAttack({
            square: king.square,
            ...getCoord(king.square, orientation),
          });
        }

        setLeftClick(undefined);
        return;
      }

      if (showHintMove && position[square] && position[square]![0] === turn) {
        setLeftClick(square);
      } else {
        setLeftClick(undefined);
      }
    }
  };

  const onClearRightClicks = () => setRightClicks([]);

  const onRightClickDown = (square: Square) => {
    if (rightClicks.some((p) => p === square)) {
      setRightClicks((prev) => prev.filter((p) => p !== square));
    } else {
      setRightClicks((prev) => [...prev, square]);
    }
  };

  const onDragPieceBegin = (square: Square) => {
    if (leftClick) return;
    setLeftClick(square);
  };

  const onDropPiece = (source: Square, target: Square) => {
    if (source === target) {
      setLeftClick(undefined);
      return;
    }

    try {
      const move = game.current.move({ from: source, to: target });
      setMoves((prev) => [...prev, move]);
    } catch {
      if (game.current.inCheck()) {
        console.log(turn);
        const king = game.current
          .board()
          .flatMap((rows) =>
            rows.filter(
              (col) => col !== null && col.type === "k" && col.color === turn
            )
          )[0];

        if (king && !kingUnderAttack) {
          setKingUnderAttack({
            square: king.square,
            ...getCoord(king.square, orientation),
          });
        }
      }
    } finally {
      setLeftClick(undefined);
    }
  };

  const onResign = () => {
    setMoves([]);
    setGameOver(true);
  };

  const onNewGame = () => {
    game.current = new Chess();
  };

  const onMoveBack = () => {
    if (orientation === "w") {
      if (breakIndex === 0 || breakIndex % 2 !== 0) return;
      game.current.undo();
      game.current.undo();
    }

    if (orientation === "b") {
    }
  };

  const onMoveFoward = () => {
    if (orientation === "w") {
      if (breakIndex + 2 > lastestIndex || breakIndex % 2 !== 0) return;
      setBreakIndex((prev) => prev + 2);
    }

    if (orientation === "b") {
    }
  };

  const onShowHint = () => {};

  const viewHistory = useMemo(
    (): Move[] => moves.slice(0, breakIndex),
    [moves, breakIndex]
  );

  const lastMove = useMemo(
    (): Move | undefined =>
      viewHistory.length === 0
        ? undefined
        : viewHistory[viewHistory.length - 1],
    [viewHistory]
  );

  const highlightSquares = useMemo((): HighlightSquare[] => {
    const squares: HighlightSquare[] = [];

    if (rightClicks.length > 0) {
      for (const right of rightClicks) {
        const { row, col } = getCoord(right, orientation);
        squares.push({
          square: right,
          type: "right",
          row,
          col,
          color: getColor(row, col),
        });
      }
    }

    if (showHighlightMove) {
      const leftClicks: Square[] = [];

      if (leftClick) leftClicks.push(leftClick);
      if (lastMove) leftClicks.push(lastMove.from, lastMove.to);

      for (const left of leftClicks) {
        if (!rightClicks.includes(left)) {
          const { row, col } = getCoord(left, orientation);
          squares.push({
            square: left,
            type: "left",
            row,
            col,
            color: getColor(row, col),
          });
        }
      }
    }

    return squares;
  }, [leftClick, lastMove, showHighlightMove, rightClicks]);

  const hintMoves = useMemo((): HintMove[] => {
    const hintMoves: HintMove[] = [];

    if (
      showHintMove &&
      leftClick &&
      position[leftClick] &&
      position[leftClick]![0] === turn
    ) {
      const moves = game.current.moves({ square: leftClick, verbose: true });
      for (const { to } of moves) {
        hintMoves.push({
          square: to,
          type: !position[to] ? "hint" : "capture",
          ...getCoord(to, orientation),
        });
      }
    }

    return hintMoves;
  }, [leftClick, showHintMove]);

  useEffect(() => {
    setGameOver(game.current.isCheckmate() || game.current.isGameOver());
  }, [game]);

  useEffect(() => {
    const index = moves.length;
    if (breakIndex === lastestIndex) setBreakIndex(index);
    setLastestIndex(index);
  }, [moves]);

  return (
    <ChessContext.Provider
      value={{
        gameOver,
        position,
        turn,
        enablePremove,
        orientation,
        moveMethod,
        coordinate,
        squareStyle: SQUARE_STYLE[squareColor],
        moves,
        lastMove,
        highlightSquares,
        hintMoves,
        leftClick,
        kingUnderAttack,
        onLeftClickDown,
        onClearLeftClick,
        onDropPiece,
        onRightClickDown,
        onClearRightClicks,
        onDragPieceBegin,
        onResign,
        onNewGame,
        onMoveBack,
        onMoveFoward,
        onShowHint,
      }}
    >
      {children}
    </ChessContext.Provider>
  );
};

export default ChessProvider;
