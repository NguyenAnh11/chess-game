import io from "socket.io-client";
export const socket = io(import.meta.env.VITE_SOCKET_ENDPOINT, { transports: ["websocket"] });

export const enum SOCKET_EVENTS {
    "REQ_JOIN_GAME" = "REQ_JOIN_GAME",
    "RES_JOIN_GAME" = "RES_JOIN_GAME",
    "GET_GAME_INFO" = "GET_GAME_INFO",
    "GAME_INFO" = "GAME_INFO",
    "CREATE_GAME" = "CREATE_GAME",
    "ROOM_CREATED" = "ROOM_CREATED",
    "GAME_READY" = "GAME_READY",
    "USER_JOINED" = "USER_JOINED",
    "MAKE_MOVE" = "MAKE_MOVE",
    "RECEIVE_MOVE" = "RECEIVE_MOVE",
    "SEND_MESSAGE" = "SEND_MESSAGE",
    "RECEIVE_MESSAGE" = "RECEIVE_MESSAGE"
}