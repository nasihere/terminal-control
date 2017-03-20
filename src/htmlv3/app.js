import React from 'react';
import ReactDOM from 'react-dom';
import {AppRouter} from './Router.jsx';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {RootReducer} from './RootReducers.js';
import Thunk from 'redux-thunk';
import {socketConnect} from './Components/Application/websocketHandler.js'
import styles from "./css/bootstrap.darkly.min.css";
import base from "./css/base.css";



let store = createStore(
    RootReducer,
    compose(
        applyMiddleware(Thunk,socketConnect),

        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

ReactDOM.render(
    <Provider store={store}>
        <AppRouter/>
    </Provider>,
    document.getElementById("app")
);