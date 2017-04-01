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
        this.runVisible = 'block';
        this.stopVisible = 'none';
    }
    componentWillReceiveProps(nextProps){
        this.config = nextProps.config;
        this.runVisible = (this.config.pid === null) ? 'block' : 'none';
        this.stopVisible = (this.config.pid === null) ? 'none' : 'block';
    }
    run() {
        this.props.startService(this.config)

    }
    kill() {
        this.props.killService(this.config)
    }
    restart() {
        this.kill();
        this.run();
    }
    remove() {
        const r = confirm("Do you want to remove "+this.config.name+" service?");
        if (r == true) {
            this.props.deleteService(this.config)
        }

    }
    render() {

        return (
            <Panel  key="startStop-panel" header="Joker App" bsStyle="primary">
                <ButtonGroup>
                    <Button style={{'display':this.runVisible}} onClick={()=>{this.run()}} type="button" bsSize="xsmall" bsStyle="success"><Glyphicon glyph="play-circle"/>Run</Button>
                    <Button style={{'display':this.stopVisible}} onClick={()=>{this.kill()}} type="button" bsSize="xsmall" bsStyle="info"><Glyphicon glyph="stop"/>Stop</Button>
                    <Button onClick={()=>{this.restart()}} type="button" bsSize="xsmall" bsStyle="warning"><Glyphicon glyph="repeat"/>Restart</Button>
                    <Button  type="button" bsSize="xsmall" bsStyle="primary"><Glyphicon glyph="edit"/>Edit</Button>
                    <Button onClick={()=>{this.remove()}} type="button" bsSize="xsmall" bsStyle="danger"><Glyphicon glyph="remove-sign"/>Remove</Button>
                </ButtonGroup>
            </Panel>
        )
    }

}
export const StartStopButtonsPanel = connect(null,{startService,killService})(StartStopButtonsPanelClass);