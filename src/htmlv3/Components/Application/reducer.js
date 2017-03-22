import React from 'react';
import {
    SETAVAILABLESERVICES,
    SETAVAILABLESERVICESERROR,
    SETSTATECLOSED,
    SETSTATEOPEN,
    WEBSOCKETCONNECT,
    STARTSERVICE,
    PINGSERVICERECEIVED} from './action.js';

let initialState={
    status:'closed',
    services:{
        items:[],
        error:null
    },
    portStatus: {
        port: 0,
        ping: false
    }
}

export const ApplicationReducer = (state = initialState, action) => {
    console.log(action.payload, action.type, 'ApplicationReducer()')
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
        case PINGSERVICERECEIVED:

            // return Object.assign({},state, {services:{items:{0:{portStatus: action.payload}}}});
            return Object.assign({},state,{portStatus:action.payload});
        default:
            return state;
    }
};