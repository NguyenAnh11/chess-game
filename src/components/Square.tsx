import React, {
  CSSProperties,
  useEffect,
  MouseEvent,
  useState,
  useMemo,
} from "react";
import { Flex } from "@chakra-ui/react";
import { useChess } from "../contexts/ChessContext";
import { useDrop } from "react-dnd";
import { Square as Sq } from "chess.js";
import "../index.css";
import Notation from "./Notation";

type SquareProps = {
  children: React.ReactNode;
  row: number;
  col: number;
  square: Sq;
  squareColor: "w" | "b";
};

export default function Square({
  children,
  row,
  col,
  square,
  squareColor,
}: SquareProps) {
  const {
    lastMove,
    orientation,
    moveMethod,
    squareStyle,
    onDropPiece,
    onLeftClickDown,
    onClearLeftClick,
    onRightClickDown,
    onClearRightClicks,
  } = useChess();

  const [style, setStyle] = useState<CSSProperties>();

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
    []
  );

  const initialStyle = useMemo(
    (): CSSProperties => ({
      background:
        squareColor === "b"
          ? squareStyle["default.dark"]
          : squareStyle["default.light"],
      boxShadow: isOver ? squareStyle["over"] : "none",
    }),
    [isOver]
  );

  useEffect(() => {
    setStyle(initialStyle);
  }, [isOver]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    console.log('Mouse down')
    if (e.button === 0) {
      //clear right click
      onClearRightClicks();
      debugger;
      if (
        lastMove &&
        lastMove.to === square &&
        lastMove.color !== orientation
      ) {
        setStyle((prev) => ({ ...prev, boxShadow: squareStyle["over"] }));
        return;
      }

      if (moveMethod === "d") {
        if (!children) return;
        setStyle((prev) => ({
          ...prev,
          opacity: 0.5,
          boxShadow: squareStyle["over"],
          backgroundColor: squareStyle["highlight"],
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
      if (
        moveMethod === "d" ||
        (lastMove && lastMove.color !== orientation && lastMove.to === square)
      ) {
        setStyle(initialStyle);
        return;
      }
    }

    if (e.button === 2) {
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
      <Flex
        position="relative"
        w="full"
        h="full"
        align="center"
        justify="center"
      >
        {children}
      </Flex>
      <Notation r={row} c={col} isBlack={squareColor === "b"} />
    </Flex>
  );
}
