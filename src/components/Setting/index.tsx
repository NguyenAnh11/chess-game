import { useState, useMemo } from "react";
import { FaChessBoard, FaPlaystation } from "react-icons/fa";
import { useSetting } from "../../contexts/SettingContext";
import { ControlValue, Setting } from "../../types";
import Modal from "../Common/Modal";
import Button from "../Common/Button";
import { TabList } from "../Common/Tab";
import BoardPanel from "./TabPanels/Board";
import PlayPanel from "./TabPanels/Play";
import { isEqual } from "lodash";

export default function GameSetting() {
  const { setting, onSetting, isOpenEditSetting, onOpenEditSetting } =
    useSetting();

  const [tabIndex, setTabIndex] = useState(0);
  const [data, setData] = useState<Setting>(setting);

  const onChange = <T,>(
    prefix: keyof Setting,
    name: keyof T,
    value: ControlValue
  ) => {
    setData((prev) => ({
      ...prev,
      [prefix]: { ...prev[prefix], [name]: value },
    }));
  };

  const onChangeTab = (index: number) => setTabIndex(index);

  const tabs = useMemo(
    () => [
      {
        icon: FaChessBoard,
        label: "Board",
        component: (
          <BoardPanel
            setting={data.board}
            onChange={(name, value) => onChange("board", name, value)}
          />
        ),
      },
      {
        icon: FaPlaystation,
        label: "Play",
        component: (
          <PlayPanel
            setting={data.play}
            onChange={(name, value) => onChange("play", name, value)}
          />
        ),
      },
    ],
    [data]
  );

  const onCancel = () => onOpenEditSetting(false);

  const onSave = () => {
    onSetting(data);
    onOpenEditSetting(false);
  };

  const isDisabledSaveBtn = useMemo(
    (): boolean => isEqual(data, setting),
    [data, setting]
  );

  return (
    <Modal
      isOpen={isOpenEditSetting}
      onClose={() => onOpenEditSetting(false)}
      content={
        <>
          <TabList tabIndex={tabIndex} tabs={tabs} onChangeTab={onChangeTab} />
          {tabs[tabIndex].component}
        </>
      }
      footer={
        <>
          <Button label="Cancel" variant="basic" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            label="Save"
            disabled={isDisabledSaveBtn}
            variant="primary"
            onClick={onSave}
          >
            Save
          </Button>
        </>
      }
    />
  );
}
