import { useState, Dispatch, SetStateAction } from "react";
import { Box, Flex, Grid, Icon, Text } from "@chakra-ui/react";
import { BiTimer } from "react-icons/bi";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Button from "../../Common/Button/Selector";
import TimeSelector from "../../Common/Button/TimeSelector";
import { GAME_DURATION_OPTIONS } from "../../../utils";

type CreateGameTimerProps = {
  duration: { text: string; value: number };
  onSetDuration: Dispatch<SetStateAction<{ text: string; value: number }>>;
};

export default function CreateGameTimer({
  duration,
  onSetDuration,
}: CreateGameTimerProps) {
  const [isShow, setIsShow] = useState(false);
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
          <Box mt="16px">
            <Flex align="center" direction="row" gap="2px" mb="8px">
              <Icon as={BiTimer} color="#769656" fontSize="20px" />
              <Text
                color="#4b4847"
                fontSize="14px"
                fontWeight="semibold"
                textTransform="capitalize"
              >
                Rapid
              </Text>
            </Flex>
            {Object.entries(GAME_DURATION_OPTIONS).map(([type, options]) => (
              <Grid key={type} gap="8px" gridTemplateColumns="repeat(3, 1fr)">
                {Object.values(options).map((option, index) => (
                  <TimeSelector
                    key={index}
                    label={option.text}
                    value={option.value}
                    isSelected={option.text === duration.text}
                    onClick={() => {
                      console.log("Option: ", option);
                      onSetDuration(option);
                    }}
                  >
                    <Text>{option.text}</Text>
                  </TimeSelector>
                ))}
              </Grid>
            ))}
          </Box>
        </Flex>
      )}
    </Box>
  );
}
