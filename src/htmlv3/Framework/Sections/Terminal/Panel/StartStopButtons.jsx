import React from 'react';
import {Col, Row, Grid, Panel, PanelGroup} from 'react-bootstrap/lib';
import {Glyphicon, ButtonGroup,ListGroup, ListGroupItem, Tooltip, OverlayTrigger, Well, Jumbotron, Button, Tab, Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {Table} from 'react-bootstrap/lib';
import {startService,killService} from './../../../../Components/Application/action.js';
import {connect} from 'react-redux';

export class StartStopButtonsPanelClass extends React.Component {

    constructor(props){
        super(props);
        this.config = this.props.config;
    }
    run() {
        this.props.startService(this.config)
    }
    kill() {
        this.props.killService(this.config)
    }
    render() {

        return (
            <Panel  key="startStop-panel" header="Joker App" bsStyle="primary">
                <ButtonGroup>
                    <Button onClick={()=>{this.run()}} type="button" bsSize="xsmall" bsStyle="success"><Glyphicon glyph="play-circle"/>Run</Button>
                    <Button onClick={()=>{this.kill()}} type="button" bsSize="xsmall" bsStyle="info"><Glyphicon glyph="stop"/>Stop</Button>
                    <Button type="button" bsSize="xsmall" bsStyle="warning"><Glyphicon glyph="repeat"/>Restart</Button>
                    <Button type="button" bsSize="xsmall" bsStyle="danger"><Glyphicon glyph="remove-sign"/>Remove</Button>
                </ButtonGroup>
            </Panel>
        )
    }

}
let mapStateToProps=(state)=>{
    return {
        portStatus: state.websocket.portStatus
    }
}

export const StartStopButtonsPanel = connect(mapStateToProps,{startService,killService})(StartStopButtonsPanelClass);