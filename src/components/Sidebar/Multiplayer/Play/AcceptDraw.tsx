import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import Button from "../../../Common/Button/Default";
import { IoClose } from "react-icons/io5";
import { BiCheck } from "react-icons/bi";
import { useRoom } from "../../../../contexts/RoomContext";

export default function AcceptDraw() {
  const { onAcceptOrRejectGameDraw } = useRoom();

  const onAccept = () => {
    onAcceptOrRejectGameDraw(true);
  };

  const onDeny = () => {
    onAcceptOrRejectGameDraw(false);
  };

  return (
    <Flex direction="column" flexGrow="1" justify="center" align="center">
      <Text color="#666564">Accept Draw ?</Text>
      <Flex my="10px">
        <Box mr="4">
          <Button label="Deny" size="lg" variant="basic" onClick={onDeny}>
            <Icon as={IoClose} fontSize="3xl" color="#666463" />
          </Button>
        </Box>
        <Button label="Accept" size="lg" variant="primary" onClick={onAccept}>
          <Icon as={BiCheck} fontSize="3xl" color="#fff" />
        </Button>
      </Flex>
    </Flex>
  );
}
