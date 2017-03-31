import React from 'react';
import {Col, Row, Grid, Panel, PanelGroup} from 'react-bootstrap/lib';
import {Glyphicon, ButtonGroup,ListGroup, ListGroupItem, Tooltip, OverlayTrigger, Well, Jumbotron, Button, Tab, Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {Table} from 'react-bootstrap/lib';


export class MemoryPanelClass extends React.Component {


    render() {

        return (
            <Panel collapsible defaultExpanded header="Memory" bsStyle="primary">
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <td>Free</td>
                        <td>Usage</td>
                        <td>Kilobytes</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1002092</td>
                        <td>3493994</td>
                        <td>20022</td>
                    </tr>
                    </tbody>
                </Table>
            </Panel>
        )
    }

}

export const MemoryPanel = MemoryPanelClass;