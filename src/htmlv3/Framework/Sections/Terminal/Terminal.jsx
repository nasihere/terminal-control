import React from 'react';
import {Col, Row, Grid, Panel, PanelGroup} from 'react-bootstrap/lib';
import {Glyphicon, ButtonGroup,ListGroup, ListGroupItem, Tooltip, OverlayTrigger, Well, Jumbotron, Button, Tab, Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {Table} from 'react-bootstrap/lib';
import {EnviornmentPanel} from './Panel/Enviornment.jsx';
import {PackagePathPanel} from './Panel/PackagePath.jsx';
import {StartStopButtonsPanel} from './Panel/StartStopButtons.jsx';
import {MemoryPanel} from './Panel/Memory.jsx';
import {GraphPanel} from './Panel/Graph.jsx';


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
                <Row className="show-grid ">
                    <Col xs={12} md={9} className="terminal">
                        <Panel bsStyle="default">
                            { [1,2,3].map((item,index) => {return (
                                <Row key={'logs'+index} className="show-grid">
                                    {wellInstance}
                                </Row>) })}
                        </Panel>
                    </Col>

                    <Col xs={12} md={3} className="terminalPanel">

                        <EnviornmentPanel env={this.props.env}/>
                        <PackagePathPanel package={this.props.package}/>
                        <StartStopButtonsPanel config={this.props.config} />
                        <MemoryPanel />
                        <GraphPanel />
                    </Col>
                </Row>

            </div>
        )
    }

}

export const Terminal = TerminalClass;