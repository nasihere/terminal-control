import React from 'react';
import {
    SETAVAILABLESERVICES,
    SETAVAILABLESERVICESERROR,
    SETSTATECLOSED,
    SETSTATEOPEN,
    WEBSOCKETCONNECT,
    STARTSERVICE,
    PINGSERVICE,
    PINGSERVICERECEIVED,
    KILLSERVICE,
    HISTORYSERVICE,
    ADDNEWSERVICE
} from './action.js';

export const socketConnect = (function () {
    let connection = null;
    const onOpen = (connection, store) => evt => {
        store.dispatch({type: SETSTATEOPEN});
        let cmdObj=JSON.stringify({req:"getConfigFile"})
        connection.send(cmdObj);
    }
    const onClose = (connection, store) => evt => {
        connection.close();
        store.dispatch({type: SETSTATECLOSED});

    };
    // const onPing = (interval, store, payload) => {
    //     const self = store;
    //     const type = PINGRESET;
    //     setTimeout(function(){
    //         self.dispatch({type: type, payload: payload});
    //         // pingService();
    //     },interval);
    //
    // };
    const onMessage = (conn, store) => evt => {

        try {
            let response = JSON.parse(evt.data);
            let dispatchType;
            // console.log(response.type, 'type -> websocketHandler')
            // console.log(response.data, 'data -> websocketHandler')
            switch (response.type) {
                case "history":
                    break;
                case "message":
                    dispatchType = HISTORYSERVICE;
                    store.dispatch({type: dispatchType, payload: {status:response.data}});
                    break;
                case "ping":
                    dispatchType = PINGSERVICERECEIVED;
                    store.dispatch({type: dispatchType, payload: {status:response.data}});
                    break;
                case "saveConfig":
                    store.dispatch({type: SETAVAILABLESERVICES, payload: response.data.config.configService});
                    break;
                case "readConfig":
                    dispatchType = SETAVAILABLESERVICES;
                    store.dispatch({type: dispatchType, payload: response.data.config.configService})
                    break;
                default:
                    throw new Error("Invalid Dispatch Type")
            }

        }
        catch (e) {
            store.dispatch({type: SETAVAILABLESERVICESERROR, payload: e})
        }

    }
    return store => next => action => {
        let payload = action.payload ? JSON.stringify(action.payload) : null;
        switch (action.type) {

            case WEBSOCKETCONNECT:
                if (connection != null) {
                    onClose(connection, store)
                }
                connection = new WebSocket('ws://127.0.0.1:1337');
                connection.onopen = onOpen(connection, store);
                connection.onmessage = onMessage(connection, store);
                break;
            case STARTSERVICE:
                //console.log(action.payload, 'store startService -> webSockethandler.js')
                connection.send(payload);
                break;
            case KILLSERVICE:
                connection.send(payload);
                break;
            // case PINGSERVICE:
            //     //console.log(action.payload, 'StorePingService -> webSockethandler.js')
            //     connection.send(payload);
            //     onPing(2000, store, payload);
            //     break;
            case ADDNEWSERVICE:
                connection.send(payload);
                break;
            default:
                return next(action);
        }
    }
})();