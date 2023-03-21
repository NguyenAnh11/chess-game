import { Flex } from "@chakra-ui/react";
import Download from "./Download";
import Resign from "./Resign";
import Setting from "./Setting";

export default function BottomControls(){
    return (
        <Flex w="full" justify="space-between">
            <Flex w="full" flexDirection="row">
                <Download/>
                <Setting/>
            </Flex>
            <Flex>
                <Resign/>
            </Flex>
        </Flex>
    )
}