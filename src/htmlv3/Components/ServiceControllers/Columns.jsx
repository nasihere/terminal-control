import React from 'react';
import {PanelGroup, Panel, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {ServiceItems} from './services.jsx';
import {startService} from '../Application/action.js';
import {NewServiceForm} from '../Tile_NewService';

export class ServiceColumnClass extends React.Component {
    state = {
        activeKey:'1'
    }

    handleSelect = (activeKey) => {
        this.setState({activeKey});
    };
    render() {

        return (
            <Row>
                <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)} accordion>
                    <Panel header="Services" eventKey="1">
                         <ServiceItems {...this.props}/>
                    </Panel>
                    <Panel header="Add New Request" eventKey="2"> <NewServiceForm/></Panel>
                </PanelGroup>
            </Row>
        )
    }
}

let mapStateToProps=(state)=>{
    return {
        services:state.websocket.services
    }
}

export const ServiceColumn = connect(mapStateToProps,{startService})(ServiceColumnClass);