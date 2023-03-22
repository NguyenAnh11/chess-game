import { TbDownload } from "react-icons/tb";
import { useChess } from "../../../../contexts/ChessContext";
import SmallControl from "../Bases/SmallControl";

export default function Download() {
  const { onDownload } = useChess();

  return (
    <SmallControl label="Download" icon={TbDownload} onClick={onDownload} />
  );
}
