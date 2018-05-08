import * as React from 'react';
import {
	GIT_SET_ISWORKINGTREE,
	GIT_SET_BRANCHES,
	GIT_SET_WORKINGBRANCH,
	GIT_SET_REMOTEBRANCHES,
	GIT_SET_STATUS
} from '../Actions/ActionTypes';


export const Reducer_Git =(state={},action)=>{
	let newState={};
	switch (action.type){
		case GIT_SET_ISWORKINGTREE:
		case GIT_SET_BRANCHES:
		case GIT_SET_WORKINGBRANCH:
		case GIT_SET_REMOTEBRANCHES:
		case GIT_SET_STATUS:
			for (let key in action.payload){
				newState[key]=Object.assign({},state[key],action.payload[key]);
			}

			return Object.assign({},state,newState);

		default:
			return state;
	}
}