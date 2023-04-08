import { useMemo } from "react";
import { PlaySetting, SettingProps } from "../../../../types";
import { TabPanel } from "../../../Common/Tab/TabPanel";
import EditForm from "../../EditForm";
import { getFieldControls } from "./controls";

export default function PlayPanel({
  setting,
  onChange,
}: SettingProps<PlaySetting>) {
  const controls = useMemo(
    () => getFieldControls({ setting, onChange }),
    [setting]
  );

  return (
    <TabPanel>
      <EditForm controls={controls} />
    </TabPanel>
  );
}
