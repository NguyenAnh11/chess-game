import { IconType } from "react-icons/lib";
import { Tooltip, Button, Box, Icon } from "@chakra-ui/react";

type SmallControlProps = {
  label: string;
  icon: IconType;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function SmallControl({
  icon,
  label,
  onClick,
}: SmallControlProps) {
  return (
    <Tooltip placement="top" label={label} openDelay={500}>
      <Button
        h="7"
        w="7"
        color="#666"
        bg="transparent"
        sx={{ _hover: { bg: "none" } }}
        onClick={onClick}
      >
        <Box fontSize="2xl" lineHeight="1">
          <Icon as={icon} />
        </Box>
      </Button>
    </Tooltip>
  );
}
