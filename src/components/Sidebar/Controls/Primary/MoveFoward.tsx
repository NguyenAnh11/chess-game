import { IoChevronForward } from "react-icons/io5";
import { useChess } from "../../../../contexts/ChessContext";
import DefaultControl from "../Bases/DefaultControl";

export default function MoveFoward() {
  const { onMoveFoward } = useChess();

  return (
    <DefaultControl
      label="Move Foward"
      icon={IoChevronForward}
      onClick={onMoveFoward}
    />
  );
}
