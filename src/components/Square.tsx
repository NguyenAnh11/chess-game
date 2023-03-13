import React, {
  CSSProperties,
  useEffect,
  MouseEvent,
  useState,
  useMemo,
} from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useChess } from "../contexts/ChessContext";
import { useDrop } from "react-dnd";
import { Square as Sq } from "chess.js";
import { SquareStyle } from "../types";

type PossibleMoveProps = {
  isBlack: boolean;
  width: number;
  squareStyle: SquareStyle;
};

function PossibleMove({ width, isBlack, squareStyle }: PossibleMoveProps) {
  const style = useMemo((): CSSProperties => {
    return {
      position: "absolute",
      borderRadius: "50%",
      width: `${width / 4}px`,
      height: `${width / 4}px`,
      backgroundColor: isBlack
        ? squareStyle["legal:dark"]
        : squareStyle["legal:light"],
    };
  }, [isBlack, width]);

  return <Box style={style} />;
}

type SquareProps = {
  children: React.ReactNode;
  r: number;
  c: number;
  square: Sq;
  isBlack: boolean;
};

export default function Square({ children, square, isBlack }: SquareProps) {
  const { width, moveMethod, squareStyle, onDropPiece, onLeftClickDown } =
    useChess();

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
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: isOver ? squareStyle.over : "none",
    };

    return style;
  }, [width, isOver, isBlack]);

  const [style, setStyle] = useState<CSSProperties>();

  useEffect(() => {
    setStyle(initialStyle);
  }, [width, isOver]);

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
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      {children}
    </Flex>
  );
}
