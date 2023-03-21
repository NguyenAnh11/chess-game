import { Box, Button, Icon } from "@chakra-ui/react";
import { BsFlag } from "react-icons/bs";
import { useChess } from "../../../../contexts/ChessContext";

export default function Resign() {
  const { onResign } = useChess();
  return (
    <Button
      bg="transparent"
      border="none"
      gap="1"
      minH="7"
      maxH="7"
      p="0"
      m="0"
      color="#666564"
      sx={{ _hover: { bg: "none" } }}
    >
      <Box
        fontSize="2xl"
        fontWeight="400"
        display="inline-block"
        lineHeight="1"
        onClick={onResign}
      >
        <Icon as={BsFlag} />
      </Box>
    </Button>
  );
}
