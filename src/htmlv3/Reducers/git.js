import * as React from 'react';

import {
	GIT_SET_ISWORKINGTREE
} from '../Actions/ActionTypes';


export const Reducer_Git =(state={},action)=>{
	switch (action.type){
		case GIT_SET_ISWORKINGTREE:
			return Object.assign({},state,action.payload);
		default:
			return state;
	}
}