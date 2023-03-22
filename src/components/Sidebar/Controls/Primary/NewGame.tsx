import { IoAdd } from "react-icons/io5";
import { useChess } from "../../../../contexts/ChessContext";
import DefaultControl from "../Bases/DefaultControl";

export default function NewGame() {
  const { onNewGame } = useChess();

  return <DefaultControl label="New Game" icon={IoAdd} onClick={onNewGame} />;
}
