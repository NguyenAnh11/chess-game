import { Box, Button, Icon, Tooltip } from "@chakra-ui/react";
import { BsFlag } from "react-icons/bs";
import { useChess } from "../../../../contexts/ChessContext";

export default function Resign() {
  const { onResign } = useChess();

  return (
    <Tooltip placement="top" label="Move Back" openDelay={500}>
      <Button
        bg="transparent"
        border="none"
        gap="1"
        h="7"
        w="7"
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
    </Tooltip>
  );
}
