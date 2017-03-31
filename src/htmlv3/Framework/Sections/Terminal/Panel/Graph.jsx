import React from 'react';
import {Col, Row, Grid, Panel, PanelGroup} from 'react-bootstrap/lib';
import {Glyphicon, ButtonGroup,ListGroup, ListGroupItem, Tooltip, OverlayTrigger, Well, Jumbotron, Button, Tab, Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {Table} from 'react-bootstrap/lib';


export class GraphPanelClass extends React.Component {


    render() {

        return (
            <Panel header="Graph" bsStyle="primary">
                <img width={300} src="http://canvasjs.com/wp-content/uploads/2013/01/html5_multiseries_line_chart.jpg" />
            </Panel>
        )
    }

}

export const GraphPanel = GraphPanelClass;