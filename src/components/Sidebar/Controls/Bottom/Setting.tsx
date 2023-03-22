import { Box, Button, Icon, Tooltip } from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { useChess } from "../../../../contexts/ChessContext";

export default function Setting() {
  const { onSetting } = useChess();

  return (
    <Tooltip placement="top" label="Setting" openDelay={500}>
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
        onClick={onSetting}
      >
        <Box
          fontSize="2xl"
          fontWeight="400"
          display="inline-block"
          lineHeight="1"
          onClick={() => {}}
        >
          <Icon as={FiSettings} />
        </Box>
      </Button>
    </Tooltip>
  );
}
