import { Grid, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Button from "../../../Common/Button/Default";
import { IoAdd } from "react-icons/io5";
import { CiUndo } from "react-icons/ci";

export default function PlayNewGame() {
  const navigate = useNavigate();

  const onNewGame = () => {
    navigate("/online");
  };

  const onRematch = () => {};

  return (
    <Grid
      gridTemplateColumns="repeat(2, 1fr)"
      gridColumnGap="16px"
      gridRowGap="8px"
      width="full"
      px="4"
      pt="4"
      pb="2"
      bg="#f1f1f1"
    >
      <Button label="New Game" variant="basic" onClick={onNewGame}>
        <Icon as={IoAdd} fontSize="3xl" color="#666463" />
        <span>New Game</span>
      </Button>
      <Button label="Rematch" variant="basic" onClick={onRematch}>
        <Icon as={CiUndo} fontSize="3xl" color="#666463" />
        <span>Rematch</span>
      </Button>
    </Grid>
  );
}
