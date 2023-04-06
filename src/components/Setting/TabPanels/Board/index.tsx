import { useMemo } from "react";
import { BoardSetting, SettingProps } from "../../../../types";
import BoardPreview from "./Preview";
import EditForm from "../../EditForm";
import { getFieldControls } from "./controls";
import { TabPanel } from "../../../Common/Tab";

export default function BoardPanel({
  setting,
  onChange,
}: SettingProps<BoardSetting>) {
  const controls = useMemo(
    () => getFieldControls({ setting, onChange }),
    [setting]
  );

  return (
    <TabPanel>
      <BoardPreview piece={setting.pieceColor} square={setting.squareColor} />
      <EditForm controls={controls} />
    </TabPanel>
  );
}
