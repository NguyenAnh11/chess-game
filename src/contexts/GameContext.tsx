import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { GameInfo, GameStatus } from "../types";

type GameContextProps = {
  children: ReactNode;
  game: GameInfo;
  onSetGameStatus: (status: GameStatus) => void;
};

type GameContext = {
  game: GameInfo;
  onSetGameStatus: (status: GameStatus) => void;
  isGameOver: boolean;
  isShowGameOver: boolean;
  onCloseModalGameOver: () => void;
};

export const GameContext = createContext({} as GameContext);

export const useGame = () => useContext(GameContext);

const GameProvider = ({ children, game, onSetGameStatus }: GameContextProps) => {
  const [isGameOver, setIsGameOver] = useState(game.status === "End");
  const [isShowGameOver, setIsShowGameOver] = useState(false);

  useEffect(() => {
    if (game && game.status === "End") {
      setIsGameOver(true);
      setIsShowGameOver(true);
    }
  }, [game]);

  const onCloseModalGameOver = () => setIsShowGameOver(false);

  return (
    <GameContext.Provider
      value={{
        game,
        onSetGameStatus,
        isGameOver,
        isShowGameOver,
        onCloseModalGameOver,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
