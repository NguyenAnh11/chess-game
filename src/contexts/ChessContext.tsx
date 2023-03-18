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
} from "../types";
import { SQUARE_STYLE, convertFen, getSquareInfo } from "../utils";

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
  const [kingUnderAttack, setKingUnderAttack] = useState<
    KingSquare | undefined
  >();

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
          const { row, col } = getSquareInfo(king.square, orientation);
          setKingUnderAttack({ square: king.square, row, col });
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
      squares.push(
        ...(rightClicks.map((square) => ({
          square,
          type: "right",
          ...getSquareInfo(square, orientation),
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
          squares.push({
            square: left,
            type: "left",
            ...getSquareInfo(left, orientation),
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
          ...getSquareInfo(to, orientation),
        };
        hintMoves.push(move);
      }
    }

    return hintMoves;
  }, [leftClick, showHintMove]);

  useEffect(() => {
    setPosition(convertFen(game.fen()));
    setLeftClick(undefined);
    setTurn(game.turn());

    if (!game.inCheck()) {
      setKingUnderAttack(undefined);
    }
  }, [game]);

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
      }}
    >
      {children}
    </ChessContext.Provider>
  );
};

export default ChessProvider;
