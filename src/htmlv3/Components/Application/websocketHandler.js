import React from 'react';

import {
	WEBSOCKET_CONNECT,
	GIT_GET_ISWORKINGTREE,
	GIT_SET_ISWORKINGTREE,
    GIT_GET_BRANCHES,
    GIT_SET_BRANCHES,
    MEMORY_CLEAR_USAGE,
    MEMORY_SET_USAGE,
    SERVICE_SET_STATEOPEN,
    SERVICE_SET_STATECLOSED,
    SERVICE_SET_SERVICE_STATE,
    SERVICES_SET_AVAILABLE,
    SERVICES_SET_AVAILABLEERROR,

    SERVICE_START,

    SERVICE_PING,
    SERVICE_PING_RECEIVED,

    SERVICE_KILL,
    SERVICE_LOG_HISTORY,
    SERVICE_ADD_CONFIG,
    SERVICE_DELETE_CONFIG,
    SERVICE_EDIT_CONFIG,

} from '../../Actions/ActionTypes';


class EventError extends Error{
    referenceObj;
    constructor(obj,message){
        super(message);
        this.message=message || 'Event Error';
        this.name = "Event Error"
        this.referenceObj=obj;
    }
}

export const socketConnect = (function () {
    let connection = null;
    const onOpen = (connection, store) => evt => {
        store.dispatch({type: SERVICE_SET_STATEOPEN});
        let cmdObj=JSON.stringify({req:"getConfigFile"})
        connection.send(cmdObj);


    }
    const onClose = (connection, store) => evt => {
        connection.close();
        store.dispatch({type: SERVICE_SET_STATECLOSED});

    };
    const onMessage = (conn, store) => evt => {

        try {
            let response = JSON.parse(evt.data);
            let dispatchType;
            switch (response.type) {
                case "history":
                    break;
                case "message":
                    dispatchType = SERVICE_LOG_HISTORY;
                    store.dispatch({type: dispatchType, payload: response.data});
                    break;
                case "ping":
                    dispatchType = SERVICE_PING_RECEIVED;
                    store.dispatch({type: dispatchType, payload: {status:response.data}});
                    break;
                case "status":
                    store.dispatch({type:SERVICE_SET_SERVICE_STATE,payload:response.data});
                    if(!response.data.connected){
                        store.dispatch({type:MEMORY_CLEAR_USAGE,payload:response.data});
                    }
                    break;
                case 'memory_usage':
                    //console.log(response.data);
                    store.dispatch({type: MEMORY_SET_USAGE, payload: response.data});
                    break;
                case 'git':
                    store.dispatch({type:GIT_SET_ISWORKINGTREE, payload:response.payload});
                    break;
                case "saveConfig":
                case "readConfig":
                case "deleteConfig":
                case "updateConfig":
                    dispatchType = SERVICES_SET_AVAILABLE;
                    store.dispatch({type: dispatchType, payload:response.data});
                    break;
                default:
                    throw new EventError(response.data,"Invalid Dispatch Type")
            }

        }
        catch (e) {
            if(e instanceof EventError) {

                store.dispatch({type: SERVICES_SET_AVAILABLEERROR, payload: {item: e.referenceObj, error: e.message}})
            }
            else{console.log(e)}
        }

    }
    return store => next => action => {
        let payload = action.payload ? JSON.stringify(action.payload) : null;
        switch (action.type) {

            case WEBSOCKET_CONNECT:
                if (connection !== null) {
                    onClose(connection, store)
                }
                connection = new WebSocket('ws://127.0.0.1:1337');
                connection.onopen = onOpen(connection, store);
                connection.onmessage = onMessage(connection, store);
                break;
            case SERVICE_KILL:
            case SERVICE_START:
            case SERVICE_ADD_CONFIG:
            case SERVICE_DELETE_CONFIG:
            case SERVICE_EDIT_CONFIG:
            case GIT_GET_ISWORKINGTREE:
            case GIT_GET_BRANCHES:
                connection.send(payload);
                break;
            default:
                return next(action);
        }
    }
})();