import { Box, Flex } from "@chakra-ui/react";
import SelectBot from "./SelectBot";
import SelectAsPlayer from "./SelectAsPlayer";
import Button from "../../../Common/Button/Default";
import { useGame } from "../../../../contexts/GameContext";

export default function SelectionSidebar() {
  const { onSetGameReady } = useGame();

  return (
    <Flex
      pos="relative"
      direction="column"
      flexShrink="0"
      h="full"
      bgColor="#fff"
    >
      <SelectBot />
      <SelectAsPlayer />
      <Box
        pt="4"
        px="6"
        pb="7"
        w="full"
        h="100px"
        bg="#f1f1f1"
        display="block"
        zIndex={1}
      >
        <Button label="Play" size="lg" variant="primary" onClick={() => onSetGameReady()}>
          Play
        </Button>
      </Box>
    </Flex>
  );
}
