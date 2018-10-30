import { WEBSOCKET_CONNECT, WEBSOCKET_ERROR, WEBSOCKET_EVENTS, WEBSOCKET_DISCONNECTED } from "./../ActionTypes"; 

let initialState = {
    status: 'offline',
    payload: {}
};

export const WebsocketReducer = (state = initialState, action) => {
    switch(action.type) {
        case WEBSOCKET_CONNECT:
            return {...state, ...action, status: true };
            break;
        case WEBSOCKET_ERROR: 
            return {...state, ...action };
            break;
        case WEBSOCKET_DISCONNECTED:
            return { ...state, status: false };
            break; 
        default:
            return state;
    }
}

export const WebsocketEventsReducer = (state = initialState, action) => {
    switch(action.type) {
        case WEBSOCKET_EVENTS:
            return { ...state, payload: action.payload };
            break;
        case WEBSOCKET_DISCONNECTED:
            return { ...state, payload: action.payload };
            break; 

        default:
            return state;
    }

}