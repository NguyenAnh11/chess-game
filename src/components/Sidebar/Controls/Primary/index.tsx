import { Grid } from "@chakra-ui/react";
import MoveBack from "./MoveBack";
import MoveFoward from "./MoveFoward";
import NewGame from "./NewGame";
import ShowHint from "./ShowHint";

export default function PrimaryControls() {
  return (
    <Grid
      w="full"
      autoFlow="column"
      mb="6"
      gap="2"
      templateColumns="repeat(auto-fit, minmax(4rem, 1fr))"
    >
      <NewGame />
      <MoveBack />
      <MoveFoward />
      <ShowHint />
    </Grid>
  );
}
