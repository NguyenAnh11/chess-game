import { Flex } from "@chakra-ui/react";
import { useSetting } from "../../contexts/SettingContext";
import GameControls from "./AI/Controls";
import MoveContainer from "./AI/Moves";

export default function BoardSidebar() {
  const { mode } = useSetting();

  return (
    <Flex direction="column" ml="3" w="350px" h="full" bg="white">
      {mode === "AI" && (
        <>
          <MoveContainer />
          <GameControls />
        </>
      )}
    </Flex>
  );
}
