import { Box, Icon, Tooltip } from "@chakra-ui/react";
import LiveButton from "../../../Common/Button/Live";
import { BsShareFill } from "react-icons/bs";

type PlayEndGameControlsProps = {};

export default function PlayEndGameControls({}: PlayEndGameControlsProps) {
  const onShare = () => {};

  return (
    <Box mr="0.5" fontSize="xl" color="#8b8987">
      <Tooltip label="Sharing">
        <LiveButton label="Sharing" onClick={onShare}>
          <Icon as={BsShareFill} />
        </LiveButton>
      </Tooltip>
    </Box>
  );
}
