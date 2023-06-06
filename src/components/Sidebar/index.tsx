import { Flex } from "@chakra-ui/react";
import { useSetting } from "../../contexts/SettingContext";
import AISidebar from "./AI";
import MultiplayerSidebar from "./Multiplayer";

export default function BoardSidebar() {
  const { mode } = useSetting();

  return (
    <Flex direction="column" ml="3" w="350px" h="full" bg="white">
      {mode === "AI" && (
        <AISidebar/>
      )}
      {mode === "Multiplayer" && (
        <MultiplayerSidebar />
      )}
    </Flex>
  );
}
