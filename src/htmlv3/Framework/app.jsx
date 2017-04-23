import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import {ServicesBody} from '../Views/Services';
import {HomeBody} from '../Views/Home';
import {NavBarInstance} from '../Components/NavBar';
import {connectWebSocket} from '../Components/Application';
import {ReadMe} from '../Components/Service';


export class AppClass extends React.Component {
    state = {services: []};

    componentDidMount () {
        this.props.connectWebSocket()
    }
    render () {
        return (
            <div className="container-fluid">
                <NavBarInstance {...this.props} />
                <Switch>
                    <Route path="/Services" component={ServicesBody} exact />
                    <Route path="/Services/readme/:service" component={ReadMe} />
                    <Route path="/Home" component={HomeBody}/>
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