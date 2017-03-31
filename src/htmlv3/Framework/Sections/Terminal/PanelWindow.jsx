import React from 'react';
import {Col, Row, Grid, Panel, PanelGroup} from 'react-bootstrap/lib';
import {Glyphicon, ButtonGroup,ListGroup, ListGroupItem, Tooltip, OverlayTrigger, Well, Jumbotron, Button, Tab, Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {Table} from 'react-bootstrap/lib';

const title = (
    <h3>Panel title</h3>
);

const wellInstance = (
    <div>
        <Col xs={12} md={12}>
            <code>{'10:00 AM'}</code>
            <Well bsSize="small">Connection from origin http://localhost:8080!</Well>
            <hr />
        </Col>
    </div>
);
export class PanelWindowClass extends React.Component {


    render() {

        return (
            <div>
                <Row className="show-grid" style_={{"background-color":"blue"}}>
                    <Col xs={12} md={9}>
                        <Panel bsStyle="default">
                            { [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(item => {return (
                                <Row className="show-grid">
                                    {wellInstance}
                                </Row>) })}

                        </Panel>
                    </Col>

                    <Col xs={12} md={3}>
                        <Panel header={title} bsStyle="primary">
                            Panel content2
                        </Panel>
                        <Panel header={title} bsStyle="success">
                            Panel content
                        </Panel>
                        <Panel header={title} bsStyle="info">
                            Panel content
                        </Panel>
                    </Col>
                </Row>

            </div>
        )
    }

}

export const PanelWindow = PanelWindowClass;