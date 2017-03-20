import React from 'react';
import {connect} from 'react-redux';
import {NavBarInstance} from './NavBar/index.jsx';
import {Body} from './Body/body.jsx';
import {connectWebSocket} from './Application/action.js';

export class AppClass extends React.Component {
    state={services:[]};
    componentDidMount() {
        this.props.connectWebSocket()
    }

    render() {
        let state=this.state;

        return (
            <div>
                <NavBarInstance />
                <Body {...state}/>
            </div>
        );
    }
}

let mapStateToProps=(state)=>{
    return {
        websocket:state.websocket
    }
}

export const App = connect(mapStateToProps,{connectWebSocket})(AppClass);