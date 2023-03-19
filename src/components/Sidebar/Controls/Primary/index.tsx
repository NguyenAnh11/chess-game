import { Grid } from "@chakra-ui/react";
import MoveBackControl from "./MoveBackControl";
import MoveFowardControl from "./MoveFowardControl";
import NewGameControl from "./NewGameControl";
import ShowHintControl from "./ShowHintControl";

export default function PrimaryControls() {
  return (
    <Grid
      w="full"
      autoFlow="column"
      mb="6"
      gap="2"
      templateColumns="repeat(auto-fit, minmax(4rem, 1fr))"
    >
      <NewGameControl />
      <MoveBackControl />
      <MoveFowardControl />
      <ShowHintControl />
    </Grid>
  );
}
