import React from 'react';

import {
	WEBSOCKET_CONNECT,
	GIT_GET_ISWORKINGTREE,
	GIT_GET_BRANCHES,
	GIT_GET_WORKINGBRANCH,
	GIT_GET_REMOTEBRANCHES,
	GIT_GET_STATUS,
	SERVICE_START,
	SERVICE_KILL,
	SERVICE_ADD_CONFIG,
	SERVICE_DELETE_CONFIG,
	SERVICE_EDIT_CONFIG,
    GIT_GET_PULL
} from '../Actions/ActionTypes';
import {onMessage} from './Helpers/message_handler.js';
import {onOpen} from './Helpers/open_handler.js';
import {onClose} from './Helpers/close_handler.js';

var currentWindow = electron ? electron.remote.getCurrentWindow() : { wssPort: 1337};

export const socketConnect = (function () {
	let connection = null;


	return store => next => action => {
		let payload = action.payload ? JSON.stringify(action.payload) : null;
		switch (action.type) {

			case WEBSOCKET_CONNECT:
				if (connection !== null) {
					onClose(connection, store)
				}
				connection = new WebSocket(`ws://127.0.0.1:${currentWindow.wssPort}`);
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
			case GIT_GET_REMOTEBRANCHES:
			case GIT_GET_WORKINGBRANCH:
			case GIT_GET_STATUS:
				connection.send(payload);
				break;
            case GIT_GET_PULL:
                connection.send(payload);
                break;
			default:
				return next(action);
		}
	}
})();