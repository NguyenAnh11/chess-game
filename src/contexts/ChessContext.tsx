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
  HintMove,
  KingSquare,
  GameStatus,
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
  game: Chess;
  gameStatus: GameStatus;
  position: BoardPosition;
  turn: string;
  enablePremove: boolean;
  orientation: "w" | "b";
  coordinate: Coordinate;
  moveMethod: MoveMethod;
  squareStyle: SquareStyle;
  highlightSquares: HighlightSquare[];
  hintMoves: HintMove[];
  lastMove: Move | undefined;
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
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    draw: false,
    over: false,
  });
  const [turn, setTurn] = useState<"w" | "b">(game.turn());
  const [position, setPosition] = useState(convertFen(game.fen()));
  const [history, setHistory] = useState<Move[]>([]);
  const [premoves, setPrremoves] = useState<Premove[]>([]);
  const [rightClicks, setRightClicks] = useState<Square[]>([]);
  const [leftClick, setLeftClick] = useState<Square | undefined>(undefined);
  const [kingUnderAttack, setKingUnderAttack] = useState<
    KingSquare | undefined
  >();

  const onResign = () => {
    setGameStatus((prev) => ({ ...prev, over: true }));
  };

  const onNewGame = () => {
    setHistory([]);
    setGame(new Chess());
  }

  const onClearLeftClick = () => setLeftClick(undefined);

  const onLeftClickDown = (square: Square) => {
    if (game.isGameOver() || game.isDraw() || (!leftClick && !position[square]))
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
      setLeftClick(undefined);
      setGame(newGame);
    } catch {
      if (game.inCheck()) {
        const king = game
          .board()
          .flatMap((rows) =>
            rows.filter(
              (col) =>
                col !== null && col.type === "k" && col.color === game.turn()
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

      showHintMove && position[square]
        ? setLeftClick(square)
        : setLeftClick(undefined);
    }
  };

  const onClearRightClicks = () => setRightClicks([]);

  const onRightClickDown = (square: Square) => {
    const exist = rightClicks.some((p) => p === square);
    if (!exist) {
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
    if (source === target) {
      setLeftClick(undefined);
      return;
    }

    try {
      const move = game.move({ from: source, to: target });
      setHistory((prev) => [...prev, move]);
      setPosition(convertFen(game.fen()));
      setTurn(game.turn());
    } catch (e) {}
  };

  const lastMove = useMemo(
    (): Move | undefined =>
      history.length === 0 ? undefined : history[history.length - 1],
    []
  );

  const highlightSquares = useMemo((): HighlightSquare[] => {
    const squares: HighlightSquare[] = [];

    if (rightClicks.length > 0) {
      for (const right of rightClicks) {
        const { row, col } = getCoord(right, orientation);
        const square: HighlightSquare = {
          square: right,
          type: "right",
          row,
          col,
          color: getColor(row, col),
        };

        squares.push(square);
      }
    }

    if (showHighlightMove) {
      const leftClicks: Square[] = [];

      if (leftClick) leftClicks.push(leftClick);

      const lastMove =
        history.length === 0 ? undefined : history[history.length - 1];
      if (lastMove) leftClicks.push(lastMove.from, lastMove.to);

      for (const left of [...new Set(leftClicks)]) {
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
  }, [leftClick, history, showHighlightMove, rightClicks]);

  const hintMoves = useMemo((): HintMove[] => {
    const hintMoves: HintMove[] = [];
    if (showHintMove && leftClick) {
      const moves = game.moves({ square: leftClick, verbose: true });
      for (const { to } of moves) {
        const move: HintMove = {
          square: to,
          type: !position[to] ? "hint" : "capture",
          ...getCoord(to, orientation),
        };
        hintMoves.push(move);
      }
    }

    return hintMoves;
  }, [leftClick, showHintMove]);

  useEffect(() => {
    //update board
    setPosition(convertFen(game.fen()));
    //update turn
    setTurn(game.turn());

    if (!game.inCheck()) 
      setKingUnderAttack(undefined);
    //update game status
    const status: GameStatus = {
      draw: game.isDraw(),
      over: game.isGameOver() && game.isCheckmate(),
    };

    setGameStatus(status);
  }, [game]);

  return (
    <ChessContext.Provider
      value={{
        game,
        gameStatus,
        position,
        turn,
        enablePremove,
        orientation,
        moveMethod,
        coordinate,
        squareStyle: SQUARE_STYLE[squareColor],
        highlightSquares,
        hintMoves,
        lastMove,
        leftClick,
        kingUnderAttack,
        onLeftClickDown,
        onClearLeftClick,
        onDropPiece,
        onRightClickDown,
        onClearRightClicks,
        onDragPieceBegin,
        onResign,
        onNewGame
      }}
    >
      {children}
    </ChessContext.Provider>
  );
};

export default ChessProvider;
