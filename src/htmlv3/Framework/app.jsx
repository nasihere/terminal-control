import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import {ServicesBody} from '../Views/Services';
import {HomeBody} from '../Views/Home';
import {NavBarInstance} from '../Components/NavBar';
import {connectWebSocket} from '../Actions/service_actions.js';
import {ReadMe} from '../Components/Service';
import {BranchesSimple} from '../Components/Git/branches_simple.jsx';


export class AppClass extends React.Component {


    componentDidMount () {
        this.props.connectWebSocket()
    }
    render () {
        return (
            <div className="container-fluid">
                <NavBarInstance {...this.props} />
                <Switch>
                    <Route path="/Home" component={HomeBody}/>
                    <Route path="/Services" component={ServicesBody} exact />
                    <Route path="/Services/readme/:service" component={ReadMe} />
                    <Route path="/Services/github/:service" component={BranchesSimple} />
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