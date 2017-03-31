import React from 'react';
import {Col, Row, Grid, Panel, PanelGroup} from 'react-bootstrap/lib';
import {Glyphicon, ButtonGroup,ListGroup, ListGroupItem, Tooltip, OverlayTrigger, Well, Jumbotron, Button, Tab, Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {Table} from 'react-bootstrap/lib';



export class PackagePathPanelClass extends React.Component {


    render() {

        return (
            <Panel header="Package Path" bsStyle="primary">
                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">/myproject/package.json</Tooltip>}>
                    <code>/users/lo.../myproject/package.json</code>
                </OverlayTrigger>

            </Panel>
        )
    }

}

export const PackagePathPanel = PackagePathPanelClass;