import io from "socket.io-client";
export const socket = io(import.meta.env.VITE_SOCKET_ENDPOINT, { transports: ["websocket"] });

export const enum SOCKET_EVENTS {
    "REQ_JOIN_GAME" = "REQ_JOIN_GAME",
    "RES_JOIN_GAME" = "RES_JOIN_GAME",
    "REQ_GAME_INFO" = "REQ_GAME_INFO",
    "RES_GAME_INFO" = "RES_GAME_INFO",
    "CREATE_GAME" = "CREATE_GAME",
    "ROOM_CREATED" = "ROOM_CREATED",
    "GAME_READY" = "GAME_READY"
}