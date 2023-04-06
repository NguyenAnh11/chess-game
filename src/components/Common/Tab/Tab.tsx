import { Box, Icon, Text } from "@chakra-ui/react";
import cn from "classnames";
import css from "./tab.module.css";
import { TabContent } from "../../../types";

type TabProps = {
  index: number;
  selected: boolean;
  tab: TabContent;
  onChangeTab: (index: number) => void;
};

export function Tab({ index, selected, tab, onChangeTab }: TabProps) {
  return (
    <Box
      className={cn(css.tabs_tab, { [css.tabs_tab_active]: selected })}
      onClick={() => onChangeTab(index)}
    >
      <Icon
        as={tab.icon}
        className={cn(css.tabs_icon, { [css.tabs_icon_active]: selected })}
      />
      <Text
        className={cn(css.tabs_label, { [css.tabs_label_active]: selected })}
      >
        {tab.label}
      </Text>
    </Box>
  );
}
