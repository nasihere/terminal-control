import React from 'react';
//import {Router, Route} from 'react-router';
import {BrowserRouter, Route, Switch, Layout, Router, Redirect} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import {App} from './Framework/app.jsx';
import {Body} from './Components/Body/body.jsx' ;

let history = createBrowserHistory();

export const AppRouter = () => {
    return (

        <BrowserRouter >
            <div>
                <Route component={App}  />
                {/*<Route exact path="/" render={()=>(<Redirect to="/Services"/>)}/>*/}
            </div>
        </BrowserRouter>
    )
}