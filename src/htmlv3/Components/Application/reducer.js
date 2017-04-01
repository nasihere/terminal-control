import React from 'react';
import {
    SET_AVAILABLESERVICES,
    SET_AVAILABLESERVICESERROR,
    SET_STATECLOSED,
    SET_STATEOPEN,
    UPDATE_TERMINAL

} from './dispatchTypes';

let initialState = {
    status:     'closed',
    services:   {
        items: [],
        error: null
    },
    portStatus: {
        port: 0,
        ping: false
    },
    logsHistory: []
}

export const ApplicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STATEOPEN:
            return Object.assign({}, state, {status: 'open'});
        case SET_STATECLOSED:
            return Object.assign({}, state, {status: 'closed'});
        case UPDATE_TERMINAL:
            return Object.assign({}, state, {services: {items: action.payload}});
        case SET_AVAILABLESERVICES:
            return Object.assign({}, state, {services: {items: action.payload}});
        case SET_AVAILABLESERVICESERROR:
            let items=state.services.items.map((item)=>{
                if(item.id===action.payload.item.id){
                    item.error=action.payload.error;
                    return item
                }
                else{return item}
            });
            return Object.assign({}, state, {services: {items:items}});
        default:
            return state;
    }
};