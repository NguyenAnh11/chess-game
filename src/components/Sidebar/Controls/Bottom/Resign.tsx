import { BsFlag } from "react-icons/bs";
import { useChess } from "../../../../contexts/ChessContext";
import SmallControl from "../Bases/SmallControl";

export default function Resign() {
  const { onResign } = useChess();

  return (
    <SmallControl label="Resign" icon={BsFlag} onClick={onResign} />
  )
}
