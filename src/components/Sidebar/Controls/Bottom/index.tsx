import { Flex } from "@chakra-ui/react";
import Resign from "./Resign";
import Setting from "./Setting";

export default function BottomControls(){
    return (
        <Flex w="full" justify="space-between">
            <Setting/>
            <Resign/>
        </Flex>
    )
}