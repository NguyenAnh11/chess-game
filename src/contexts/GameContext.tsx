import { cloneDeep } from "lodash";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";
import { GameInfo, GameOverReason, UserPlayInfo } from "../types";

export type GameContextProps = {
  children: ReactNode;
  game: GameInfo;
  onSetGame: Dispatch<SetStateAction<GameInfo>>;
};

type GameContext = {
  game: GameInfo;
  isGameOver: boolean;
  isGameDraw: boolean;
  isGameStart: boolean;
  isGameEnd: boolean;
  isGameWaiting: boolean;
  isShowGameOver: boolean;
  isShowGameDraw: boolean;
  onCloseModalGameOver: () => void;
  onCloseModalGameDraw: () => void;
  onSetPlayerAsLoser: (
    playerId: string,
    gameOverReason: GameOverReason
  ) => void;
  onSetGameReady: () => void;
  onSetGameDraw: () => void;
  onSetGameOver: () => void;
};

export const GameContext = createContext({} as GameContext);

export const useGame = () => useContext(GameContext);

const GameProvider = ({ game, onSetGame, children }: GameContextProps) => {
  const [isShowGameOver, setIsShowGameOver] = useState(false);
  const [isShowGameDraw, setIsShowGameDraw] = useState(false);

  useEffect(() => {
    if (game.status === "Game Over") setIsShowGameOver(true);
    if (game.status === "Draw") setIsShowGameDraw(true);
  }, [game.status]);

  const onCloseModalGameOver = () => setIsShowGameOver(false);

  const onCloseModalGameDraw = () => setIsShowGameDraw(false);

  const onSetPlayerAsLoser = (
    playerId: string,
    gameOverReason: GameOverReason
  ) => {
    const cloneGame = cloneDeep(game);

    cloneGame.status = "Game Over";
    cloneGame.gameOverReason = gameOverReason;

    cloneGame.members = game.members.reduce(
      (prev: UserPlayInfo[], curr: UserPlayInfo) => {
        if (curr.id === playerId) curr.isLoser = true;
        return [...prev, curr];
      },
      []
    );

    onSetGame(cloneGame);
  };

  const isGameOver = useMemo(() => game.status === "Game Over", [game.status]);

  const isGameDraw = useMemo(() => game.status === "Draw", [game.status]);

  const isGameStart = useMemo(() => game.status === "Ready", [game.status]);

  const isGameWaiting = useMemo(() => game.status === "Wait", [game.status]);

  const isGameEnd = isGameOver || isGameDraw;

  const onSetGameReady = () =>
    onSetGame((prev) => ({ ...prev, status: "Ready" }));

  const onSetGameDraw = () =>
    onSetGame((prev) => ({ ...prev, status: "Draw" }));

  const onSetGameOver = () =>
    onSetGame((prev) => ({ ...prev, status: "Game Over" }));

  return (
    <GameContext.Provider
      value={{
        game,
        isGameDraw,
        isGameOver,
        isGameStart,
        isGameWaiting,
        isGameEnd,
        isShowGameOver,
        isShowGameDraw,
        onCloseModalGameOver,
        onCloseModalGameDraw,
        onSetPlayerAsLoser,
        onSetGameReady,
        onSetGameDraw,
        onSetGameOver,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
