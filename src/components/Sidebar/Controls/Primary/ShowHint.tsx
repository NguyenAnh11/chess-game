import { Box, Button, Icon, Tooltip } from "@chakra-ui/react";
import { HiLightBulb } from "react-icons/hi";
import { useChess } from "../../../../contexts/ChessContext";

export default function ShowHint() {
  const { onShowHint } = useChess();

  return (
    <Tooltip placement="top" label="Show Hint" openDelay={500}>
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
        onClick={onShowHint}
      >
        <Box color="#666463" sx={{ _hover: { color: "#504f4f" } }}>
          <Icon as={HiLightBulb} />
        </Box>
      </Button>
    </Tooltip>
  );
}
