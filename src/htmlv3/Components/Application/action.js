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
export const startService = (obj, altCmd) => {

    return (dispatch) => {

        dispatch({
            type:    START_SERVICE,
            payload: {
                id:   obj.id,
                req:  "startService",
                port: obj.Port,
                cmd:  {
                    pwd: obj.cd,
                    env: obj.env,
                    cmd: altCmd || obj.command,
                    name: obj.name}
            }
        })
    }
}

export const killService = (obj, idx) => {

    return (dispatch) => {

        //let msg = "lsof -t -i tcp:#PORT# | xargs kill;".replace('#PORT#',obj.Port); //*#*${obj.name} will add servicename for terminal logs
        let msg = {
            pid: obj.pid
        }
        dispatch({
            type:    KILL_SERVICE,
            payload: {
                id:  obj.id,
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
    return (dispatch) => {

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
