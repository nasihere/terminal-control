import React from 'react';
import {PanelGroup, Panel, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Services} from './services.jsx';
import {startService, pingService, killService, deleteService, editService, submitNewService} from '../Application';


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
                         <Services {...this.props}/>

                    </Panel>

                </PanelGroup>
            </Row>
        )
    }
}

let mapStateToProps=(state)=>{
    return {
        services:state.websocket.services,
        portStatus: state.websocket.portStatus
    }
}

export const ServiceColumn = connect(mapStateToProps,{startService, pingService, killService, deleteService,editService, submitNewService})(ServiceColumnClass);