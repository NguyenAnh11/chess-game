import { Chess, Color, Move, PieceSymbol, Square } from "chess.js";
import _ from "lodash";
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
import useWorker from "../hooks/useWorker";
import { SOCKET_EVENTS } from "../services/Socket";
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
  CapturePieces,
  MoveAction,
  SuggestMove,
} from "../types";
import {
  SQUARE_STYLE,
  convertFen,
  getPosition,
  getColor,
  PIECE_COLOR_IMAGES,
  ANIMATIONS,
  getPositionDifference,
  PIECE_SCORES,
} from "../utils";
import { useGame } from "./GameContext";
import { useSetting } from "./SettingContext";
import { useSocket } from "./SocketContext";
import { useUser } from "./UserContext";

type ChessboardProviderProps = {
  children: React.ReactNode;
  boardRef: RefObject<HTMLDivElement>;
};

type ChessContext = {
  boardRef: RefObject<HTMLDivElement>;
  game: Chess;
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
  suggestMove: SuggestMove;
  arrows: Arrow[];
  lastMove: Move | undefined;
  highlightSquares: HighlightSquare[];
  hintMoves: HintMove[];
  capturePieces: CapturePieces;
  capturePiecesScore: { [c in Color]: number };
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
  onNewGame: () => void;
  undo: (num: number) => void;
  move: (start: number, end: number) => void;
  onClearArrows: () => void;
  onStep: (index: number) => void;
  onChoosedPiecePromotion: (piece: string) => void;
  onClosePromotion: () => void;
  onResign: (playerId: string) => void;
  onHiddenSuggestMove: () => void;
  onSuggestMove: () => void;
};

const initialValueSuggestMove: SuggestMove = {
  hidden: false,
  loading: false,
  move: undefined,
};

export const ChessContext = createContext({} as ChessContext);

export const useChess = () => useContext(ChessContext);

