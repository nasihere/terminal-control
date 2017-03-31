import React from 'react';
import {Col, Row, Grid, Panel, PanelGroup} from 'react-bootstrap/lib';
import {Glyphicon, ButtonGroup,ListGroup, ListGroupItem, Tooltip, OverlayTrigger, Well, Jumbotron, Button, Tab, Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {Table} from 'react-bootstrap/lib';



export class EnviornmentPanelClass extends React.Component {


    render() {

        return (
            <Panel header="Environments" bsStyle="primary">
                <code>NODE_ENV=LOCAL;</code><br />
                <code>NODE_PORT=9090;</code><br />
                <code>NODE_KEY=A9a2383sjh2nj2293b3nk;</code><br />
            </Panel>
        )
    }

}

export const EnviornmentPanel = EnviornmentPanelClass;