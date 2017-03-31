import React from 'react';
import {Col, Row, Grid, Panel, PanelGroup} from 'react-bootstrap/lib';
import {Glyphicon, ButtonGroup,ListGroup, ListGroupItem, Tooltip, OverlayTrigger, Well, Jumbotron, Button, Tab, Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {Table} from 'react-bootstrap/lib';
import {connect} from 'react-redux';
import {ReduxLog} from './ReduxTestLogs.jsx';
import {startService,killService, deleteService} from './../../htmlv3/Components/Application/action.js';

export class ReduxTestClass extends React.Component {

    run() {
        const conf = this.props.services.items[0];
        this.props.startService(conf);
    }
    kill() {
        const conf = this.props.services.items[0];
        this.props.killService(conf);
    }
    restart() {
        this.kill();
        this.run();
    }
    remove() {
        const conf = this.props.services.items[0];
        this.props.deleteService(conf)
    }
    render() {

        return (
            <div>
                <h1>Redux Store Test Lab!!</h1>
                <ButtonGroup>
                    <Button onClick={()=>{this.run()}} type="button" bsSize="xsmall" bsStyle="success"><Glyphicon glyph="play-circle"/>Run</Button>
                    <Button onClick={()=>{this.kill()}} type="button" bsSize="xsmall" bsStyle="info"><Glyphicon glyph="stop"/>Stop</Button>
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