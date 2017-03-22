import React from 'react';
import {
    SETAVAILABLESERVICES,
    SETAVAILABLESERVICESERROR,
    SETSTATECLOSED,
    SETSTATEOPEN,
    WEBSOCKETCONNECT,
    STARTSERVICE,
    PINGSERVICERECEIVED,
    HISTORYSERVICE
} from './action.js';

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
    console.log(action.payload, action.type, 'ApplicationReducer()')
    switch (action.type) {
        case SETSTATEOPEN:
            return Object.assign({}, state, {status: 'open'});

        case SETSTATECLOSED:
            return Object.assign({}, state, {status: 'closed'});

        case SETAVAILABLESERVICES:
            return Object.assign({}, state, {services: {items: action.payload}});
        case SETAVAILABLESERVICESERROR:
            return Object.assign({}, state, {services: {items: [], error: action.payload}});
        case STARTSERVICE:
            return Object.assign({}, state, {startedservices: action.payload});
        case HISTORYSERVICE:
            return Object.assign({}, state, {logsHistory:[...state.logsHistory, action.payload]});
        case PINGSERVICERECEIVED:
            return Object.assign({},
                state,
                {services:
                    {items:state.services.items.map( (item, idx) =>
                        item.id === action.payload.status.id ?
                            Object.assign({}, item, {portStatus: action.payload.status}) :
                            item
                    )
                    }
                });


        default:
            return state;
    }
};