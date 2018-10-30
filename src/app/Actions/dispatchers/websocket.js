import { connect, send } from "./../creators"
export const connectWebSocket = (data) => dispatch => {
    dispatch(connect(data))
}

export const sendWebSocket = (data) => dispatch => {
    dispatch(send(data))
}
