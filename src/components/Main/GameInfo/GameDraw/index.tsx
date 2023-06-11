import GameInfoUser from "../User";
import css from "../gameinfo.module.css";
import { UserPlayInfo } from "../../../../types";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { RiTimerLine } from "react-icons/ri";

type GameDrawUserProps = {
  users: UserPlayInfo[];
};

export default function GameDrawUser({ users }: GameDrawUserProps) {
  return (
    <div className={css.modal_game_info_players}>
      <GameInfoUser user={users[0]} />
      <Flex pt="2" pos="relative" width="50px" textAlign="center">
        <Icon as={RiTimerLine} fontSize="40px" color="#769656" />
        <Box
          pos="absolute"
          bottom="-30px"
          width="full"
          whiteSpace="nowrap"
          color="#8a8886"
        >
          <Text>½-½</Text>
        </Box>
      </Flex>
      <GameInfoUser user={users[1]} />
    </div>
  );
}
