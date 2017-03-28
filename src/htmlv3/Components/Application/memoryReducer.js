import * as React from 'react';
import {
    SET_MEMORY_USAGE
} from './dispatchTypes';

export const MemoryReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_MEMORY_USAGE:

            let id = action.payload.id;
            let newObj = {};
            let idHistory = [
                action.payload.heapTotal,
                action.payload.heapUsed,
                action.payload.rss,
                action.payload.external,
            ];
            if (!state.hasOwnProperty(id)) {
                newObj[id] = [];
                newObj[id].push(idHistory)

            }
            else {

                if (state[id].length === 100) {state[id].shift()};
                newObj[id] = [...state[id], idHistory]
            }
            return Object.assign({}, state, newObj);
            break;
        default:
            return state;
    }
}