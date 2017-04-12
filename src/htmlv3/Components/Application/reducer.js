import React from 'react';
import {
    CONNECT_WEBSOCKET,
    SET_AVAILABLESERVICES,
    SET_AVAILABLESERVICESERROR,
    SET_STATECLOSED,
    SET_STATEOPEN,
    SET_SERVICE_STATE,
    START_SERVICE,
    PING_SERVICERECEIVED,
    LOG_HISTORY_SERVICE

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
        case SET_SERVICE_STATE:
            newItems=mergeSingleObject(state.services.items,action.payload,'id');
            return Object.assign({}, state, {services:{items:newItems}});
            break;
        case SET_STATEOPEN:
            return Object.assign({}, state, {status: 'open'});
        case SET_STATECLOSED:
            return Object.assign({}, state, {status: 'closed'});
        case SET_AVAILABLESERVICES:
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
        case SET_AVAILABLESERVICESERROR:
            let items=state.services.items.map((item)=>{
                if(item.id===action.payload.item.id){
                    item.error=action.payload.error;
                    return item
                }
                else{return item}
            })
            return Object.assign({}, state, {services: {items:items}});
        case START_SERVICE:
            return Object.assign({}, state, {startedservices: action.payload});
        case LOG_HISTORY_SERVICE:
            let newMerge = state.logsHistory[action.payload.id] ? [action.payload,...state.logsHistory[action.payload.id]] : [action.payload];
            let logsMerge={...state.logsHistory,[action.payload.id]:newMerge};
            return Object.assign({...state, logsHistory:logsMerge});
        case PING_SERVICERECEIVED:
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