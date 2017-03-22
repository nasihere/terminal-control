import React from 'react';

export const SETSTATEOPEN = "SETSTATEOPEN";
export const SETSTATECLOSED = "SETSTATECLOSED";
export const WEBSOCKETCONNECT = "WEBSOCKETCONNECT";
export const SETAVAILABLESERVICES = "SETAVAILABLESERVICES";
export const SETAVAILABLESERVICESERROR = "SETAVAILABLESERVICESERROR";
export const STARTSERVICE = "STARTSERVICE";
export const PINGSERVICE = "PINGSERVICE";
export const PINGSERVICERECEIVED = "PINGSERVICERECEIVED";
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
        dispatch({type: STARTSERVICE,
            payload: {
                id:obj.id,
                req:"startService",
                cmd:`${pwd}${obj.env}${obj.command}*#*${obj.name}`}})
    }
}

export const pingService = (obj, idx) => {
    return (dispatch) => {
        dispatch({
            type: PINGSERVICE,
            payload: {
                id:obj.id,
                req:"pingService",
                port:obj.Port
            }})
    }
}
