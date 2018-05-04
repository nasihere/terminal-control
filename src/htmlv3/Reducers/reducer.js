import React from 'react';
import {
	WEBSOCKET_CONNECT,
	SERVICES_SET_AVAILABLE,
	SERVICES_SET_AVAILABLEERROR,
	SERVICE_SET_STATECLOSED,
	SERVICE_SET_STATEOPEN,
	SERVICE_SET_SERVICE_STATE,
	SERVICE_START,
	SERVICE_PING_RECEIVED,
    SERVICE_LOG_HISTORY,
    SERVICE_CLEAR_LOGS
} from '../Actions/ActionTypes/index';
import {mergeSingleObj} from '../Utils';
import {parseAvailableServices} from'./Helpers/parseAvailableServices.js'

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
    logsHistory: {}
}

export const ApplicationReducer = (state = initialState, action) => {
    //console.log(action.payload, action.type, 'ApplicationReducer()');
    let newItems;
    switch (action.type) {
        case SERVICE_SET_SERVICE_STATE:
            newItems=mergeSingleObj(state.services.items,action.payload,'id');
            return Object.assign({}, state, {services:{items:newItems}});
            break;
        case SERVICE_SET_STATEOPEN:
            return Object.assign({}, state, {status: 'open'});
        case SERVICE_SET_STATECLOSED:
            return Object.assign({}, state, {status: 'closed'});
        case SERVICES_SET_AVAILABLE:
            return parseAvailableServices(state,action)

        case SERVICE_CLEAR_LOGS:
            const clearMerge = state.logsHistory[action.payload.id] ? [...state.logsHistory[action.payload.id],action.payload] : [action.payload];
            let clearLogsMerge={...state.logsHistory,[action.payload.id]:clearMerge};
            clearLogsMerge[action.payload.id]  = [];
            return Object.assign({...state, logsHistory:clearLogsMerge});
        case SERVICES_SET_AVAILABLEERROR:
            let items=state.services.items.map((item)=>{
                if(item.id===action.payload.item.id){
                    item.error=action.payload.error;
                    return item
                }
                else{return item}
            })
            return Object.assign({}, state, {services: {items:items}});
        case SERVICE_START:
            return Object.assign({}, state, {startedservices: action.payload});
        case SERVICE_LOG_HISTORY:
            let newMerge = state.logsHistory[action.payload.id] ? [...state.logsHistory[action.payload.id],action.payload] : [action.payload];
            let logsMerge={...state.logsHistory,[action.payload.id]:newMerge};
             if (logsMerge[action.payload.id].length > 100)
                 logsMerge[action.payload.id]  = logsMerge[[action.payload.id]].slice(50);
            return Object.assign({...state, logsHistory:logsMerge});
        case SERVICE_PING_RECEIVED:
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