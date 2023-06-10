import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SOCKET_EVENTS } from "../services/Socket";
import { GameInfo } from "../types";
import { useSocket } from "./SocketContext";
import { useUser } from "./UserContext";

type RoomContextProps = {
  children: ReactNode;
};

type RoomContext = {
  isLoading: boolean;
  game: GameInfo;
  onSetGame: Dispatch<SetStateAction<GameInfo>>;
  onRequestGameDraw: () => void;
};

export const RoomContext = createContext({} as RoomContext);

export const useRoom = () => useContext(RoomContext);

const RoomProvider = ({ children }: RoomContextProps) => {
  const navigate = useNavigate();
  const { code } = useParams();
  const { ws } = useSocket();
  const { user, onSetUserColor } = useUser();
  const [game, setGame] = useState<GameInfo>({
    code: code!,
    status: "Wait",
    members: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ws.emit(SOCKET_EVENTS.REQ_JOIN_GAME, { code, user });
  }, []);

  useEffect(() => {
    ws.on(SOCKET_EVENTS.RES_JOIN_GAME, ({ success, error, code }) => {
      if (!success) {
        alert(error);

        navigate("/online");
      }

      ws.emit(SOCKET_EVENTS.GET_GAME_INFO, { code });

      ws.on(SOCKET_EVENTS.GAME_INFO, ({ data }) => {
        const gameInfo = data as GameInfo;

        setGame((prev) => ({
          ...prev,
          ...gameInfo,
        }));

        const currentPlayer = gameInfo.members.find((p) => p.id === user!.id);
        if (currentPlayer) {
          onSetUserColor(currentPlayer.color);
        }

        setIsLoading(false);
      });
    });

    ws.on(SOCKET_EVENTS.USER_JOINED, ({ status, members }) => {
      setGame((prev) => ({
        ...prev,
        status,
        members,
      }));
    });

    return () => {
      ws.off(SOCKET_EVENTS.REQ_JOIN_GAME);
      ws.off(SOCKET_EVENTS.USER_JOINED);
    };
  }, []);

  const onRequestGameDraw = () => {

  }

  return (
    <RoomContext.Provider value={{ isLoading, game, onSetGame: setGame, onRequestGameDraw }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
