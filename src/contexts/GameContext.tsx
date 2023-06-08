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
import { UserInfo, GameInfo } from "../types";

export type GameContextProps = {
  children?: ReactNode;
  game: GameInfo;
  onSetGame: Dispatch<SetStateAction<GameInfo>>;
};

type GameContext = {
  game: GameInfo;
  isGameOver: boolean;
  isGameDraw: boolean;
  isGameStart: boolean;
  isGameWaiting: boolean;
  isShowGameOver: boolean;
  onCloseModalGameOver: () => void;
  onSetPlayerAsLoser: (playerId: string) => void;
  onSetGameReady: () => void;
  onSetGameDraw: () => void;
  onSetGameEnd: () => void;
};

export const GameContext = createContext({} as GameContext);

export const useGame = () => useContext(GameContext);

const GameProvider = ({ game, onSetGame, children }: GameContextProps) => {
  const [isShowGameOver, setIsShowGameOver] = useState(false);

  const isGameOver = useMemo(() => game.status === "End", [game.status]);

  const isGameDraw = useMemo(() => game.status === "Draw", [game.status]);

  const isGameStart = useMemo(() => game.status === "Ready", [game.status]);

  const isGameWaiting = useMemo(() => game.status === "Wait", [game.status]);

  useEffect(() => {
    if (game.status === "End") {
      setIsShowGameOver(true);
    }
  }, [game.status]);

  const onCloseModalGameOver = () => setIsShowGameOver(false);

  const onSetPlayerAsLoser = (playerId: string) => {
    const cloneGame = cloneDeep(game);

    cloneGame.status = "End";

    cloneGame.members = game.members.reduce(
      (prev: UserInfo[], curr: UserInfo) => {
        if (curr.id === playerId) curr.isLoser = true;
        return [...prev, curr];
      },
      []
    );

    onSetGame(cloneGame);
  };

  const onSetGameReady = () =>
    onSetGame((prev) => ({ ...prev, status: "Ready" }));

  const onSetGameDraw = () =>
    onSetGame((prev) => ({ ...prev, status: "Draw" }));

  const onSetGameEnd = () => onSetGame((prev) => ({ ...prev, status: "End" }));

  return (
    <GameContext.Provider
      value={{
        game,
        isGameDraw,
        isGameOver,
        isGameStart,
        isGameWaiting,
        isShowGameOver,
        onCloseModalGameOver,
        onSetPlayerAsLoser,
        onSetGameReady,
        onSetGameDraw,
        onSetGameEnd,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
