import React from 'react';
import {Col, Row, Grid, Panel, PanelGroup} from 'react-bootstrap/lib';
import {Glyphicon, ButtonGroup,ListGroup, ListGroupItem, Tooltip, OverlayTrigger, Well, Jumbotron, Button, Tab, Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {Table} from 'react-bootstrap/lib';
import {connect} from 'react-redux';
import {ReduxLog} from './ReduxTestLogs.jsx';
import {startService,killService} from './../../htmlv3/Components/Application/action.js';
const config = {
    "name": "User Microservice",
    "Port": "3080",
    "env": "export NODE_ENV=LOCAL; export NODE_PORT=3080; export debug=info;",
    "command": "npm run start;",
    "cd": "/Users/sayedn/projects/ceh/id-ceh-microservice-user",
    "id": "27t98wshxsroock8kco40"
};
export class ReduxTestClass extends React.Component {

    run() {
        this.props.startService(config);
    }
    kill() {
        const conf = this.props.services.items[0];
        this.props.killService(conf);
    }
    printLogs(){
        console.log(this.props.services);
    }
    render() {

        return (
            <div>
                <ButtonGroup>
                    <Button onClick={()=>{this.run()}} type="button" bsSize="xsmall" bsStyle="success"><Glyphicon glyph="play-circle"/>Run</Button>
                    <Button onClick={()=>{this.kill()}} type="button" bsSize="xsmall" bsStyle="info"><Glyphicon glyph="stop"/>Stop</Button>
                    <Button type="button" bsSize="xsmall" bsStyle="warning"><Glyphicon glyph="repeat"/>Restart</Button>
                    <Button type="button" bsSize="xsmall" bsStyle="danger"><Glyphicon glyph="remove-sign"/>Remove</Button>
                </ButtonGroup>
                <pre>
                    <Button onClick={()=>this.printLogs()}>Print Logs</Button>
                </pre>
               <ReduxLog logsHistory={this.props.services}/>
            </div>
        )
    }

}

let mapStateToProps=(state)=>{
    return {
        logsHistory:state.websocket.logsHistory[0],
        services: state.websocket.services
    }
}

export const ReduxTest = connect(mapStateToProps,{startService,killService})(ReduxTestClass);