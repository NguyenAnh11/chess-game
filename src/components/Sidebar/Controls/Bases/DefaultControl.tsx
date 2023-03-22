import { forwardRef } from "react";
import { IconType } from "react-icons/lib";
import { Box, Icon, Button, Tooltip } from "@chakra-ui/react";

type DefaultControlProps = {
  label: string;
  icon: IconType;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const DefaultControl = forwardRef<HTMLButtonElement, DefaultControlProps>(
  ({ label, icon, onClick }: DefaultControlProps, ref) => (
    <Tooltip placement="top" label={label} openDelay={500}>
      <Button
        ref={ref}
        px="5"
        py="1.5"
        h="12"
        bg="#dbd9d7"
        overflow="hidden"
        boxShadow="0 0.1rem 0 0 #bdbcb8, 0 0.7rem 0.95rem 0.05rem transparent"
        sx={{ _hover: { bg: "transparent" } }}
        onClick={onClick}
      >
        <Box
          fontSize="3xl"
          color="#666463"
          sx={{ _hover: { color: "#504f4f" } }}
        >
          <Icon as={icon} />
        </Box>
      </Button>
    </Tooltip>
  )
);

export default DefaultControl;
