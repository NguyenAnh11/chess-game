import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

type LayoutProps = {
  bgColor?: string;
  children: ReactNode;
};

export default function Layout({ bgColor = "#fff", children }: LayoutProps) {
  return (
    <Flex
      h="100vh"
      bgColor={bgColor}
      align="center"
      justify="center"
      userSelect="none"
    >
      <Flex pos="relative" h="min-content">
        {children}
      </Flex>
    </Flex>
  );
}
