import { useState, Dispatch, SetStateAction, ReactNode } from "react";
import { Box, Flex, Grid, Icon, Text } from "@chakra-ui/react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { BiTimer, BiSun } from "react-icons/bi";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Button from "../../Common/Button/Selector";
import TimeSelector from "../../Common/Button/TimeSelector";
import { GAME_DURATION_OPTIONS } from "../../../utils";
import { GameDurationType } from "../../../types";

type CreateGameTimerProps = {
  duration: { text: string; value: number };
  onSetDuration: Dispatch<SetStateAction<{ text: string; value: number }>>;
};

export default function CreateGameTimer({
  duration,
  onSetDuration,
}: CreateGameTimerProps) {
  const [isShow, setIsShow] = useState(false);

  const durationOptions: {
    [t in GameDurationType]: {
      label: string;
      icon: ReactNode;
      options: (typeof GAME_DURATION_OPTIONS)[t];
    };
  } = {
    blitz: {
      label: "Blitz",
      icon: <Icon as={AiOutlineThunderbolt} color="#f1ab22" fontSize="xl" />,
      options: GAME_DURATION_OPTIONS["blitz"],
    },
    rapid: {
      label: "Rapid",
      icon: <Icon as={BiTimer} color="#769656" fontSize="xl" />,
      options: GAME_DURATION_OPTIONS["rapid"],
    },
    daily: {
      label: "Daily",
      icon: <Icon as={BiSun} color="#f1ab22" fontSize="xl" />,
      options: GAME_DURATION_OPTIONS["daily"],
    },
  };

  return (
    <Box mb="4">
      <Button onClick={() => setIsShow(!isShow)}>
        <Icon as={BiTimer} color="#769656" fontSize="2xl" />
        <Text
          fontSize="17px"
          color="#4b4847"
          overflow="hidden"
          whiteSpace="nowrap"
          fontWeight="semibold"
          textOverflow="ellipsis"
          maxW="calc(100% - 100px)"
        >
          {duration.text}
        </Text>
        <Box pos="absolute" right="16px" fontSize="20px" color="#8b8897">
          {!isShow ? <Icon as={BsChevronDown} /> : <Icon as={BsChevronUp} />}
        </Box>
      </Button>
      {isShow && (
        <Flex
          direction="column"
          overflow="auto"
          minH="0"
          maxH="calc(100vh-550px)"
        >
          {(Object.keys(durationOptions) as Array<GameDurationType>).map(
            (type) => (
              <Box key={type} mt="4">
                <Flex align="center" direction="row" gap="2px" mb="2">
                  {durationOptions[type].icon}
                  <Text
                    color="#4b4847"
                    fontSize="sm"
                    fontWeight="semibold"
                    textTransform="capitalize"
                  >
                    {durationOptions[type].label}
                  </Text>
                </Flex>
                <Grid gap="8px" gridTemplateColumns="repeat(3, 1fr)">
                  {Object.values(durationOptions[type].options).map(
                    (option, index) => (
                      <TimeSelector
                        key={index}
                        label={option.text}
                        value={option.value}
                        isSelected={option.text === duration.text}
                        onClick={() => onSetDuration(option)}
                      >
                        <Text>{option.text}</Text>
                      </TimeSelector>
                    )
                  )}
                </Grid>
              </Box>
            )
          )}
        </Flex>
      )}
    </Box>
  );
}
