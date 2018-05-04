import React from 'react';
import {connect} from 'react-redux';
import {Glyphicon, Button} from 'react-bootstrap/lib';

import {HomeBody} from '../Views/Home';
import {connectWebSocket, submitNewService} from '../Actions/service_actions.js';
import {AddGroupModal} from '../Views/Home'


export class AppClass extends React.Component {

    state = {
        showGroupModal: false
    }
    componentDidMount () {
        this.props.connectWebSocket()
    }
    newGroup (groupName) {

        if (groupName != null) {
            this.props.submitNewService({
                "group": groupName,
                data: []
            })
        }
    }
    closeGroupModal() {
        this.setState({
            showGroupModal: false
        })
    }

    openGroupModal() {
        this.setState({
            showGroupModal: true
        })
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
                            <HomeBody group={item.group} cardData={item.data} />
                        )
                    })
                }
                <Button type="button" bsSize="xsmall" onClick={this.openGroupModal.bind(this)} bsStyle="success">
                    <Glyphicon glyph="play-circle"/>New Group
                </Button>
                <AddGroupModal

                               show={this.state.showGroupModal}
                               close={this.closeGroupModal.bind(this)}
                               submit={this.newGroup.bind(this)}
                />
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