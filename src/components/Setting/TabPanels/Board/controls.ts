import {
  SettingProps,
  BoardSetting,
  FieldControl,
  FieldSelectControl,
  FieldSwitchControl,
} from "../../../../types";

export const getFieldControls = ({
  setting,
  onChange,
}: SettingProps<BoardSetting>): FieldControl<BoardSetting>[] => {
  return [
    new FieldSelectControl<BoardSetting>(
      "pieceColor",
      "Pieces",
      setting.pieceColor,
      onChange,
      [
        { label: "Neo", value: "neo" },
        { label: "Wood", value: "wood" },
        { label: "Neo Wood", value: "neo_wood" },
        { label: "Book", value: "book" }
      ]
    ),
    new FieldSelectControl<BoardSetting>(
      "squareColor",
      "Board",
      setting.squareColor,
      onChange,
      [
        { label: "Green", value: "green" },
        { label: "Bases", value: "bases" },
      ]
    ),
    new FieldSelectControl<BoardSetting>(
      "moveMethod",
      "Move Method",
      setting.moveMethod,
      onChange,
      [
        { label: "Drag and Click", value: "dc" },
        { label: "Drag", value: "d" },
        { label: "Click", value: "c" },
      ]
    ),
    new FieldSwitchControl<BoardSetting>(
      "playSound",
      "Play Sounds",
      setting.playSound,
      onChange
    ),
    new FieldSelectControl<BoardSetting>(
      "animation",
      "Animation",
      setting.animation,
      onChange,
      [
        { label: "None", value: "none" },
        { label: "Slow", value: "slow" },
        { label: "Medium", value: "medium" },
        { label: "Fast", value: "fast" },
      ]
    ),
    new FieldSwitchControl<BoardSetting>(
      "highlightMove",
      "Highlight Move",
      setting.highlightMove,
      onChange
    ),
    new FieldSwitchControl<BoardSetting>(
      "showHintMove",
      "Show legal Move",
      setting.showHintMove,
      onChange
    ),
    new FieldSwitchControl<BoardSetting>(
      "showArrow",
      "Arrow",
      setting.showArrow,
      onChange
    ),
  ];
};
