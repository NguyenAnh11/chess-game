import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { useUser } from "../../../../contexts/UserContext";
import SeletedBot from "./SelectedBot";

export default function SelectionSidebar() {
  const { onSetColor } = useUser();

  return (
    <Flex
      pos="relative"
      direction="column"
      flexShrink="0"
      h="full"
      bgColor="#fff"
    >
      <SeletedBot />
      <Box h="100%" pos="relative" overflow="auto">
        <Flex direction="column" align="center">
          <Text
            fontSize="12px"
            fontWeight="semibold"
            textAlign="center"
            textTransform="uppercase"
          >
            I Play As
          </Text>
          <Grid gap="20px" justifyContent="center" m="13px">
            
          </Grid>
        </Flex>
      </Box>
    </Flex>
  );
}
