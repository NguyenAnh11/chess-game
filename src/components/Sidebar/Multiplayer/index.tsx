import { useMemo, useState } from "react";
import { MdOutlineTimer } from "react-icons/md";
import { FaChessBoard } from "react-icons/fa";
import PlayPanel from "./Play/PlayPanel";
import GamePanel from "./Game";
import { TabList } from "../../Common/Tab";

export default function MultiplayerSidebar() {
  const [tabIndex, setTabIndex] = useState(0);

  const onChangeTab = (index: number) => setTabIndex(index);

  const tabs = useMemo(() => {
    return [
      {
        icon: MdOutlineTimer,
        label: "Play",
        component: <PlayPanel />,
      },
      {
        icon: FaChessBoard,
        label: "Game",
        component: <GamePanel />,
      },
    ];
  }, []);

  return (
    <>
      <TabList tabIndex={tabIndex} tabs={tabs} onChangeTab={onChangeTab} />
      {tabs[tabIndex].component}
    </>
  );
}
