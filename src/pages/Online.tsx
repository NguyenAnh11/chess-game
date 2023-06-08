import {
  Button,
  Flex,
  Input,
  StackDivider,
  VStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { GiShakingHands } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Common/Modal";
import CreateGame from "../components/Main/CreateGame";
import Layout from "../layout";
import { CreateGameModel } from "../types";
import { CREATE_GAME_DURATION_OPTIONS } from "../utils";

export default function Online() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isOpenCreateGameModal, setIsOpenCreateGameModal] = useState(false);
  const [game, setGame] = useState<CreateGameModel>({
    color: "w",
    duration: {
      text: "10 min",
      value: CREATE_GAME_DURATION_OPTIONS["10 min"]
    }
  });

  const onJoin = () => {
    if (!code) {
      alert("Enter room code");
      return;
    }

    navigate(`/room/${code}`);
  };

  const onCreate = () => {
    
  };

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
        content={<CreateGame game={game} onSetGame={setGame} />}
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
