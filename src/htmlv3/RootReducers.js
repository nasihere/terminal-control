import React from 'react';
import {combineReducers} from 'redux';
import {ApplicationReducer} from './Components/Application/reducer'



export const RootReducer = combineReducers({
    websocket:ApplicationReducer
})