import React from 'react';
import {Col, Row, Grid, Panel, PanelGroup} from 'react-bootstrap/lib';
import {Glyphicon, ButtonGroup,ListGroup, ListGroupItem, Tooltip, OverlayTrigger, Well, Jumbotron, Button, Tab, Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {Table} from 'react-bootstrap/lib';


const ChartInstance = (
    <img width={300} src="http://canvasjs.com/wp-content/uploads/2013/01/html5_multiseries_line_chart.jpg" />
);

const buttonGroupInstance = (
    <ButtonGroup>
        <Button type="button" bsSize="xsmall" bsStyle="success"><Glyphicon glyph="play-circle"/>Run</Button>
        <Button type="button" bsSize="xsmall" bsStyle="info"><Glyphicon glyph="stop"/>Stop</Button>
        <Button type="button" bsSize="xsmall" bsStyle="warning"><Glyphicon glyph="repeat"/>Restart</Button>
        <Button type="button" bsSize="xsmall" bsStyle="danger"><Glyphicon glyph="remove-sign"/>Remove</Button>
    </ButtonGroup>
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

export class TerminalClass extends React.Component {


    render() {

        return (
            <div>
                <Row className="show-grid " style_={{"background-color":"blue"}}>
                    <Col xs={12} md={9} className="terminal">
                        <Panel bsStyle="default">
                            { [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(item => {return (
                                <Row className="show-grid">
                                    {wellInstance}
                                </Row>) })}
                        </Panel>
                    </Col>

                    <Col xs={12} md={3} className="terminalPanel">
                        <Panel header="Environments" bsStyle="primary">
                            <code>NODE_ENV=LOCAL;</code><br />
                            <code>NODE_PORT=9090;</code><br />
                            <code>NODE_KEY=A9a2383sjh2nj2293b3nk;</code><br />
                        </Panel>
                        <Panel header="Package Path" bsStyle="primary">
                            <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">/myproject/package.json</Tooltip>}>
                                <code>/users/lo.../myproject/package.json</code>
                            </OverlayTrigger>

                        </Panel>
                        <Panel header="Joker App" bsStyle="primary">
                            {buttonGroupInstance}
                        </Panel>

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
                        <Panel header="Graph" bsStyle="primary">
                            {ChartInstance}
                        </Panel>

                    </Col>
                </Row>

            </div>
        )
    }

}

export const Terminal = TerminalClass;