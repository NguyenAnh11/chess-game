import React, {
  CSSProperties,
  useEffect,
  MouseEvent,
  useState,
  useMemo,
  useRef,
} from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useChess } from "../contexts/ChessContext";
import { useDrop } from "react-dnd";
import { Square as Sq } from "chess.js";
import Notation from "./Notation";

type SquareProps = {
  children: React.ReactNode;
  r: number;
  c: number;
  square: Sq;
  isBlack: boolean;
};

export default function Square({
  children,
  r,
  c,
  square,
  isBlack,
}: SquareProps) {
  const {
    width,
    moveMethod,
    squareStyle,
    coordinate,
    onDropPiece,
    onLeftClickDown,
    setSquareCoords,
  } = useChess();

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
    []
  );

  const initialStyle = useMemo((): CSSProperties => {
    let style: CSSProperties = {
      position: "relative",
      display: "flex",
      width: width / 8,
      height: width / 8,
      backgroundColor: isBlack
        ? squareStyle["default.dark"]
        : squareStyle["default.light"],
      boxShadow: isOver ? squareStyle.over : "none",
    };

    return style;
  }, [width, isOver, isBlack]);

  const [style, setStyle] = useState<CSSProperties>();

  useEffect(() => {
    setStyle(initialStyle);
  }, [width, isOver, isBlack]);

  useEffect(() => {
    if (squareRef.current) {
      const { x, y } = squareRef.current.getBoundingClientRect();
      setSquareCoords((prev) => ({ ...prev, [square]: { x, y} }));
    }
  }, [width]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      if (moveMethod === "d") {
        if (!children) return;

        setStyle((prev) => ({
          ...prev,
          backgroundColor: isBlack
            ? squareStyle["highlight:dark"]
            : squareStyle["highlight:light"],
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
    <Box
      ref={drop}
      style={style}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <Flex ref={squareRef} w="100%" h="100%">
        {children}
        {coordinate !== "none" && <Notation r={r} c={c} isBlack={isBlack} />}
      </Flex>
    </Box>
  );
}
