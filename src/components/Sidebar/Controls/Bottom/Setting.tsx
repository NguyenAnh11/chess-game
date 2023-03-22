import { FiSettings } from "react-icons/fi";
import { useChess } from "../../../../contexts/ChessContext";
import SmallControl from "../Bases/SmallControl";

export default function Setting() {
  const { onSetting } = useChess();

  return <SmallControl label="Setting" icon={FiSettings} onClick={onSetting} />;
}
