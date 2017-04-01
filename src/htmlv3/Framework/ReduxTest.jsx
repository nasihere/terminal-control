import React from 'react';
import {Col, Row, Grid, Panel, PanelGroup} from 'react-bootstrap/lib';
import {Glyphicon, ButtonGroup,ListGroup, ListGroupItem, Tooltip, OverlayTrigger, Well, Jumbotron, Button, Tab, Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {Table} from 'react-bootstrap/lib';
import {connect} from 'react-redux';
import {ReduxLog} from './ReduxTestLogs.jsx';
import {startService,killService, deleteService} from './../../htmlv3/Components/Application/action.js';

export class ReduxTestClass extends React.Component {
    constructor(props){
        super(props);
        this.conf = null;
        this.runVisible = 'block';
        this.stopVisible = 'none';
    }
    run() {
        this.conf = this.props.services.items[0];
        if (this.conf.pid === null) {
            this.props.startService(this.conf);
        }
        else {
            alert('Service already running');
        }
    }
    kill() {
        this.conf = this.props.services.items[0];
        if (this.conf.pid !== null) {
            this.props.killService(this.conf);
        }
        else {
            alert('Service already stopped');
        }
    }
    restart() {
        this.kill();
        this.run();
    }
    remove() {
        this.conf = this.props.services.items[0];
        this.props.deleteService(this.conf)
    }
    componentWillReceiveProps(nextProps){
        this.conf = nextProps.services.items[0];
        this.runVisible = (this.conf.pid === null) ? 'block' : 'none';
        this.stopVisible = (this.conf.pid === null) ? 'none' : 'block';
    }
    render() {
        return (
            <div>
                <h1>Redux Store Test Lab!!</h1>
                <ButtonGroup>
                    <Button style={{'display':this.runVisible}} onClick={()=>{this.run()}} type="button" bsSize="xsmall" bsStyle="success"><Glyphicon glyph="play-circle"/>Run</Button>
                    <Button style={{'display':this.stopVisible}} onClick={()=>{this.kill()}} type="button" bsSize="xsmall" bsStyle="info"><Glyphicon glyph="stop"/>Stop</Button>
                    <Button onClick={()=>{this.restart()}}  type="button" bsSize="xsmall" bsStyle="warning"><Glyphicon glyph="repeat"/>Restart</Button>
                    <Button onClick={()=>{this.remove()}} type="button" bsSize="xsmall" bsStyle="danger"><Glyphicon glyph="remove-sign"/>Remove</Button>
                </ButtonGroup>
               <ReduxLog logsHistory={this.props.services}/>
            </div>
        )
    }

}

let mapStateToProps=(state)=>{
    return {
        services: state.websocket.services
    }
}

export const ReduxTest = connect(mapStateToProps,{startService,killService, deleteService})(ReduxTestClass);