const ChessProvider = ({ children, boardRef }: ChessboardProviderProps) => {
  const { ws } = useSocket();
  const { user } = useUser();
  const { setting, mode } = useSetting();
  const {
    game: gameInfo,
    isGameOver,
    isGameDraw,
    isGameWaiting,
    onSetGameDraw,
    onSetGameReady,
    onSetPlayerAsLoser,
  } = useGame();
  const game = useRef<Chess>(new Chess());
  const [position, setPosition] = useState<BoardPosition>(
    convertFen(game.current.fen())
  );
  const [orientation, setOrientation] = useState<BoardOrientation>("w");
  const [turn, setTurn] = useState(game.current.turn());
  const [positionDifference, setPositionDifference] = useState<BoardDifference>(
    { added: {}, removed: {} }
  );
  const movesRef = useRef<Move[]>([]);
  const [moves, setMoves] = useState<Move[]>([]);
  const [readyMove, setReadyMove] = useState<{
    move: Move;
    action: MoveAction;
  }>();
  const [suggestMove, setSuggestMove] = useState<SuggestMove>(
    initialValueSuggestMove
  );
  const [arrows, setArrows] = useState<Arrow[]>([]);
  const [currentRightClickDown, setCurrentRightClickDown] = useState<
    Square | undefined
  >(undefined);
  const [rightClicks, setRightClicks] = useState<Square[]>([]);
  const [leftClick, setLeftClick] = useState<Square | undefined>(undefined);
  const [kingUnderAttack, setKingUnderAttack] = useState<
    KingSquare | undefined
  >(undefined);
  const [boardIndex, setBoardIndex] = useState<BoardIndex>({
    break: 0,
    step: 0,
  });
  const [isManualDrop, setIsManualDrop] = useState(false);
  const [previousTimeout, setPreviousTimeout] = useState<NodeJS.Timeout>();
  const [isWaitingForAnimation, setIsWaitingForAnimation] = useState(false);
  const [promotion, setPromotion] = useState<BoardPromotion>({
    show: false,
    waiting: false,
  });

  const aiWorker = useWorker(
    new Worker(new URL("../services/Worker.ts", import.meta.url), {
      type: "module",
    }),
    (e: MessageEvent<Move>) => {
      setReadyMove({ action: "click", move: e.data });
    }
  );

  const hintWorker = useWorker(
    new Worker(new URL("../services/Worker.ts", import.meta.url), {
      type: "module",
    }),
    (e: MessageEvent<Move>) => {
      setSuggestMove({ hidden: false, loading: false, move: e.data });
    },
    () => {
      setSuggestMove(initialValueSuggestMove);
    }
  );

  const onChoosedPiecePromotion = (piece: string) => {
    setPromotion((pre) => ({ ...pre, choosedPiece: piece }));
  };

  const onClosePromotion = () => setPromotion({ show: false, waiting: false });

  const onClearArrows = () => setArrows([]);

  const onClearLeftClick = () => setLeftClick(undefined);

  const onHiddenSuggestMove = () => {
    setSuggestMove((prev) => ({ ...prev, hidden: !prev.hidden }));
  };

  const onSuggestMove = () => {
    setSuggestMove((prev) => ({ ...prev, loading: true }));

    hintWorker.postMessage(JSON.stringify({ fen: game.current.fen() }));
  };

  const makeMove = (action: MoveAction, move: Move) => {
    const cloneMoves = [...movesRef.current];
    if (
      orientation === "w" &&
      cloneMoves.length >= 2 &&
      boardIndex.step !== moves.length
    ) {
      cloneMoves.splice(boardIndex.step, cloneMoves.length - boardIndex.step);
    }

    if (
      orientation === "b" &&
      cloneMoves.length >= 3 &&
      boardIndex.step !== moves.length
    ) {
      cloneMoves.slice(boardIndex.step, cloneMoves.length - boardIndex.step);
    }

    const newMoves = [...cloneMoves, move];

    movesRef.current = newMoves;

    setMoves(newMoves);

    setTurn((prev) => (prev === "w" ? "b" : "w"));
    setBoardIndex({ break: newMoves.length, step: newMoves.length });

    setLeftClick(undefined);

    if (readyMove) {
      setReadyMove(undefined);
    }

    if (suggestMove.move) {
      setSuggestMove(initialValueSuggestMove);
    }

    setIsManualDrop(action !== "click");
  };

  const onLeftClickDown = (square: Square) => {
    if (isGameOver || isGameDraw) return;

    if (!leftClick) {
      kingUnderAttack && setKingUnderAttack(undefined);
      setLeftClick(square);
      return;
    }

    if (
      leftClick === square ||
      orientation !== turn ||
      (leftClick && isGameWaiting)
    ) {
      setLeftClick(undefined);
      return;
    }

    const color = position[leftClick]![0] === "w" ? "w" : "b";

    try {
      let move: Move;

      if (
        position[leftClick]![1] === "P" &&
        ((orientation === color && leftClick[1] === "7") ||
          (orientation !== color && leftClick[1] === "2"))
      ) {
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

      if (mode === "AI") onSetGameReady();
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

      if (!position[square]) {
        setLeftClick(undefined);
      } else {
        setLeftClick(square);
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
    if (isGameOver || isGameDraw || leftClick) return;

    setLeftClick(square);
  };

  const onDropPiece = (source: Square, target: Square) => {
    if (setting.board.moveMethod === "c") return;

    if (isGameWaiting || source === target || orientation !== turn) {
      setLeftClick(undefined);
      return;
    }

    const color = position[source]![0] === "w" ? "w" : "b";

    try {
      let move: Move;

      if (
        position[source]![1] === "P" &&
        ((orientation === color && source[1] === "7") ||
          (orientation !== color && source[1] === "2"))
      ) {
        const isMoveToEndRow =
          hintMoves.find((p) => p.square === target) !== undefined;

        if (!isMoveToEndRow) throw new Error("Invalid move");

        if (!setting.play.alwaysPromoteToQueen) {
          setPromotion({ show: true, waiting: true, square: target, color });
          return;
        }

        move = game.current.move({ from: source, to: target, promotion: "q" });
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

  const onNewGame = () => {
    //reset state game
    movesRef.current = [];
    setMoves(movesRef.current);
    setTurn("w");
    setBoardIndex({ break: 0, step: 0 });

    //terminate worker
    aiWorker.terminate();
    hintWorker.terminate();

    //reset game
    game.current = new Chess();
  };

  const undoMove = (num: number) => {
    while (num > 0) {
      game.current.undo();
      num -= 1;
    }
  };

  const doMove = (startIndex: number, endIndex: number) => {
    const nextMoves = moves.slice(startIndex, endIndex);
    for (const { from, to, promotion } of nextMoves) {
      if (promotion) game.current.move({ from, to, promotion });
      else game.current.move({ from, to });
    }
  };

  const onStep = (index: number) => {
    if (index === boardIndex.step) return;

    if (index < boardIndex.step) {
      undoMove(boardIndex.step - index);
    } else {
      doMove(boardIndex.step, index);
    }

    setBoardIndex((pre) => ({ ...pre, step: index }));
  };

  const onResign = (playerId: string) => {
    onSetPlayerAsLoser(playerId);
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
        if (!suggestMove.move || suggestMove.move.from !== left) {
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

    if (suggestMove.move && !suggestMove.hidden) {
      for (const square of Object.values(
        _.pick(suggestMove.move, ["from", "to"])
      ) as Array<Square>) {
        const { row, col } = getPosition(square, orientation);
        squares.push({
          square,
          type: "suggest",
          row,
          col,
          color: getColor(row, col),
        });
      }
    }

    return squares;
  }, [
    lastMove,
    leftClick,
    rightClicks,
    suggestMove.move,
    suggestMove.hidden,
    setting.board.highlightMove,
  ]);

  const hintMoves = useMemo((): HintMove[] => {
    const hintMoves: HintMove[] = [];

    if (
      setting.board.showHintMove &&
      leftClick &&
      position[leftClick] &&
      position[leftClick]![0] === orientation &&
      (!suggestMove.move || suggestMove.move.from !== leftClick)
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
  }, [leftClick, suggestMove.move, setting.board.showHintMove]);

  const capturePieces = useMemo((): CapturePieces => {
    const playerPieces: CapturePieces = {
      w: { q: 0, b: 0, n: 0, r: 0, p: 0 },
      b: { q: 0, b: 0, n: 0, r: 0, p: 0 },
    };

    for (let index = 0; index < viewSteps.length; index += 1) {
      const step = viewSteps[index];
      if (step.captured) {
        const color = index % 2 === 0 ? "b" : "w";
        const pieceSymbol = step.captured as Exclude<PieceSymbol, "k">;
        playerPieces[color][pieceSymbol] += 1;
      }

      if (step.promotion) {
        playerPieces[step.color].p += 1;
      }
    }

    return playerPieces;
  }, [viewSteps]);

  const capturePiecesScore = useMemo(() => {
    const score: { [c in Color]: number } = { b: 0, w: 0 };

    Object.keys(score).forEach((color) => {
      let value = 0;
      const pieces = Object.values(position).filter((p) => p && p[0] === color);

      for (const piece of pieces) {
        const pieceSymbol = piece[1].toLowerCase() as PieceSymbol;
        value += PIECE_SCORES[pieceSymbol];
      }

      score[color as Color] = value;
    });

    return score;
  }, [viewSteps, position]);

  useEffect(() => {
    if (game.current.isCheckmate() || game.current.isGameOver()) {
      const currentPlayer = gameInfo.members.find((p) => p.color === turn);
      if (currentPlayer) {
        onResign(currentPlayer.id);
      }
    }

    if (game.current.isDraw()) {
      onSetGameDraw();
    }
  }, [
    game.current.isCheckmate(),
    game.current.isGameOver(),
    game.current.isDraw(),
  ]);

  useEffect(() => {
    const nextPosition = convertFen(game.current.fen());
    const difference = getPositionDifference(position, nextPosition);

    if (isWaitingForAnimation) {
      setPosition(nextPosition);
      setIsWaitingForAnimation(false);
      if (previousTimeout) clearTimeout(previousTimeout);
    } else {
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
    }

    setIsManualDrop(false);

    return () => clearTimeout(previousTimeout);
  }, [game.current.fen()]);

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

  useEffect(() => {
    if (orientation !== turn) {
      if (mode === "AI" && !isGameWaiting) {
        aiWorker.postMessage(JSON.stringify({ fen: game.current.fen() }));
      }

      if (ws && mode === "Multiplayer" && moves.length > 0) {
        const lastMove = moves[moves.length - 1];

        ws.emit(SOCKET_EVENTS.MAKE_MOVE, {
          code: gameInfo.code,
          move: lastMove,
        });
      }
    }
  }, [turn, isGameWaiting]);

  useEffect(() => {
    if (orientation !== turn && suggestMove.loading) {
      hintWorker.terminate();
    }
  }, [turn]);

  useEffect(() => {
    if (readyMove) {
      if (mode === "AI" && boardIndex.step !== moves.length) return;

      if (mode === "Multiplayer") {
        const latestIndex = moves.length;
        if (boardIndex.step !== latestIndex)
          doMove(boardIndex.step, latestIndex);
      }

      game.current.move({
        from: readyMove.move.from,
        to: readyMove.move.to,
        promotion: readyMove.move.promotion,
      });

      makeMove(readyMove.action, readyMove.move);
    }
  }, [readyMove, boardIndex.step]);

  useEffect(() => {
    if (mode === "Multiplayer") {
      ws.on(SOCKET_EVENTS.RECEIVE_MOVE, (move: Move) => {
        setReadyMove({ move, action: "click" });
      });

      return () => {
        ws.off(SOCKET_EVENTS.RECEIVE_MOVE);
      };
    }
  }, []);

  useEffect(() => {
    setOrientation(user!.color);
  }, [user!.color]);

  return (
    <ChessContext.Provider
      value={{
        boardRef,
        game: game.current,
        position,
        positionDifference,
        promotion,
        turn,
        orientation,
        moveMethod: setting.board.moveMethod,
        squareStyle: SQUARE_STYLE[setting.board.squareColor],
        pieceImages: PIECE_COLOR_IMAGES[setting.board.pieceColor],
        animationDuration: ANIMATIONS[setting.board.animation],
        arrows,
        moves,
        suggestMove,
        lastMove,
        highlightSquares,
        hintMoves,
        capturePieces,
        capturePiecesScore,
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
        onNewGame,
        undo: undoMove,
        move: doMove,
        onClearArrows,
        onStep,
        onChoosedPiecePromotion,
        onClosePromotion,
        onResign,
        onHiddenSuggestMove,
        onSuggestMove,
      }}
    >
      {children}
    </ChessContext.Provider>
  );
};

export default ChessProvider;
