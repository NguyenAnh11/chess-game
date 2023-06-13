import { Box, Icon, Tooltip } from "@chakra-ui/react";
import LiveButton from "../../../Common/Button/Live";
import { BsShareFill } from "react-icons/bs";

type PlayEndGameControlsProps = {};

export default function PlayEndGameControls({}: PlayEndGameControlsProps) {
  const onShare = () => {};

  return (
    <Tooltip label="Share" placement="top">
      <Box mr="0.5" fontSize="xl" color="#8b8987">
        <LiveButton label="Sharing" onClick={onShare}>
          <Icon as={BsShareFill} />
        </LiveButton>
      </Box>
    </Tooltip>
  );
}
