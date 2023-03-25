import { IoCameraReverseOutline } from "react-icons/io5";
import { useChess } from "../../../../contexts/ChessContext";
import SmallControl from "../Bases/SmallControl";

export default function Reverse() {
  const { onDownload } = useChess();

  return (
    <SmallControl
      label="Reverse"
      icon={IoCameraReverseOutline}
      onClick={onDownload}
    />
  );
}
