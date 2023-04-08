import React, {
  CSSProperties,
  useEffect,
  MouseEvent,
  useState,
  useMemo,
  useRef,
} from "react";
import { Flex } from "@chakra-ui/react";
import { useChess } from "../../contexts/ChessContext";
import { useDrop } from "react-dnd";
import { Square as Sq } from "chess.js";
import Notation from "./Notation";
import { ArrowColor } from "../../types";

type SquareProps = {
  children: React.ReactNode;
  row: number;
  col: number;
  square: Sq;
  squareColor: "w" | "b";
  onSetRect: (sq: Sq, rect: DOMRect) => void;
};

export default function Square({
  children,
  row,
  col,
  square,
  squareColor,
  onSetRect,
}: SquareProps) {
  const {
    moves,
    moveMethod,
    squareStyle,
    lastMove,
    leftClick,
    breakIndex,
    onLeftClickDown,
    onClearLeftClick,
    onRightClickUp,
    onRightClickDown,
    onClearRightClicks,
    onClearArrows,
    onDropPiece,
  } = useChess();

  const [style, setStyle] = useState<CSSProperties>();

  const squareRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "piece",
      drop: (item: { square: Sq }) => {
        onDropPiece(item.square, square);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [moves, breakIndex]
  );

  const initialStyle = useMemo(
    (): CSSProperties => ({
      background:
        squareColor === "b"
          ? squareStyle["default.dark"]
          : squareStyle["default.light"],
      boxShadow: isOver ? squareStyle["over"] : "none",
    }),
    [isOver, squareStyle]
  );

  useEffect(() => {
    setStyle(initialStyle);
  }, [isOver, squareStyle]);

  useEffect(() => {
    if (squareRef.current) {
      const rect = squareRef.current.getBoundingClientRect();
      onSetRect(square, rect);
    }
  }, [squareRef.current]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      //clear right click
      onClearRightClicks();

      onClearArrows();

      if (!leftClick && !children) return;

      if (!leftClick && lastMove && lastMove.to === square) return;

      if (moveMethod === "d") {
        if (!children) return;
        setStyle((prev) => ({
          ...prev,
          opacity: 0.5,
          boxShadow: squareStyle["over"],
          background: squareStyle["highlight"],
        }));
        return;
      }

      //set left click
      onLeftClickDown(square);
    }

    if (e.button === 2) {
      //clear left click
      onClearLeftClick();
      //set right click
      onRightClickDown(square);
    }
  };

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      if (moveMethod === "d") {
        setStyle(initialStyle);
        return;
      }
    }

    if (e.button === 2) {
      let color: ArrowColor = "arrow:default";
      if (e.ctrlKey) color = "arrow:ctrl";
      if (e.altKey) color = "arrow:alt";
      if (e.shiftKey) color = "arrow:shift";
      onRightClickUp(square, color);
    }
  };

  return (
    <Flex
      ref={drop}
      style={style}
      className={`square square-${col + 1}${8 - row}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <Flex ref={squareRef} w="full" h="full" align="center" justify="center">
        {children}
      </Flex>
      <Notation r={row} c={col} isBlack={squareColor === "b"} />
    </Flex>
  );
}
