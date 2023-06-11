import React, { forwardRef, RefObject } from "react";
import { Box, Flex, useOutsideClick } from "@chakra-ui/react";
import { useChess } from "../../contexts/ChessContext";
import { useGame } from "../../contexts/GameContext";
import Squares from "./Squares";
import HighlightSquares from "./HighlightSquares";
import HintMoves from "./HintMoves";
import Arrows from "./Arrows";
import Promotion from "./Promotion";
import GameInfo from "./GameInfo";
import GameOverUsers from "./GameInfo/GameOver";
import GameDrawUser from "./GameInfo/GameDraw";

type BoardMainProps = {};

const BoardMain = forwardRef<HTMLDivElement, BoardMainProps>(({}, ref) => {
  const {
    game,
    isGameStart,
    isGameOver,
    isGameDraw,
    isShowGameOver,
    isShowGameDraw,
    onCloseModalGameDraw,
    onCloseModalGameOver,
  } = useGame();

  const { promotion, onClearLeftClick, onClearRightClicks } = useChess();

  useOutsideClick({
    ref: ref as RefObject<HTMLDivElement>,
    handler: () => {
      onClearLeftClick();
      onClearRightClicks();
    },
  });

  return (
    <React.Fragment>
      <Flex direction="column" my="2.5">
        <Box ref={ref} position="relative" w="xl" height="xl">
          <HighlightSquares />
          
          <Squares />

          <HintMoves />

          <Arrows />

          {promotion.show && <Promotion />}

          {isGameStart && isGameOver && isShowGameOver && (
            <GameInfo
              title="Game Over"
              onCloseModal={onCloseModalGameOver}
              content={<GameOverUsers users={game.members} />}
            />
          )}

          {isGameStart && isGameDraw && isShowGameDraw && (
            <GameInfo
              title="Draw"
              onCloseModal={onCloseModalGameDraw}
              content={<GameDrawUser users={game.members} />}
            />
          )}
        </Box>
      </Flex>
    </React.Fragment>
  );
});

export default BoardMain;
