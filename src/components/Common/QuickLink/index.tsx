import { Flex, Text, Box } from "@chakra-ui/react";

type QuickLinkProps = {
  title: string;
  bgUrl: string;
  onClick: () => void;
};

export default function QuickLink({ title, bgUrl, onClick }: QuickLinkProps) {
  return (
    <Flex
      bg="#fff"
      px="10px"
      border="none"
      align="center"
      fontSize="15px"
      borderRadius="5px"
      fontWeight="semibold"
      columnGap="16px"
      boxShadow="0 5px 0 0 #c7c6c5, 0 0 0 1px rgba(49, 46, 43, 0.06)"
      onClick={onClick}
    >
      <Box w="40px" h="40px" background={`url(${bgUrl}) no-repeat 50%/contain`} />
      <Text flex="1" color="#312e2b" overflow="hidden" textOverflow="ellipsis">
        {title}
      </Text>
    </Flex>
  );
}
