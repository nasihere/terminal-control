import React from 'react';
import {Col, Row, Grid, Panel, PanelGroup} from 'react-bootstrap/lib';
import {Glyphicon, ButtonGroup,ListGroup, ListGroupItem, Tooltip, OverlayTrigger, Well, Jumbotron, Button, Tab, Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {Table} from 'react-bootstrap/lib';



export class PackagePathPanelClass extends React.Component {


    render() {

        return (
            <Panel key="package-panel" header="Package Path" bsStyle="primary">
                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">{this.props.package}</Tooltip>}>
                    <code>{this.props.package}</code>
                </OverlayTrigger>

            </Panel>
        )
    }

}

export const PackagePathPanel = PackagePathPanelClass;