import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import {ServicesBody} from '../Views/Services';
import {HomeBody} from '../Views/Home';
import {NavBarInstance} from '../Components/NavBar';
import {connectWebSocket} from '../Components/Application';
import {TemplateDemo} from '../Framework/template.jsx';
import {Layout} from '../Framework/Layout.jsx';
import {ReduxTest} from '../Framework/ReduxTest.jsx';
export class AppClass extends React.Component {
    state = {services: []};

    componentDidMount () {
        this.props.connectWebSocket()
    }
    render () {
        return (
            <div className="container-fluid">
                <ReduxTest />
                {/*<Layout />*/}
                {/*<TemplateDemo />*/}
                {/*<NavBarInstance />*/}
                {/*<Switch>*/}
                    {/*<Route path="/Services" component={ServicesBody}/>*/}
                    {/*<Route path="/Home" component={HomeBody}/>*/}
                {/*</Switch>*/}
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