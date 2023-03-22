import { HiLightBulb } from "react-icons/hi";
import { useChess } from "../../../../contexts/ChessContext";
import DefaultControl from "../Bases/DefaultControl";

export default function ShowHint() {
  const { onShowHint } = useChess();

  return (
    <DefaultControl label="Show Hint" icon={HiLightBulb} onClick={onShowHint} />
  );
}
