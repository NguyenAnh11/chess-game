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
import { GiShakingHands } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Common/Modal";
import CreateGame from "../components/Main/CreateGame";
import Layout from "../layout";
import { GameColorOptions } from "../types";
import { GAME_DURATION_OPTIONS } from "../utils";
import { useSocket } from "../contexts/SocketContext";
import { useUser } from "../contexts/UserContext";
import { Color } from "chess.js";
import { SOCKET_EVENTS } from "../services/Socket";

export default function Online() {
  const navigate = useNavigate();
  const { onSetUserColor } = useUser();
  const { ws } = useSocket();
  const [code, setCode] = useState("");
  const [color, setColor] = useState<GameColorOptions>("w");
  const [duration, setDuration] = useState(
    GAME_DURATION_OPTIONS.rapid["10 min"]
  );
  const [isOpenCreateGameModal, setIsOpenCreateGameModal] = useState(false);

  const onJoin = () => {
    if (!code) {
      alert("Enter room code");
      return;
    }

    navigate(`/live/${code}`);
  };

  const onCreate = () => {
    const model = {
      duration: duration.value,
    };

    ws.emit(SOCKET_EVENTS.CREATE_GAME, { model });
  };

  useEffect(() => {
    ws.on(SOCKET_EVENTS.ROOM_CREATED, ({ code }: { code: string }) => {
      navigate(`/live/${code}`);
    });

    return () => {
      ws.off(SOCKET_EVENTS.ROOM_CREATED);
    };
  }, []);

  useEffect(() => {
    let selectedColor = color;
    if (selectedColor === "random") {
      const colors: Color[] = ["w", "b"];
      selectedColor = colors[Math.floor(Math.random() * colors.length)];
    }

    onSetUserColor(selectedColor as Color);
  }, [color]);

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
        content={
          <CreateGame
            color={color}
            onSetColor={setColor}
            duration={duration}
            onSetDuration={setDuration}
          />
        }
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
