import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import {ServicesBody} from '../Views/Services';
import {NavBarInstance} from '../Components/NavBar';
import {connectWebSocket} from '../Components/Application';


export class AppClass extends React.Component {
    state = {services: []};

    componentDidMount () {
        this.props.connectWebSocket()
    }
    render () {
        return (
            <div>
                <NavBarInstance />
                <Switch>
                    <Route path="/Services" component={ServicesBody}/>
                    <Route path="/Home" render={() => (<div>Home</div>)}/>
                </Switch>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        websocket: state.websocket
    }
}

export const App = connect(mapStateToProps, {connectWebSocket})(AppClass);