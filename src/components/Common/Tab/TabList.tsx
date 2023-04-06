import styles from "./tab.module.css";
import { Box } from "@chakra-ui/react";
import { TabContent } from "../../../types";
import { Tab } from "./Tab";

type TabListProps = {
  tabIndex: number;
  tabs: TabContent[];
  onChangeTab: (index: number) => void;
};

export function TabList({ tabs, tabIndex, onChangeTab }: TabListProps) {
  return (
    <Box className={styles.tab_list}>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          index={index}
          selected={index === tabIndex}
          tab={tab}
          onChangeTab={onChangeTab}
        />
      ))}
    </Box>
  );
}
