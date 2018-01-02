import * as React from 'react';
import {removeByKey} from '../Utils'
import {
    MEMORY_SET_USAGE,
    MEMORY_CLEAR_USAGE
} from '../Actions/ActionTypes';

export const Reducer_Memory = (state = {}, action) => {
    let id;
    switch (action.type) {
        case MEMORY_SET_USAGE:
            id = action.payload.id;

            let newObj = {};
            let idHistory = [
                action.payload.heapTotal,
                action.payload.heapUsed,
                action.payload.rss,
                action.payload.external,
                action.payload.timeRunning
            ];
            let chartHistory={};
            chartHistory.y=action.payload.heapUsed / 1000;
            chartHistory.x=action.payload.timeRunning;
            if (!state.hasOwnProperty(id+"_chart")) {
                newObj[id+"_chart"] = [];
                newObj[id+"_chart"].push(chartHistory)
            }
            if (!state.hasOwnProperty(id)) {
                newObj[id] = [];
                newObj[id].push(idHistory)
            }
            else {
                if (state[id+"_chart"].length === 100) {state[id+"_chart"].shift()};
                newObj[id+"_chart"] = [...state[id+"_chart"], chartHistory]
                if (state[id].length === 100) {state[id].shift()};
                newObj[id] = [...state[id], idHistory]
            }
            return Object.assign({}, state, newObj);
            break;
        case MEMORY_CLEAR_USAGE:
            id = action.payload.id;
            let newState=removeByKey(state,id);
                newState=removeByKey(newState,id+"_chart");

            return newState;
            break;
        default:
            return state;
    }
}