import React from "react";
import { useChess } from "../../contexts/ChessContext";
import { getCoord, getRelativeCoord } from "../../utils";

export default function Arrows() {
  const { arrows, orientation, squareStyle } = useChess();

  return (
    <svg
      width="576"
      height="576"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      {arrows.map((arrow, index) => {
        const source = getCoord(arrow.source, orientation);
        const target = getCoord(arrow.target, orientation);

        const from = getRelativeCoord(source);
        const to = getRelativeCoord(target);

        return (
          <React.Fragment key={index}>
            <defs>
              <marker
                id="arrowhead"
                markerWidth="2"
                markerHeight="2.5"
                refX="1.25"
                refY="1.25"
                orient="auto"
              >
                <polygon
                  points="0 0, 2 1.25, 0 2.5"
                  style={{ fill: squareStyle[arrow.color], opacity: 0.8 }}
                />
              </marker>
            </defs>
            <line
              x1={from.col}
              y1={from.row}
              x2={to.col}
              y2={to.row}
              style={{
                stroke: squareStyle[arrow.color],
                strokeWidth: 16,
              }}
              markerEnd="url(#arrowhead)"
            />
          </React.Fragment>
        );
      })}
    </svg>
  );
}
