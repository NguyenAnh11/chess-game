import { Flex, Image, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { useGame } from "../../../../contexts/GameContext";
import { useUser } from "../../../../contexts/UserContext";

export default function SelectBot() {
  const { user } = useUser();
  const { game } = useGame();

  const aiPlayer = useMemo(
    () => game.members.find((p) => p.id !== user!.id)!,
    []
  );

  return (
    <Flex
      direction="column"
      flexShrink="0"
      align="center"
      mb="30px"
      px="35px"
      py="8px"
      textAlign="center"
      background="radial-gradient(900px 280px at top center, #f1f1f1 40%, transparent 0)"
    >
      <Text color="#312e2b" fontSize="36px" fontWeight="extrabold" mb="10px">
        <span>Play vs...</span>
      </Text>
      <Flex mt="6px">
        <Image
          w="100px"
          h="100px"
          borderRadius="5px"
          alt={aiPlayer.name}
          src={aiPlayer.avatar}
        />
      </Flex>
      <Flex align="center" maxW="full" mt="10px" fontSize="18px">
        <Text
          mx="6px"
          color="#312e2b"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          fontWeight="extrabold"
        >
          {aiPlayer.name}
        </Text>
        <Flex display="inline-flex" flexShrink="0" align="center" justify="center">
            <Image w="30px" h="30px" src={aiPlayer.countryFlag}/>
        </Flex>
      </Flex>
    </Flex>
  );
}
