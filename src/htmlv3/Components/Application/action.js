import React from 'react';

export const SETSTATEOPEN = "SETSTATEOPEN";
export const SETSTATECLOSED = "SETSTATECLOSED";
export const WEBSOCKETCONNECT = "WEBSOCKETCONNECT";
export const SETAVAILABLESERVICES = "SETAVAILABLESERVICES";
export const SETAVAILABLESERVICESERROR = "SETAVAILABLESERVICESERROR";
export const STARTSERVICE = "STARTSERVICE";
export const PINGSERVICE = "PINGSERVICE";
export const PINGRESET = "PINGRESET";
export const PINGSERVICERECEIVED = "PINGSERVICERECEIVED";
export const KILLSERVICE = "KILLSERVICE";
export const HISTORYSERVICE = "HISTORYSERVICE";
export const ADDNEWSERVICE = "ADDNEWSERVICE";
export const DELETESERVICE = "DELETESERVICE";
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

export const killService = (obj, idx) => {

    return (dispatch) => {

        let msg = "lsof -t -i tcp:#PORT# | xargs kill;".replace('#PORT#',obj.Port); //*#*${obj.name} will add servicename for terminal logs

        dispatch({type: KILLSERVICE,
            payload: {
                id:obj.id,
                req:"killService",
                cmd:`${msg}`}})
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
};

export const submitNewService = (formObj)=>{
    return (dispatch)=>{
        dispatch({type:ADDNEWSERVICE,payload:{
            req:"saveConfig",
            cmd:formObj}})
    }
}
export const deleteService = (item) => {
    return dispatch =>{
        dispatch({type:DELETESERVICE,payload:{
            req:'deleteService',
            cmd:item
        }})
    }
}
