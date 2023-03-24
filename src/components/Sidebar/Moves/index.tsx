import { Flex, Box } from "@chakra-ui/react";
import MoveList from "./MoveList";

export default function MoveContainer() {
    return (
        <Flex flex="4" direction="column" overflow="hidden">
            <Box overflow="auto">
                <MoveList/>
            </Box>
        </Flex>
    )
}