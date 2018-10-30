import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {RootReducer} from './RootReducers.js';
import thunk from 'redux-thunk';
import { createWebsocketMiddleware } from './Middleware'
import { MessengerContainer } from './Components/messengerContainer';

let composables = [  ];
let middlewares = [ thunk, createWebsocketMiddleware() ];

if(typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function'){
    composables.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
}

let store = createStore(
    RootReducer,
    compose(applyMiddleware(...middlewares), ...composables)

);

ReactDOM.render(
    <Provider store={store}>
        <div>
            <MessengerContainer />
        </div>
    </Provider>,
    document.getElementById("app")
);