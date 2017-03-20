import React from 'react';
import ReactDOM from 'react-dom';
import {AppRouter} from './Router.jsx';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {RootReducer} from './RootReducers.js';
import styles from "./css/bootstrap.darkly.min.css";
import base from "./css/base.css";

let store = createStore(RootReducer);

ReactDOM.render( <Provider store={store}><AppRouter/></Provider>, document.getElementById("app"));