import React from 'react';
import {
    CONNECT_WEBSOCKET,
    START_SERVICE,
    KILL_SERVICE,
    PING_SERVICE,
    ADD_SERVICE_CONFIG,
    DELETE_SERVICE_CONFIG,
    EDIT_SERVICE_CONFIG
} from './dispatchTypes';


export const connectWebSocket = () => {
    return (dispatch) => {
        dispatch({type: CONNECT_WEBSOCKET})
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
        dispatch({
            type:    START_SERVICE,
            payload: {
                id:   obj.id,
                req:  "startService",
                port: obj.Port,
                cmd:  `${pwd}${obj.env}${obj.command}*#*${obj.name}`
            }
        })
    }
}

export const killService = (obj, idx) => {

    return (dispatch) => {

        //let msg = "lsof -t -i tcp:#PORT# | xargs kill;".replace('#PORT#',obj.Port); //*#*${obj.name} will add servicename for terminal logs
        if (obj.pid === null) return;
        let msg = {
            pid: obj.pid
        }
        dispatch({
            type:    KILL_SERVICE,
            payload: {
                req: "killService",
                pid: obj.pid
            }
        })
    }
}

export const pingService = (obj, idx) => {
    return (dispatch) => {
        dispatch({
            type:    PING_SERVICE,
            payload: {
                id:   obj.id,
                req:  "pingService",
                port: obj.Port
            }
        })
    }
};

export const submitNewService = (formObj) => {
    return (dispatch) => {console.log(formObj)
        dispatch({
            type: ADD_SERVICE_CONFIG, payload: {
                req: "saveConfig",
                cmd: formObj
            }
        })
    }
}
export const deleteService = (item) => {
    return dispatch => {
        dispatch({
            type: DELETE_SERVICE_CONFIG, payload: {
                req: 'deleteService',
                cmd: item
            }
        })
    }
}
export const editService = (item) => {

    return dispatch => {
        dispatch({
            type: EDIT_SERVICE_CONFIG, payload: {
                req: 'editService',
                cmd: item
            }
        })
    }
}
