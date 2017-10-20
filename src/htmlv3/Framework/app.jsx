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
        // console.log(JSON.stringify(this.props.services.items))
        const groupService = [{
            key: "gsPeggy",
            group: "My Name is Peggy",
            data: [
                {
                    serviceName: "User Micro-Service",
                    env: "NODE_ENV=DIT;NODE_PORT=4030;NODE_DEBUG=OFF",
                    logs: [{
                        time:"10:10:10",
                        text:"something went wrong"
                    },{
                        time:"10:10:10",
                        text:"something went wrong"
                    },{
                        time:"10:10:10",
                        text:"something went wrong"
                    },{
                        time:"10:10:10",
                        text:"something went wrong"
                    }]
                },
                {
                    serviceName: "AutoPay Micro-Service",
                    env: "NODE_ENV=DIT;NODE_PORT=4030;NODE_DEBUG=OFF",
                    logs: [{
                        time:"10:10:10",
                        text:"something went wrong"
                    },{
                        time:"10:10:10",
                        text:"something went wrong"
                    },{
                        time:"10:10:10",
                        text:"something went wrong"
                    },{
                        time:"10:10:10",
                        text:"something went wrong"
                    }]
                },
                {
                    serviceName: "Top Micro-Service",
                    env: "NODE_ENV=DIT;NODE_PORT=4030;NODE_DEBUG=OFF",
                    logs: [{
                        time:"10:10:10",
                        text:"something went wrong"
                    },{
                        time:"10:10:10",
                        text:"something went wrong"
                    },{
                        time:"10:10:10",
                        text:"something went wrong"
                    },{
                        time:"10:10:10",
                        text:"something went wrong"
                    }]
                }
            ]
        },{
            key: "gsOverwatch",
            group: "Overwatch"
        },{
            key: "gsUnderdog",
            group: "Underdog"
        },{
            key: "gsFusionsquad",
            group: "Fusion Squad"
        }]
        return (
            <div className="container">
                <h4>Node Service Agent</h4>
                {
                    groupService.map((item)=> {
                        return (
                            <HomeBody key={item.key} group={item.group} cardData={item.data} />
                        )
                    })
                }
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        services: state.websocket.services,
        websocket: state.websocket
    }
}

export const App = connect(mapStateToProps, {connectWebSocket})(AppClass);