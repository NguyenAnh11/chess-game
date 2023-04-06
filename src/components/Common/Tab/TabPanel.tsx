import { ReactNode } from "react";
import css from "./tab.module.css";
import { Box, Flex } from "@chakra-ui/react";

type TabPanelProps = {
  children: ReactNode;
};

export function TabPanel({ children }: TabPanelProps) {
  return (
    <Box className={css.tab_panel}>
      <Flex direction="column" minH="0">
        {children}
      </Flex>
    </Box>
  );
}
