import {combineReducers} from 'redux';


import { WebsocketReducer, shellReducer, WebsocketEventsReducer } from './Reducer'

export const RootReducer = combineReducers({
    websocket:   WebsocketReducer,
    websocketEvents: WebsocketEventsReducer,
    shell: shellReducer
})