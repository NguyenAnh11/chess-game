import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import QuickLink from "../components/Common/QuickLink";
import { useUser } from "../contexts/UserContext";
import Layout from "../layout";

export default function Home() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <Layout bgColor="#312e2b">
      <Flex cursor="pointer" direction="column" justify="space-between">
        <Flex minH="60px" mb="5">
          <Image
            height="50px"
            width="50px"
            mx="4"
            src="https://www.chess.com/bundles/web/images/color-icons/cup.svg"
          />
          <Box flex="1">
            <Text color="#fff" fontSize="md" fontWeight="semibold" lineHeight="none">
              Hi {user?.name}. Let's Play
            </Text>
          </Box>
        </Flex>
        <Flex
          color="#312e2b"
          flex="1"
          direction="column"
          gap="13px"
          justify="space-between"
        >
          <QuickLink
            title="New Game"
            bgUrl="https://www.chess.com/bundles/web/images/color-icons/playwhite.9673f38c.svg"
            onClick={() => navigate("/online")}
          />
          <QuickLink
            title="vs Computer"
            bgUrl="https://www.chess.com/bundles/web/images/color-icons/computer.2318c3b4.svg"
            onClick={() => navigate("/offline")}
          />
        </Flex>
      </Flex>
    </Layout>
  );
}
