import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
} from "react";
import { GameInfo, GameStatus } from "../types";

export type GameContextProps = {
  children?: ReactNode;
  game: GameInfo;
  onSetGameStatus: (status: GameStatus) => void;
  onSetPlayerAsLoser: (playerId: string) => void;
};

type GameContext = GameContextProps & {
  isGameOver: boolean;
  isGameDraw: boolean;
  isGameStart: boolean;

  isShowGameOver: boolean;
  onCloseModalGameOver: () => void;
};

export const GameContext = createContext({} as GameContext);

export const useGame = () => useContext(GameContext);

const GameProvider = (props: GameContextProps) => {
  const [isShowGameOver, setIsShowGameOver] = useState(false);

  const isGameOver = useMemo(() => props.game.status === "End", [props.game.status]);

  const isGameDraw = useMemo(() => props.game.status === "Draw", [props.game.status]);

  const isGameStart = useMemo(() => props.game.status === "Ready", [props.game.status]);

  useEffect(() => {
    if (props.game.status === "End") {
      setIsShowGameOver(true);
    }
  }, [props.game.status]);

  const onCloseModalGameOver = () => setIsShowGameOver(false);

  return (
    <GameContext.Provider
      value={{
        ...props,
        isGameDraw,
        isGameOver,
        isGameStart,
        isShowGameOver,
        onCloseModalGameOver,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameProvider;
