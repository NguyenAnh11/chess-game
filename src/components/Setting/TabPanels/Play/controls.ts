import {
  SettingProps,
  PlaySetting,
  FieldControl,
  FieldSwitchControl,
} from "../../../../types";

export const getFieldControls = ({
  setting,
  onChange,
}: SettingProps<PlaySetting>): FieldControl<PlaySetting>[] => {
  return [
    new FieldSwitchControl<PlaySetting>(
      "enablePremove",
      "Enable Premove",
      setting.enablePremove,
      onChange
    ),
    new FieldSwitchControl<PlaySetting>(
      "alwaysPromoteToQueen",
      "Always Promote to Queen",
      setting.alwaysPromoteToQueen,
      onChange
    ),
    new FieldSwitchControl<PlaySetting>(
      "showTimestamps",
      "Show Timestamps",
      setting.showTimestamps,
      onChange
    ),
    new FieldSwitchControl<PlaySetting>(
      "confirmResignDraw",
      "Confirm Resign/Draw?",
      setting.confirmResignDraw,
      onChange
    ),
  ];
};
