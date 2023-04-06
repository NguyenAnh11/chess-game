import Button from "../../../Common/Button";
import { Grid, Tooltip, Icon } from "@chakra-ui/react";
import { HiLightBulb } from "react-icons/hi";
import { IoChevronBack, IoChevronForward, IoAdd } from "react-icons/io5";
import { useChess } from "../../../../contexts/ChessContext";

export default function PrimaryControls() {
  const { onNewGame, onMoveBack, onMoveFoward, onShowHint } = useChess();

  return (
    <Grid
      w="full"
      autoFlow="column"
      mb="6"
      gap="2"
      templateColumns="repeat(auto-fit, minmax(4rem, 1fr))"
    >
      <Tooltip label="New Game">
        <Button label="New Game" variant="basic" onClick={onNewGame}>
          <Icon as={IoAdd} fontSize="3xl" color="#666463" />
        </Button>
      </Tooltip>
      <Tooltip label="Move Back">
        <Button label="Move Back" variant="basic" onClick={onMoveBack}>
          <Icon as={IoChevronBack} fontSize="3xl" color="#666463" />
        </Button>
      </Tooltip>
      <Tooltip label="Move Foward">
        <Button label="Move Foward" variant="basic" onClick={onMoveFoward}>
          <Icon as={IoChevronForward} fontSize="3xl" color="#666463" />
        </Button>
      </Tooltip>
      <Tooltip label="Show Hint">
        <Button label="Show Hint" variant="basic" onClick={onShowHint}>
          <Icon as={HiLightBulb} fontSize="3xl" color="#666463" />
        </Button>
      </Tooltip>
    </Grid>
  );
}
