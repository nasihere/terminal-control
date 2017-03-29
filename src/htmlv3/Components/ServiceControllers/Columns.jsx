import React from 'react';
import {Button, PanelGroup, Panel, Row, Glyphicon} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Services} from './services.jsx';
import {startService, pingService, killService, deleteService, editService, submitNewService} from '../Application';

const verticalMode = {
    "writing-mode":"tb-rl"
};
export class ServiceColumnClass extends React.Component {
    constructor (...args){
        super(...args);
        this.state = {
            activeKey:'1',
            showPanel: false
        };
    }

    handleSelect = (activeKey) => {
        this.setState({activeKey});
    };
    handlePanelToggle = () => {
        this.setState({showPanel: !this.state.showPanel});
    }
    panel = () => {
        return <div style={{"float":"left", "padding": '0px'}}>
                    <Services {...this.props}/>
                </div>
    }
    render() {

        return (
            <div>
                <Row style={{"margin-left":"0px"}}>
                    <Button
                        bsStyle="default"
                        onClick={this.handlePanelToggle}
                        style={{"padding":'4px 4px 0px 0px', "border-radius": "0px", "float": "left"}}>
                            <p style={verticalMode}>Project</p>
                            <Glyphicon glyph="folder-open"/>
                    </Button>
                    { (this.state.showPanel) ? this.panel() : null }
                  </Row>
                <Row style={{"margin-left":"0px", "margin-top":"3px"}}>
                    <Button
                        bsStyle="default"
                        style={{"padding":'4px 4px 0px 0px', "border-radius": "0px"}}>
                        <p style={verticalMode}>Add New Project</p>
                        <Glyphicon glyph="plus"/>
                    </Button>
                </Row>
            </div>
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