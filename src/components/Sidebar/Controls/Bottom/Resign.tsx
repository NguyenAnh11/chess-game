import { Box } from "@chakra-ui/react";
import { useChess } from "../../../../contexts/ChessContext";

export default function Resign() {
    const { onResign } = useChess();
    return (
        <Box onClick={onResign}></Box>
    )
}