import {
	SERVICE_SET_STATECLOSED
} from '../../Actions/ActionTypes';
export const onClose = (connection, store) => evt => {
	connection.close();
	store.dispatch({type: SERVICE_SET_STATECLOSED});

};