import {
	GIT_SET_ISWORKINGTREE,
	MEMORY_CLEAR_USAGE,
	MEMORY_SET_USAGE,
	SERVICE_SET_SERVICE_STATE,
	SERVICES_SET_AVAILABLE,
	SERVICES_SET_AVAILABLEERROR,
	SERVICE_PING_RECEIVED,
	SERVICE_LOG_HISTORY,

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
export const onMessage = (conn, store) => evt => {
	try {
		let response = JSON.parse(evt.data);
		switch (response.type) {
			case "history":
				break;
			case "message":
				store.dispatch({type: SERVICE_LOG_HISTORY, payload: response.data});
				break;
			case "ping":

				store.dispatch({type: SERVICE_PING_RECEIVED, payload: {status: response.data}});
				break;
			case "status":
				store.dispatch({type: SERVICE_SET_SERVICE_STATE, payload: response.data});
				if (!response.data.connected) {
					store.dispatch({type: MEMORY_CLEAR_USAGE, payload: response.data});
				}
				break;
			case 'memory_usage':
				store.dispatch({type: MEMORY_SET_USAGE, payload: response.data});
				break;
			case 'git':
				store.dispatch({type: GIT_SET_ISWORKINGTREE, payload: response.payload});
				break;
			case "saveConfig":
			case "readConfig":
			case "deleteConfig":
			case "updateConfig":

				store.dispatch({type: SERVICES_SET_AVAILABLE, payload: response.data});
				break;
			default:
				throw new EventError(response.data, "Invalid Dispatch Type")
		}

	}
	catch (e) {
		if (e instanceof EventError) {
			store.dispatch({type: SERVICES_SET_AVAILABLEERROR, payload: {item: e.referenceObj, error: e.message}})
		}
		else {
			console.log(e)
		}
	}
}