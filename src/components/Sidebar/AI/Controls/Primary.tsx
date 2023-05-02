import Button from "../../../Common/Button";
import { Grid, Tooltip, Icon } from "@chakra-ui/react";
import { HiLightBulb } from "react-icons/hi";
import { IoChevronBack, IoChevronForward, IoAdd } from "react-icons/io5";
import { useChess } from "../../../../contexts/ChessContext";
import { findBestMove } from "../../../../services/Minmax";

export default function PrimaryControls() {
  const {
    game,
    turn,
    orientation,
    moves,
    suggestMove,
    boardIndex,
    onNewGame,
    setBoardIndex,
    undo,
    move,
    onHiddenSuggestMove,
    onSetSuggestMove
  } = useChess();

  const onMoveBack = () => {
    if (orientation === "w") {
      if (boardIndex.step !== boardIndex.break) {
        if (boardIndex.step > 0) {
          const num = boardIndex.step % 2 === 0 ? 2 : 1;
          setBoardIndex((pre) => ({ ...pre, step: pre.step - num }));
          undo(num);
        }
      }

      if (
        boardIndex.step === boardIndex.break &&
        moves.length % 2 === 0 &&
        boardIndex.break > 0
      ) {
        setBoardIndex((pre) => ({ break: pre.break - 2, step: pre.step - 2 }));
        undo(2);
      }
    }

    if (orientation === "b") {
      if (
        boardIndex.step === boardIndex.break &&
        moves.length % 2 === 1 &&
        boardIndex.break > 0
      ) {
        const num = boardIndex.break === 1 ? 1 : 2;
        setBoardIndex((pre) => ({
          break: pre.break - num,
          step: pre.step - num,
        }));
        undo(num);
      }

      if (boardIndex.step !== boardIndex.break) {
        if (boardIndex.step > 0) {
          const num =
            boardIndex.step > 1 ? (boardIndex.step % 2 === 1 ? 2 : 1) : 1;
          setBoardIndex((pre) => ({ ...pre, step: pre.step - num }));
          undo(num);
        }
      }
    }
  };

  const onMoveFoward = () => {
    if (orientation === "w") {
      if (
        boardIndex.step === boardIndex.break &&
        moves.length % 2 === 0 &&
        boardIndex.break < moves.length
      ) {
        setBoardIndex((pre) => ({ break: pre.break + 2, step: pre.step + 2 }));
        move(boardIndex.break, boardIndex.break + 2);
      }

      if (boardIndex.step !== boardIndex.break) {
        const num = boardIndex.step % 2 === 0 ? 2 : 1;
        setBoardIndex((pre) => ({ ...pre, step: pre.step + num }));
        move(boardIndex.step, boardIndex.step + num);
      }
    }

    if (orientation === "b") {
      if (
        boardIndex.step === boardIndex.break &&
        moves.length % 2 === 1 &&
        boardIndex.break < moves.length
      ) {
        const num = boardIndex.break === 0 ? 1 : 2;
        setBoardIndex((pre) => ({
          break: pre.break + num,
          step: pre.step + num,
        }));
        move(boardIndex.break, boardIndex.break + num);
      }

      if (boardIndex.step !== boardIndex.break) {
        const num =
          boardIndex.step > 1 ? (boardIndex.step % 2 === 1 ? 2 : 1) : 1;
        setBoardIndex((pre) => ({ ...pre, step: pre.step + num }));
        move(boardIndex.step, boardIndex.step + num);
      }
    }
  };

  const onShowHint = () => {
    if (turn === orientation) {
      if (!suggestMove.move) {
        const move = findBestMove(game);
        onSetSuggestMove(move);
      } else {
        onHiddenSuggestMove();
      }
    }
  }

  return (
    <Grid
      w="full"
      autoFlow="column"
      mb="6"
      gap="2"
      templateColumns="repeat(auto-fit, minmax(4rem, 1fr))"
    >
      <Tooltip label="New Game" >
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
