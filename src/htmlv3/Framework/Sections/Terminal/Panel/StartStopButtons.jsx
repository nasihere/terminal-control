import React from 'react';
import {Col, Row, Grid, Panel, PanelGroup} from 'react-bootstrap/lib';
import {Glyphicon, ButtonGroup,ListGroup, ListGroupItem, Tooltip, OverlayTrigger, Well, Jumbotron, Button, Tab, Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {Table} from 'react-bootstrap/lib';


export class StartStopButtonsPanelClass extends React.Component {


    render() {

        return (
            <Panel header="Joker App" bsStyle="primary">
                <ButtonGroup>
                    <Button type="button" bsSize="xsmall" bsStyle="success"><Glyphicon glyph="play-circle"/>Run</Button>
                    <Button type="button" bsSize="xsmall" bsStyle="info"><Glyphicon glyph="stop"/>Stop</Button>
                    <Button type="button" bsSize="xsmall" bsStyle="warning"><Glyphicon glyph="repeat"/>Restart</Button>
                    <Button type="button" bsSize="xsmall" bsStyle="danger"><Glyphicon glyph="remove-sign"/>Remove</Button>
                </ButtonGroup>
            </Panel>
        )
    }

}

export const StartStopButtonsPanel = StartStopButtonsPanelClass;