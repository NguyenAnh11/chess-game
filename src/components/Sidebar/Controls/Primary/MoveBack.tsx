import { IoChevronBack } from "react-icons/io5";
import { useChess } from "../../../../contexts/ChessContext";
import DefaultControl from "../Bases/DefaultControl";

export default function MoveBack() {
  const { onMoveBack } = useChess();

  return (
    <DefaultControl
      label="Move Back"
      icon={IoChevronBack}
      onClick={onMoveBack}
    />
  );
}
