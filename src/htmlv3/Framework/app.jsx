import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {Glyphicon, Button} from 'react-bootstrap/lib';

import {ServicesBody} from '../Views/Services';
import {HomeBody} from '../Views/Home';
import {NavBarInstance} from '../Components/NavBar';
import {connectWebSocket, submitNewService} from '../Actions/service_actions.js';
import {ReadMe} from '../Components/Service';
import {BranchesSimple} from '../Components/Git/branches_simple.jsx';


export class AppClass extends React.Component {


    componentDidMount () {
        this.props.connectWebSocket()
    }
    newGroup () {
        var groupName = prompt("Please enter new group name", "My Name is peggy");

        if (groupName != null) {
            this.props.submitNewService({
                "group": groupName,
                data: []
            })
        }
    }
    render () {
        if (this.props.services.items === []) return null;
        const groupService = this.props.services.items;
        let group = [];
        groupService.map((item)=>{

             if (group[item.group] !== undefined) {
                 group[item.group].data.push(item);
             }
             else {
                 group[item.group] = {group: item.group, data: []}
                 group[item.group].data.push(item);
             }
            // group[item.group] = {"data": item}
        })
        let groupList = [];
        for (var i in group) {
            groupList.push(group[i])

        }
        return (
            <div className="container">
                <h4>Node Service Agent</h4>
                {
                    groupList.map((item)=> {

                        return (
                            <HomeBody key={item.name} group={item.group} cardData={item.data} />
                        )
                    })
                }
                <Button type="button" bsSize="xsmall" onClick={this.newGroup.bind(this)} bsStyle="success">
                    <Glyphicon glyph="play-circle"/>New Group
                </Button>

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

export const App = connect(mapStateToProps, {submitNewService, connectWebSocket})(AppClass);