import React from 'react';

import {
	WEBSOCKET_CONNECT,
	SERVICE_START,
	SERVICE_KILL,
	SERVICE_PING,
	SERVICE_ADD_CONFIG,
	SERVICE_DELETE_CONFIG,
	SERVICE_EDIT_CONFIG
} from '../Actions/ActionTypes';
export const connectWebSocket = () => {
	return (dispatch) => {
		dispatch({type: WEBSOCKET_CONNECT})
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
			type:    SERVICE_START,
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
			type:    SERVICE_KILL,
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
			type:    SERVICE_PING,
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
			type: SERVICE_ADD_CONFIG, payload: {
				req: "saveConfig",
				cmd: formObj
			}
		})
	}
}
export const deleteService = (item) => {
	return dispatch => {
		dispatch({
			type: SERVICE_DELETE_CONFIG, payload: {
				req: 'deleteService',
				cmd: item
			}
		})
	}
}
export const editService = (item) => {

	return dispatch => {
		dispatch({
			type: SERVICE_EDIT_CONFIG, payload: {
				req: 'editService',
				cmd: item
			}
		})
	}
}
