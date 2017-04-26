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
    SERVICE_LOG_HISTORY
} from '../../Actions/ActionTypes';

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
function mergeSingleObject(arr,obj,compKey){
    return arr.map((item)=>{
        if(item[compKey]===obj[compKey]){
            return Object.assign({},item,obj)
        }
        else {return item}
    })
}
export const ApplicationReducer = (state = initialState, action) => {
    //console.log(action.payload, action.type, 'ApplicationReducer()');
    let newItems;
    switch (action.type) {
        case SERVICE_SET_SERVICE_STATE:
            newItems=mergeSingleObject(state.services.items,action.payload,'id');
            return Object.assign({}, state, {services:{items:newItems}});
            break;
        case SERVICE_SET_STATEOPEN:
            return Object.assign({}, state, {status: 'open'});
        case SERVICE_SET_STATECLOSED:
            return Object.assign({}, state, {status: 'closed'});
        case SERVICES_SET_AVAILABLE:
            if(!action.payload.success){
                return Object.assign({}, state, {services: {error: action.payload.error}});
            }
            if(state.services && state.services.items){
                let items=action.payload.config.configService;
                if(state.services.items.length > items.length){
                    let filterItems=items.map((item,idx)=>
                                        state.services.items.find((serviceItem)=> item.id === serviceItem.id ));
                    newItems=filterItems;
                }
                else if(state.services.items.length < items.length) {
                    let filterItems = items
                        .filter((item, idx) => !state.services.items[idx] || item.id !== state.services.items[idx].id)
                        .map((item, idx) => item)

                    newItems = [...state.services.items, ...filterItems];


                }
                else{
                    let filterItems = items.map((item, idx) => Object.assign({},state.services.items[idx],item))
                    newItems=filterItems
                }
            }
            else{
                newItems=action.payload;

            }

            return Object.assign({}, state, {services: {items: newItems}});
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
            let newMerge = state.logsHistory[action.payload.id] ? [action.payload,...state.logsHistory[action.payload.id]] : [action.payload];
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