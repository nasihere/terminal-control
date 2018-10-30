import { WEBSOCKET_CONNECT, WEBSOCKET_SEND } from "./../../ActionTypes"
export const connect = (data) => {
    return { type: WEBSOCKET_CONNECT, payload: data };
}
export const send = (data) => {
    return { type: WEBSOCKET_SEND, payload: data }
}