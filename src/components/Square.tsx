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
  isBlack: boolean;
};

export default function Square({
  children,
  row,
  col,
  square,
  isBlack,
}: SquareProps) {
  const { boardWidth, moveMethod, squareStyle, onDropPiece, onLeftClickDown } =
    useChess();

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
      width: `${boardWidth / 8}px`,
      height: `${boardWidth / 8}px`,
      touchAction: "none",
      backgroundColor: isBlack
        ? squareStyle["default.dark"]
        : squareStyle["default.light"],
      boxShadow: isOver ? squareStyle["over"] : "none",
    }),
    [boardWidth, isOver, isBlack]
  );

  useEffect(() => {
    setStyle(initialStyle);
  }, [boardWidth, isOver]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      if (moveMethod === "d") {
        if (!children) return;
        setStyle((prev) => ({
          ...prev,
          backgroundColor: squareStyle["highlight"],
          opacity: 0.5,
        }));
        return;
      }

      onLeftClickDown(square);
    }

    if (e.button === 2) {
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
      <Notation r={row} c={col} isBlack={isBlack} />
    </Flex>
  );
}
