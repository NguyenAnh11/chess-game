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
  HighlightSquare,
  MoveMethod,
  SquareStyle,
  HintMove,
  KingSquare,
  ArrowColor,
  Arrow,
  PieceImages,
} from "../types";
import {
  SQUARE_STYLE,
  convertFen,
  getPosition,
  getColor,
  PIECE_COLOR_IMAGES,
} from "../utils";
import { useSetting } from "./SettingContext";

type ChessboardProviderProps = {
  children: React.ReactNode;
  orientation: BoardOrientation;
};

type ChessContext = {
  gameOver: boolean;
  position: BoardPosition;
  turn: string;
  orientation: BoardOrientation;
  moveMethod: MoveMethod;
  squareStyle: SquareStyle;
  pieceImages: PieceImages;
  moves: Move[];
  arrows: Arrow[];
  lastMove: Move | undefined;
  highlightSquares: HighlightSquare[];
  hintMoves: HintMove[];
  leftClick: Square | undefined;
  breakIndex: number;
  kingUnderAttack: KingSquare | undefined;
  onLeftClickDown: (sq: Square) => void;
  onClearLeftClick: () => void;
  onDropPiece: (source: Square, target: Square) => void;
  onRightClickUp: (square: Square, color: ArrowColor) => void;
  onRightClickDown: (square: Square) => void;
  onClearRightClicks: () => void;
  onDragPieceBegin: (square: Square) => void;
  onResign: () => void;
  onNewGame: () => void;
  onMoveBack: () => void;
  onMoveFoward: () => void;
  onShowHint: () => void;
  onDownload: () => void;
  onClearArrows: () => void;
  onStep: (index: number) => void;
};

export const ChessContext = createContext({} as ChessContext);

export const useChess = () => useContext(ChessContext);

