import { cloneDeep } from "lodash";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useSetting } from "./SettingContext";
import { UserInfo, GameInfo } from "../types";

export type GameContextProps = {
  children?: ReactNode;
  code: string;
  members?: UserInfo[];
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

const GameProvider = (props: GameContextProps) => {
  const { mode } = useSetting();

  const [game, setGame] = useState<GameInfo>({
    code: props.code,
    status: "Wait",
    duration: 0,
    members: props.members ?? [],
  });

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

  useEffect(() => {
    if (
      mode === "Multiplayer" &&
      game.status === "Wait" &&
      game.members.length === 2
    ) {
      onSetGameReady();
    }
  }, [game.members]);

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

    setGame(cloneGame);
  };

  const onSetGameReady = () =>
    setGame((prev) => ({ ...prev, status: "Ready" }));

  const onSetGameDraw = () => setGame((prev) => ({ ...prev, status: "Draw" }));

  const onSetGameEnd = () => setGame((prev) => ({ ...prev, status: "End" }));

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
      {props.children}
    </GameContext.Provider>
  );
};

export default GameProvider;
