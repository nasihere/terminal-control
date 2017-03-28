import React from 'react';
import {combineReducers} from 'redux';
import {ApplicationReducer} from './Components/Application/reducer'
import {MemoryReducer} from './Components/Application/memoryReducer'



export const RootReducer = combineReducers({
    websocket:ApplicationReducer,
    memoryUsage:MemoryReducer
})