const ChessProvider = ({ children, orientation }: ChessboardProviderProps) => {
  const { setting } = useSetting();
  const game = useRef<Chess>(new Chess());
  const [gameOver, setGameOver] = useState(
    game.current.isGameOver() || game.current.isCheckmate()
  );

  const [arrows, setArrows] = useState<Arrow[]>([]);
  const [moves, setMoves] = useState<Move[]>([]);
  const [currentRightClickDown, setCurrentRightClickDown] = useState<
    Square | undefined
  >(undefined);
  const [rightClicks, setRightClicks] = useState<Square[]>([]);
  const [leftClick, setLeftClick] = useState<Square | undefined>(undefined);
  const [kingUnderAttack, setKingUnderAttack] = useState<
    KingSquare | undefined
  >();
  const [breakIndex, setBreakIndex] = useState(0);

  const turn = useMemo(
    (): "w" | "b" => game.current.turn(),
    [game.current.fen()]
  );

  const position = useMemo(
    (): BoardPosition => convertFen(game.current.fen()),
    [game.current.fen()]
  );

  const onClearArrows = () => setArrows([]);

  const onClearLeftClick = () => setLeftClick(undefined);

  const onUpdatePosition = (
    from: Square,
    to: Square,
    onMoveEnd?: () => void,
    onErrorEnd?: () => void
  ) => {
    try {
      const move = game.current.move({ from, to });

      let cloneMoves = [...moves];
      if (orientation === "w") {
        if (moves.length >= 2 && breakIndex !== moves.length) {
          cloneMoves.splice(breakIndex, moves.length - breakIndex);
        }
      } else {
        if (moves.length >= 3 && breakIndex !== moves.length) {
          cloneMoves.splice(breakIndex, moves.length - breakIndex);
        }
      }

      setMoves([...cloneMoves, move]);

      setLeftClick(undefined);

      if (onMoveEnd) onMoveEnd();
    } catch {
      if (game.current.inCheck()) {
        const king = game.current
          .board()
          .flatMap((rows) =>
            rows.filter(
              (col) => col !== null && col.type === "k" && col.color === turn
            )
          )[0];

        if (king && !kingUnderAttack && position[from]![0] === turn) {
          setKingUnderAttack({
            square: king.square,
            ...getPosition(king.square, orientation),
          });
        }

        setLeftClick(undefined);
        return;
      }

      if (onErrorEnd) onErrorEnd();
    }
  };

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

    onUpdatePosition(leftClick!, square, undefined, () => {
      if (
        setting.board.showHintMove &&
        position[square] &&
        position[square]![0] === turn
      ) {
        setLeftClick(square);
      } else {
        setLeftClick(undefined);
      }
    });
  };

  const onClearRightClicks = () => setRightClicks([]);

  const addToRightClicks = (square: Square) => {
    if (!rightClicks.some((p) => p === square)) {
      setRightClicks((prev) => [...prev, square]);
    } else {
      setRightClicks((prev) => prev.filter((p) => p !== square));
    }
  };

  const onRightClickUp = (square: Square, color: ArrowColor) => {
    if (!setting.board.showArrow) {
      addToRightClicks(square);
    }

    if (setting.board.showArrow) {
      if (currentRightClickDown === square) {
        addToRightClicks(square);
      } else {
        let index = -1;
        for (let i = 0; i < arrows.length; i++) {
          if (
            arrows[i].source === currentRightClickDown &&
            arrows[i].target === square
          ) {
            index = i;
            break;
          }
        }

        const arrow: Arrow = {
          source: currentRightClickDown!,
          target: square,
          color,
        };

        if (index !== -1 && arrows[index].color !== color) {
          setArrows((prev) => prev.splice(index, 1, arrow));
        }

        if (index === -1) {
          setArrows((prev) => [...prev, arrow]);
        }
      }
    }

    setCurrentRightClickDown(undefined);
  };

  const onRightClickDown = (square: Square) => {
    setCurrentRightClickDown(square);
  };

  const onDragPieceBegin = (square: Square) => {
    if (game.current.isGameOver() || game.current.isCheckmate() || leftClick)
      return;

    setLeftClick(square);
  };

  const onDropPiece = (source: Square, target: Square) => {
    if (setting.board.moveMethod === "c") return;

    if (source === target) {
      setLeftClick(undefined);
      return;
    }

    onUpdatePosition(source, target);
  };

  const onResign = () => {
    setGameOver(true);
  };

  const onNewGame = () => {
    setMoves([]);
    setBreakIndex(0);
    game.current = new Chess();
  };

  const undo = (num: number) => {
    while (num > 0) {
      game.current.undo();
      num -= 1;
    }
  };

  const onMoveBack = () => {
    if (orientation === "w" && moves.length % 2 === 0) {
      if (breakIndex % 2 === 0 && breakIndex > 0) {
        setBreakIndex((prev) => prev - 2);
        undo(2);
      }

      if (breakIndex % 2 === 1 && breakIndex >= 1) {
        setBreakIndex((prev) => prev - 1);
        undo(1);
      }
    }

    if (orientation === "b" && moves.length % 2 === 1) {
      const num = breakIndex === 1 ? 1 : 2;
      if (breakIndex % 2 === 1 && breakIndex - num >= 0) {
        setBreakIndex((prev) => prev - num);
        undo(num);
      }

      if (breakIndex % 2 === 0) {
        setBreakIndex((prev) => prev - 1);
        undo(1);
      }
    }
  };

  const move = (startIndex: number, endIndex: number) => {
    const nextMoves = moves.slice(startIndex, endIndex);
    for (const { from, to } of nextMoves) {
      game.current.move({ from, to });
    }
  };

  const onMoveFoward = () => {
    if (orientation === "w" && moves.length % 2 === 0) {
      if (breakIndex % 2 === 0 && breakIndex < moves.length) {
        setBreakIndex((prev) => prev + 2);
        move(breakIndex, breakIndex + 2);
      }

      if (breakIndex % 2 === 1 && breakIndex < moves.length) {
        setBreakIndex((prev) => prev + 1);
        move(breakIndex, breakIndex + 1);
      }
    }

    if (orientation === "b" && moves.length % 2 === 1) {
      const num = breakIndex === 0 ? 1 : 2;
      if (breakIndex % 2 === 1 && breakIndex + num <= moves.length) {
        setBreakIndex((prev) => prev + num);
        move(breakIndex, breakIndex + num);
      }

      if (breakIndex % 2 === 0 && breakIndex < moves.length) {
        setBreakIndex((prev) => prev + 1);
        move(breakIndex, breakIndex + 1);
      }
    }
  };

  const onShowHint = () => {};

  const onDownload = () => {};

  const onStep = (index: number) => {
    if (orientation === "w" && moves.length % 2 !== 0) return;

    if (orientation === "b" && moves.length % 2 !== 1) return;

    setBreakIndex(index + 1);
    const actualIndex = index + 1;
    if (actualIndex < breakIndex) {
      undo(breakIndex - actualIndex);
    } else {
      move(breakIndex, actualIndex);
    }
  };

  const viewSteps = useMemo(
    (): Move[] => moves.slice(0, breakIndex),
    [moves, breakIndex]
  );

  const lastMove = useMemo(
    (): Move | undefined =>
      viewSteps.length === 0 ? undefined : viewSteps[viewSteps.length - 1],
    [viewSteps]
  );

  const highlightSquares = useMemo((): HighlightSquare[] => {
    const squares: HighlightSquare[] = [];

    if (rightClicks.length > 0) {
      for (const right of rightClicks) {
        const { row, col } = getPosition(right, orientation);
        squares.push({
          square: right,
          type: "right",
          row,
          col,
          color: getColor(row, col),
        });
      }
    }

    if (setting.board.highlightMove) {
      const leftClicks: Square[] = [];

      if (leftClick) leftClicks.push(leftClick);
      if (lastMove) leftClicks.push(lastMove.from, lastMove.to);

      for (const left of leftClicks) {
        if (!rightClicks.includes(left)) {
          const { row, col } = getPosition(left, orientation);
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
  }, [leftClick, lastMove, setting.board.highlightMove, rightClicks]);

  const hintMoves = useMemo((): HintMove[] => {
    const hintMoves: HintMove[] = [];

    if (
      setting.board.showHintMove &&
      leftClick &&
      position[leftClick] &&
      position[leftClick]![0] === turn
    ) {
      const moves = game.current.moves({ square: leftClick, verbose: true });
      for (const { to } of moves) {
        hintMoves.push({
          square: to,
          type: !position[to] ? "hint" : "capture",
          ...getPosition(to, orientation),
        });
      }
    }

    return hintMoves;
  }, [leftClick, setting.board.showHintMove]);

  useEffect(() => {
    setGameOver(game.current.isCheckmate() || game.current.isGameOver());
  }, [game.current.isCheckmate(), game.current.isGameOver()]);

  useEffect(() => {
    const index = moves.length;

    if (breakIndex + 1 === index) {
      setBreakIndex(index);
    }

    if (breakIndex === moves.length) {
      setBreakIndex(index);
    }
  }, [moves]);

  return (
    <ChessContext.Provider
      value={{
        gameOver,
        position,
        turn,
        orientation,
        moveMethod: setting.board.moveMethod,
        squareStyle: SQUARE_STYLE[setting.board.squareColor],
        pieceImages: PIECE_COLOR_IMAGES[setting.board.pieceColor],
        moves,
        arrows,
        lastMove,
        highlightSquares,
        hintMoves,
        leftClick,
        breakIndex,
        kingUnderAttack,
        onLeftClickDown,
        onClearLeftClick,
        onDropPiece,
        onRightClickUp,
        onRightClickDown,
        onClearRightClicks,
        onDragPieceBegin,
        onResign,
        onNewGame,
        onMoveBack,
        onMoveFoward,
        onShowHint,
        onDownload,
        onClearArrows,
        onStep,
      }}
    >
      {children}
    </ChessContext.Provider>
  );
};

export default ChessProvider;
