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
import { MESSAGES } from "../utils";
import { useChat } from "./ChatContext";
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
  isRequestGameDraw: boolean;
  isShowAcceptOrRejectGameDraw: boolean;
  onAcceptOrRejectGameDraw: (accept: boolean) => void;
};

export const RoomContext = createContext({} as RoomContext);

export const useRoom = () => useContext(RoomContext);

const RoomProvider = ({ children }: RoomContextProps) => {
  const navigate = useNavigate();
  const { code } = useParams();
  const { ws } = useSocket();
  const { onSend } = useChat();
  const { user, onSetUserColor } = useUser();
  const [game, setGame] = useState<GameInfo>({
    code: code!,
    status: "Wait",
    members: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isRequestGameDraw, setIsRequestGameDraw] = useState(false);
  const [isShowAcceptOrRejectGameDraw, setIsShowAcceptOrRejectGameDraw] =
    useState(false);

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

    ws.on(SOCKET_EVENTS.SHOW_ACCEPT_REJECT_GAME_DRAW, () => {
      setIsShowAcceptOrRejectGameDraw(true);
    });

    ws.on(SOCKET_EVENTS.REJECT_GAME_DRAW, () => {
      setIsRequestGameDraw(false);
    });

    ws.on(SOCKET_EVENTS.GAME_DRAW, () => {
      setIsRequestGameDraw(false);
      setGame((prev) => ({ ...prev, status: "Draw" }));
    });

    return () => {
      ws.off(SOCKET_EVENTS.REQ_JOIN_GAME);
      ws.off(SOCKET_EVENTS.USER_JOINED);
      ws.off(SOCKET_EVENTS.SHOW_ACCEPT_REJECT_GAME_DRAW);
      ws.off(SOCKET_EVENTS.REJECT_GAME_DRAW);
      ws.off(SOCKET_EVENTS.GAME_DRAW);
    };
  }, []);

  const onRequestGameDraw = () => {
    setIsRequestGameDraw(true);

    ws.emit(SOCKET_EVENTS.REQ_GAME_DRAW, code);
  };

  const onAcceptOrRejectGameDraw = (accept: boolean) => {
    setIsShowAcceptOrRejectGameDraw(false);
    if (accept) {
      setGame((prev) => ({ ...prev, status: "Draw" }));
    }

    if (!accept) {
      onSend(MESSAGES["DECLINED DRAW"]);
    }

    ws.emit(SOCKET_EVENTS.ACCEPT_OR_REJECT_GAME_DRAW, { code, accept });
  };

  return (
    <RoomContext.Provider
      value={{
        isLoading,
        game,
        onSetGame: setGame,
        onRequestGameDraw,
        isRequestGameDraw,
        isShowAcceptOrRejectGameDraw,
        onAcceptOrRejectGameDraw,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
