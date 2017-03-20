import React from 'react';
import {
    SETAVAILABLESERVICES,
    SETAVAILABLESERVICESERROR,
    SETSTATECLOSED,
    SETSTATEOPEN,
    WEBSOCKETCONNECT, STARTSERVICE} from './action.js';

let initialState={
    status:'closed',
    services:{
        items:[],
        error:null
    }
}

export const ApplicationReducer = (state = initialState, action) => {
    switch(action.type){
        case SETSTATEOPEN:
            return Object.assign({},state,{status:'open'});

        case SETSTATECLOSED:
            return Object.assign({},state,{status:'closed'});

        case SETAVAILABLESERVICES:
            return Object.assign({},state,{services:{items:action.payload}});
        case SETAVAILABLESERVICESERROR:
            return Object.assign({},state,{services:{items:[],error:action.payload}});
        case STARTSERVICE:
            return Object.assign({},state,{startedservices:action.payload});
        default:
            return state;
    }
};