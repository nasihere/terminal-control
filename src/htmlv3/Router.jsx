import React from 'react';
import {BrowserRouter, Route, Layout, Redirect} from 'react-router-dom';
import {App} from './Framework/app.jsx';


export const AppRouter = () => {
    return (
        <BrowserRouter >
            <div>
                <Route component={App}  />
            </div>
        </BrowserRouter>
    )
}