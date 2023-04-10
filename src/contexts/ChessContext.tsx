import { Chess, Move, Square } from "chess.js";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useRef,
  Dispatch,
  SetStateAction,
  RefObject,
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
  BoardIndex,
  BoardDifference,
  BoardPromotion,
} from "../types";
import {
  SQUARE_STYLE,
  convertFen,
  getPosition,
  getColor,
  PIECE_COLOR_IMAGES,
  ANIMATIONS,
  getPositionDifference,
} from "../utils";
import { useSetting } from "./SettingContext";

type ChessboardProviderProps = {
  children: React.ReactNode;
  boardRef: RefObject<HTMLDivElement>;
  orientation: BoardOrientation;
};

type ChessContext = {
  boardRef: RefObject<HTMLDivElement>;
  gameOver: boolean;
  position: BoardPosition;
  positionDifference: BoardDifference;
  promotion: BoardPromotion;
  turn: string;
  orientation: BoardOrientation;
  moveMethod: MoveMethod;
  squareStyle: SquareStyle;
  pieceImages: PieceImages;
  animationDuration: number;
  moves: Move[];
  arrows: Arrow[];
  lastMove: Move | undefined;
  highlightSquares: HighlightSquare[];
  hintMoves: HintMove[];
  leftClick: Square | undefined;
  boardIndex: BoardIndex;
  setBoardIndex: Dispatch<SetStateAction<BoardIndex>>;
  isWaitingForAnimation: boolean;
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
  undo: (num: number) => void;
  move: (start: number, end: number) => void;
  onShowHint: () => void;
  onClearArrows: () => void;
  onStep: (index: number) => void;
  onChoosedPiecePromotion: (piece: string) => void;
  onClosePromotion: () => void;
};

export const ChessContext = createContext({} as ChessContext);

export const useChess = () => useContext(ChessContext);

