import { Button, Box, Icon, Tooltip } from "@chakra-ui/react";
import { TbDownload } from "react-icons/tb";
import { useChess } from "../../../../contexts/ChessContext";

export default function Download() {
  const { onDownload } = useChess();

  return (
    <Tooltip placement="top" label="Download" openDelay={500}>
      <Button
        bg="transparent"
        border="none"
        gap="1"
        h="7"
        w="7"
        p="0"
        m="0"
        color="#666"
        sx={{ _hover: { bg: "none" } }}
      >
        <Box
          fontSize="2xl"
          fontWeight="400"
          display="inline-block"
          lineHeight="1"
          onClick={onDownload}
        >
          <Icon as={TbDownload} />
        </Box>
      </Button>
    </Tooltip>
  );
}
