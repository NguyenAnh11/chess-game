import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { GameInfo, GameStatus } from "../types";

export type GameContextProps = {
  children?: ReactNode;
  game: GameInfo;
  isGameOver: boolean;
  isGameDraw: boolean;
  isGameStart: boolean;
  onSetGameStatus: (status: GameStatus) => void;
  onSetPlayerAsLoser: (playerId: string) => void;
};

type GameContext = GameContextProps & {
  isShowGameOver: boolean;
  onCloseModalGameOver: () => void;
};

export const GameContext = createContext({} as GameContext);

export const useGame = () => useContext(GameContext);

const GameProvider = (props: GameContextProps) => {
  const [isShowGameOver, setIsShowGameOver] = useState(false);

  useEffect(() => {
    if (props.game.status === "End") {
      setIsShowGameOver(true);
    }
  }, [props.game.status]);

  const onCloseModalGameOver = () => setIsShowGameOver(false);

  return (
    <GameContext.Provider
      value={{
        isShowGameOver,
        onCloseModalGameOver,
        ...props
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameProvider;
