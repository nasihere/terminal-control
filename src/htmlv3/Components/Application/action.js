import React from 'react';

export const SETSTATEOPEN = "SETSTATEOPEN";
export const SETSTATECLOSED = "SETSTATECLOSED";
export const WEBSOCKETCONNECT = "WEBSOCKETCONNECT";
export const SETAVAILABLESERVICES = "SETAVAILABLESERVICES";
export const SETAVAILABLESERVICESERROR = "SETAVAILABLESERVICESERROR";
export const STARTSERVICE = "STARTSERVICE";
export const connectWebSocket = () => {
    return (dispatch) => {
        dispatch({type: WEBSOCKETCONNECT})
    }
};
export const setWebSocketState = (status) => {
    return (dispatch) => {
        dispatch({
            type: status
        })
    }
};
export const startService = (obj, idx) => {

    return (dispatch) => {
        let pwd = 'cd ' + obj.cd.replace('package.json', '') + ";"
        dispatch({type: STARTSERVICE, payload: `${pwd}${obj.env}${obj.command}*#*${obj.name}`})
    }
}

