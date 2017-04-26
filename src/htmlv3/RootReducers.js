import React from 'react';
import {combineReducers} from 'redux';
import {ApplicationReducer} from './Reducers/reducer'
import {Reducer_Memory} from './Reducers/memory';
import {Reducer_Git} from './Reducers/git';


export const RootReducer = combineReducers({
    websocket:   ApplicationReducer,
    memoryUsage: Reducer_Memory,
    git:         Reducer_Git
})