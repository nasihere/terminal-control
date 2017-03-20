import React from 'react';
import {Router, Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import {App} from './Components/app.jsx'

let history= createBrowserHistory();

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Route path="/" component={App}/>
        </BrowserRouter>
    )
}