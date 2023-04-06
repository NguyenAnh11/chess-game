import React from "react";
import { useChess } from "../../contexts/ChessContext";

export default function Arrows() {
  const { arrows } = useChess();

  return (
    <div></div>
    // <svg className="arrows">
    //   {arrows.map((_, index) => {

    //     return (
    //       <React.Fragment key={index}>

    //       </React.Fragment>
    //     );
    //   })}
    // </svg>
  );
}
