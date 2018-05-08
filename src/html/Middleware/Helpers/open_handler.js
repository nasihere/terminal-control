import {SERVICE_SET_STATEOPEN} from "../../Actions/ActionTypes";

export const onOpen = (connection, store) => evt => {
	store.dispatch({type: SERVICE_SET_STATEOPEN});
	let cmdObj=JSON.stringify({req:"getConfigFile"})
	connection.send(cmdObj);


}