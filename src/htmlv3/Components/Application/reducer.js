import React from 'react';
import {
    SETAVAILABLESERVICES,
    SETAVAILABLESERVICESERROR,
    SETSTATECLOSED,
    SETSTATEOPEN,
    WEBSOCKETCONNECT,
    STARTSERVICE,
    PINGSERVICERECEIVED,
    HISTORYSERVICE,

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
    console.log(action.payload, action.type, 'ApplicationReducer()');
    let newItems;
    switch (action.type) {
        case SETSTATEOPEN:
            return Object.assign({}, state, {status: 'open'});

        case SETSTATECLOSED:
            return Object.assign({}, state, {status: 'closed'});

        case SETAVAILABLESERVICES:
            if(state.services && state.services.items){
                if(state.services.items.length > action.payload.length){
                    let filterItems=action.payload.map((item,idx)=>
                        state.services.items.find((serviceItem)=> item.id === serviceItem.id ))
                    newItems=filterItems;
                }
                else {
                    let filterItems = action.payload
                        .filter((item, idx) => !state.services.items[idx] || item.id !== state.services.items[idx].id)
                        .map((item, idx) => item)
                    newItems = [...state.services.items, ...filterItems];

                }}
            else{
                newItems=action.payload;
            }


            return Object.assign({}, state, {services: {items: newItems}});

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
        // case PINGRESET:
        //     return Object.assign({},
        //         state,
        //         {services:
        //             {items:state.services.items.map( (item, idx) => {
        //                     let portStatus = JSON.parse(action.payload);
        //                     portStatus.ping = false;
        //                     item.Port === portStatus.port ?
        //                         Object.assign({}, item, {portStatus: portStatus}) :
        //                         item
        //                 }
        //             )
        //             }
        //         });

        default:
            return state;
    }
};