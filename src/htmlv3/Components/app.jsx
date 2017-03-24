import React from 'react';
import {connect} from 'react-redux';
import {NavBarInstance} from './NavBar/index.jsx';
import {Body} from './Body/body.jsx';
import {connectWebSocket} from './Application/action.js';
import {Route, Switch} from 'react-router-dom';

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
                    <Route path="/Services" component={Body}/>
                    <Route path="/Home" render={() => (<div>Home</div>)}/>
                    <Route path="/Import" render={() => ( <div>Import</div>)}/>
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