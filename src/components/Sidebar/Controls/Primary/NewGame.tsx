import { Box, Icon, Button, Tooltip } from "@chakra-ui/react";
import { IoAdd } from "react-icons/io5";
import { useChess } from "../../../../contexts/ChessContext";

export default function NewGame() {
  const { onNewGame } = useChess();

  return (
    <Tooltip placement="top" label="New Game" openDelay={500}>
      <Button
        mb="1px"
        px="5"
        py="1.5"
        h="12"
        bg="#dbd9d7"
        overflow="hidden"
        boxShadow="0 0.1rem 0 0 #bdbcb8, 0 0.7rem 0.95rem 0.05rem transparent"
        fontSize="3xl"
        sx={{ _hover: { bg: "transparent" } }}
        onClick={onNewGame}
      >
        <Box color="#666463" sx={{ _hover: { color: "#504f4f" } }}>
          <Icon as={IoAdd} />
        </Box>
      </Button>
    </Tooltip>
  );
}
