import React from 'react';
import {
    SET_AVAILABLESERVICES,
    SET_AVAILABLESERVICESERROR,
    SET_STATECLOSED,
    SET_STATEOPEN,
    CONNECT_WEBSOCKET,
    START_SERVICE,
    PING_SERVICE,
    PING_SERVICERECEIVED,
    KILL_SERVICE,
    LOG_HISTORY_SERVICE,
    ADD_SERVICE_CONFIG,
    DELETE_SERVICE_CONFIG,
    EDIT_SERVICE_CONFIG,
    SET_SERVICE_STATE,
    SET_MEMORY_USAGE,
    CLEAR_MEMORY_USAGE
} from './dispatchTypes';

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
        store.dispatch({type: SET_STATEOPEN});
        let cmdObj=JSON.stringify({req:"getConfigFile"})
        connection.send(cmdObj);
    }
    const onClose = (connection, store) => evt => {
        connection.close();
        store.dispatch({type: SET_STATECLOSED});

    };
    const onMessage = (conn, store) => evt => {

        try {
            let response = JSON.parse(evt.data);
            let dispatchType;
            switch (response.type) {
                case "history":
                    break;
                case "message":
                    dispatchType = LOG_HISTORY_SERVICE;
                    store.dispatch({type: dispatchType, payload: response.data});
                    break;
                case "ping":
                    dispatchType = PING_SERVICERECEIVED;
                    store.dispatch({type: dispatchType, payload: {status:response.data}});
                    break;
                case "status":

                    store.dispatch({type:SET_SERVICE_STATE,payload:response.data});
                    if(!response.data.connected){
                        store.dispatch({type:CLEAR_MEMORY_USAGE,payload:response.data});
                    }
                    break;
                case 'memory_usage':
                    //console.log(response.data);
                    store.dispatch({type: SET_MEMORY_USAGE, payload: response.data})
                    break;
                case "saveConfig":
                case "readConfig":
                case "deleteConfig":
                case "updateConfig":
                    dispatchType = SET_AVAILABLESERVICES;
                    store.dispatch({type: dispatchType, payload:response.data})
                    break;
                default:
                    throw new EventError(response.data,"Invalid Dispatch Type")
            }

        }
        catch (e) {
            if(e instanceof EventError) {

                store.dispatch({type: SET_AVAILABLESERVICESERROR, payload: {item: e.referenceObj, error: e.message}})
            }
            else{console.log(e)}
        }

    }
    return store => next => action => {
        let payload = action.payload ? JSON.stringify(action.payload) : null;
        switch (action.type) {

            case CONNECT_WEBSOCKET:
                if (connection !== null) {
                    onClose(connection, store)
                }
                connection = new WebSocket('ws://127.0.0.1:1337');
                connection.onopen = onOpen(connection, store);
                connection.onmessage = onMessage(connection, store);
                break;
            case KILL_SERVICE:
            case START_SERVICE:
            case ADD_SERVICE_CONFIG:
            case DELETE_SERVICE_CONFIG:
            case EDIT_SERVICE_CONFIG:
                //console.log(action.type,payload)
                //console.log(action.payload, `store ${action.type} -> webSockethandler.js`)
                connection.send(payload);
                break;
            default:
                return next(action);
        }
    }
})();