import React from 'react';
import {combineReducers} from 'redux';

const websocket = (state = [], action) => {
    switch (action.type) {
        case "SETWEBSOCKET":
            return Object.assign({}, state, action.payload)
            break;
        default:
            return state;

    }
}

export const RootReducer = combineReducers({
    websocket
})