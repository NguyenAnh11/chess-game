import {
  Button,
  Flex,
  Input,
  StackDivider,
  VStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { GiShakingHands } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Common/Modal";
import CreateGame from "../components/Main/CreateGame";
import Layout from "../layout";
import { GameColorOptions } from "../types";
import { GAME_DURATION_OPTIONS } from "../utils";
import { useSocket } from "../contexts/SocketContext";

export default function Online() {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [code, setCode] = useState("");
  const [color, setColor] = useState<GameColorOptions>("w");
  const [duration, setDuration] = useState(GAME_DURATION_OPTIONS.rapid["10 min"]);
  const [isOpenCreateGameModal, setIsOpenCreateGameModal] = useState(false);

  const onJoin = () => {
    if (!code) {
      alert("Enter room code");
      return;
    }

    navigate(`/room/${code}`);
  };

  const onCreate = () => {
    const code = uuidv4();

    const model = {
      code,
      color,
      duration: duration.value
    }

    console.log(model);
  };

  useEffect(() => {
    socket.on("room_created", () => {
      
    })
  }, [])

  return (
    <Layout>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        <Flex w="full">
          <Input
            mr="4"
            type="text"
            value={code}
            aria-label="Enter room code"
            placeholder="Enter room code"
            onChange={(e) => setCode(e.target.value)}
          />
          <Button
            aria-label="Join game"
            colorScheme="whatsapp"
            onClick={onJoin}
          >
            <Text p="2" fontWeight="semibold">
              Join Game
            </Text>
          </Button>
        </Flex>
        <Flex justify="center" w="full" mt="4">
          <Button
            aria-label="Play as friend"
            colorScheme="blue"
            leftIcon={<Icon as={GiShakingHands} />}
            onClick={() => setIsOpenCreateGameModal(true)}
          >
            <Text fontWeight="semibold">Play a friend</Text>
          </Button>
        </Flex>
      </VStack>
      <Modal
        isOpen={isOpenCreateGameModal}
        onClose={() => setIsOpenCreateGameModal(false)}
        content={<CreateGame color={color} onSetColor={setColor} duration={duration} onSetDuration={setDuration}/>}
        footer={
          <>
            <Button
              aria-label="Cancel"
              colorScheme="red"
              onClick={() => setIsOpenCreateGameModal(false)}
            >
              <Text fontWeight="semibold">Cancel</Text>
            </Button>
            <Button
              aria-label="Create game"
              colorScheme="whatsapp"
              onClick={onCreate}
            >
              <Text fontWeight="semibold">Create game</Text>
            </Button>
          </>
        }
      ></Modal>
    </Layout>
  );
}