const ChessProvider = ({
  children,
  boardRef,
  orientation,
}: ChessboardProviderProps) => {
  const { setting } = useSetting();
  const game = useRef<Chess>(new Chess());
  const [gameOver, setGameOver] = useState(
    game.current.isGameOver() || game.current.isCheckmate()
  );
  const [position, setPosition] = useState<BoardPosition>(
    convertFen(game.current.fen())
  );
  const turn = useMemo(
    (): "w" | "b" => game.current.turn(),
    [game.current.fen()]
  );
  const [positionDifference, setPositionDifference] = useState<BoardDifference>(
    { added: {}, removed: {} }
  );
  const [moves, setMoves] = useState<Move[]>([]);
  const [arrows, setArrows] = useState<Arrow[]>([]);
  const [currentRightClickDown, setCurrentRightClickDown] = useState<
    Square | undefined
  >(undefined);
  const [rightClicks, setRightClicks] = useState<Square[]>([]);
  const [leftClick, setLeftClick] = useState<Square | undefined>(undefined);
  const [kingUnderAttack, setKingUnderAttack] = useState<
    KingSquare | undefined
  >();
  const [boardIndex, setBoardIndex] = useState<BoardIndex>({
    break: 0,
    step: 0,
  });
  const [isManualDrop, setIsManualDrop] = useState(false);
  const [previousTimeout, setPreviousTimeout] = useState<NodeJS.Timeout>();
  const [isWaitingForAnimation, setIsWaitingForAnimation] = useState(false);

  const [promotion, setPromotion] = useState<BoardPromotion>({ show: false, waiting: false });

  const onChoosedPiecePromotion = (piece: string) => {
    setPromotion((pre) => ({ ...pre, choosedPiece: piece }));
  };

  const onClosePromotion = () => {
    setPromotion({ show: false, waiting: true });
  };

  const onClearArrows = () => setArrows([]);

  const onClearLeftClick = () => setLeftClick(undefined);

  const makeMove = (action: "click" | "drop", move: Move) => {
    const cloneMoves = [...moves];
    if (
      orientation === "w" &&
      moves.length >= 2 &&
      boardIndex.step !== moves.length
    ) {
      cloneMoves.splice(boardIndex.step, moves.length - boardIndex.step);
    }

    if (
      orientation === "b" &&
      moves.length >= 3 &&
      boardIndex.step !== moves.length
    ) {
      cloneMoves.slice(boardIndex.step, moves.length - boardIndex.step);
    }

    setMoves([...cloneMoves, move]);

    setLeftClick(undefined);

    setIsManualDrop(action !== "click");
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

    try {
      let move: Move;

      const color = position[leftClick]![0] === "w" ? "w" : "b";

      const isReachToPromotionRow =
        (orientation === color && leftClick[1] === "7") ||
        (orientation !== color && leftClick[1] === "2");

      if (position[leftClick]![1] === "P" && isReachToPromotionRow) {
        const isMoveToEndRow =
          hintMoves.find((p) => p.square === square) !== undefined;

        if (!isMoveToEndRow) throw new Error(`Invalid move`);

        if (!setting.play.alwaysPromoteToQueen) {
          setPromotion({ show: true, waiting: true, square, color });
          return;
        }

        move = game.current.move({
          from: leftClick,
          to: square,
          promotion: "q",
        });
      } else {
        move = game.current.move({ from: leftClick, to: square });
      }

      makeMove("click", move);
    } catch {
      if (game.current.inCheck()) {
        const king = game.current
          .board()
          .flatMap((rows) =>
            rows.filter(
              (col) => col !== null && col.type === "k" && col.color === turn
            )
          )[0];

        if (king && !kingUnderAttack && position[leftClick]![0] === turn) {
          setKingUnderAttack({
            square: king.square,
            ...getPosition(king.square, orientation),
          });
        }

        setLeftClick(undefined);
        return;
      }

      if (
        setting.board.showHintMove &&
        position[square] &&
        position[square]![0] === turn
      ) {
        setLeftClick(square);
      } else {
        setLeftClick(undefined);
      }
    }
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

    try {
      let move: Move;

      const color = position[source]![0] === "w" ? "w" : "b";

      const isReachToPromotionRow =
        (orientation === color && source[1] === "7") ||
        (orientation !== color && source[1] === "2");

      if (position[source]![1] === "P" && isReachToPromotionRow) {
        const isMoveToEndRow = hintMoves.find((p) => p.square === target) !== undefined;
        
        if (!isMoveToEndRow) throw new Error('Invalid move');

        if (!setting.play.alwaysPromoteToQueen) {
          setPromotion({ show: true, waiting: true, square: target, color });
          return;
        }

        move = game.current.move({ from: source, to: target, promotion: "q" })
      } else {
        move = game.current.move({ from: source, to: target });
      }

      makeMove("drop", move);
    } catch {
      if (game.current.inCheck()) {
        const king = game.current
          .board()
          .flatMap((rows) =>
            rows.filter(
              (col) => col !== null && col.type === "k" && col.color === turn
            )
          )[0];

        if (king && !kingUnderAttack && position[source]![0] === turn) {
          setKingUnderAttack({
            square: king.square,
            ...getPosition(king.square, orientation),
          });
        }

        setLeftClick(undefined);
        return;
      }

    } finally {
      setLeftClick(undefined);
    }
  };

  const onResign = () => {
    setGameOver(true);
  };

  const onNewGame = () => {
    setMoves([]);
    setBoardIndex({ break: 0, step: 0 });
    game.current = new Chess();
  };

  const undo = (num: number) => {
    while (num > 0) {
      game.current.undo();
      num -= 1;
    }
  };

  const move = (startIndex: number, endIndex: number) => {
    const nextMoves = moves.slice(startIndex, endIndex);
    for (const { from, to, promotion } of nextMoves) {
      if (promotion) game.current.move({ from, to, promotion });
      else game.current.move({ from, to });
    }
  };

  const onShowHint = () => {};

  const onStep = (index: number) => {
    const newStepIndex = index + 1;

    if (newStepIndex === boardIndex.step) return;

    if (newStepIndex < boardIndex.step) {
      undo(boardIndex.step - newStepIndex);
    } else {
      move(boardIndex.step, newStepIndex);
    }

    setBoardIndex((pre) => ({ ...pre, step: newStepIndex }));
  };

  const viewSteps = useMemo(
    (): Move[] => moves.slice(0, boardIndex.step),
    [moves, boardIndex.step]
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
    const nextPosition = convertFen(game.current.fen());
    const difference = getPositionDifference(position, nextPosition);

    if (
      isManualDrop ||
      Object.keys(difference.added).length > 2 ||
      setting.board.animation === "none"
    ) {
      setPosition(nextPosition);
      setIsWaitingForAnimation(false);
    } else {
      setPositionDifference(difference);
      setIsWaitingForAnimation(true);

      const timeout = setTimeout(() => {
        setPosition(nextPosition);
        setIsWaitingForAnimation(false);
      }, ANIMATIONS[setting.board.animation]);

      setPreviousTimeout(timeout);
    }

    setIsManualDrop(false);

    return () => clearTimeout(previousTimeout);
  }, [game.current.fen()]);

  useEffect(() => {
    const index = moves.length;

    const cloneBoardIndex = { ...boardIndex };

    if (boardIndex.break + 1 === index) {
      if (boardIndex.step === boardIndex.break) {
        cloneBoardIndex.step = index;
      }

      cloneBoardIndex.break = index;

      setBoardIndex(cloneBoardIndex);
    }
  }, [moves]);

  useEffect(() => {
    if (promotion.choosedPiece) {
      const move = game.current.move({
        from: leftClick!,
        to: promotion.square!,
        promotion: promotion.choosedPiece,
      });

      makeMove("drop", move);

      onClosePromotion();
    }
  }, [promotion.choosedPiece]);

  return (
    <ChessContext.Provider
      value={{
        boardRef,
        gameOver,
        position,
        positionDifference,
        promotion,
        turn,
        orientation,
        moveMethod: setting.board.moveMethod,
        squareStyle: SQUARE_STYLE[setting.board.squareColor],
        pieceImages: PIECE_COLOR_IMAGES[setting.board.pieceColor],
        animationDuration: ANIMATIONS[setting.board.animation],
        moves,
        arrows,
        lastMove,
        highlightSquares,
        hintMoves,
        leftClick,
        boardIndex,
        setBoardIndex,
        isWaitingForAnimation,
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
        undo,
        move,
        onShowHint,
        onClearArrows,
        onStep,
        onChoosedPiecePromotion,
        onClosePromotion,
      }}
    >
      {children}
    </ChessContext.Provider>
  );
};

export default ChessProvider;
