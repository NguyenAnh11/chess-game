import { Flex, Icon, Tooltip } from "@chakra-ui/react";
import Button from "../../../Common/Button";
import { TbDownload } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { BsFlag } from "react-icons/bs";
import { useChess } from "../../../../contexts/ChessContext";
import { useSetting } from "../../../../contexts/SettingContext";

export default function SmallControls() {
  const { boardRef, onGameOver } = useChess();
  const { onOpenEditSetting } = useSetting();

  const onDownload = () => {
    const element = boardRef.current;
    if (element) {
    }
  };

  const onResign = () => {
    onGameOver();
  }

  return (
    <Flex w="full" justify="space-between">
      <Flex w="full" flexDirection="row">
        <Tooltip label="Download">
          <Button label="Download" size="sm" onClick={onDownload}>
            <Icon as={TbDownload} fontSize="2xl" color="#666463" />
          </Button>
        </Tooltip>
        <Tooltip label="Setting">
          <Button
            label="Download"
            size="sm"
            onClick={() => onOpenEditSetting(true)}
          >
            <Icon as={FiSettings} fontSize="2xl" color="#666463" />
          </Button>
        </Tooltip>
      </Flex>
      <Flex>
        <Tooltip label="Resign">
          <Button label="Download" size="sm" onClick={onResign}>
            <Icon as={BsFlag} fontSize="2xl" color="#666463" />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
}
