import React from 'react';
import {Col, Row} from 'react-bootstrap/lib';
import {Glyphicon, Tab, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {Terminal} from './Terminal/Terminal.jsx';
import {PanelWindow} from './Terminal/PanelWindow.jsx';

export class TabsClass extends React.Component {


    render() {

        return (
            <Tab.Container id="tabs-with-dropdown" defaultActiveKey="first">
                <Row className="clearfix">
                    <Col sm={12}>
                        <Nav bsStyle="tabs">
                            <NavItem eventKey="first">
                                Joker App <span className="label label-default">(20)</span>
                            </NavItem>
                            <NavItem eventKey="second">
                                Madness App <span className="label label-default">(10)</span>
                            </NavItem>
                            <NavDropdown eventKey="3" title="Project" id="nav-dropdown-within-tab">
                                <MenuItem eventKey="3.1">Blind App</MenuItem>
                                <MenuItem eventKey="3.2">Handicap App</MenuItem>
                                <MenuItem eventKey="3.3">Something else here</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey="3.4">Separated link</MenuItem>
                            </NavDropdown>
                            <NavItem pullRight={true} eventKey="NewProject">
                                <Glyphicon glyph="folder-open"/> &nbsp;New Project
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="first">
                                <Terminal />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <PanelWindow />
                            </Tab.Pane>
                            <Tab.Pane eventKey="3.1">
                                <Row className="show-grid" style={{"background-color":"blue"}}>
                                    <Col xs={12} md={6}><code>&lt;{'Terminal Log'} /&gt;</code></Col>
                                    <Col xs={12} md={2}><code>&lt;{'Service Infomation'} /&gt;</code></Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="3.2">
                                Tab 3.2 content
                            </Tab.Pane>
                            <Tab.Pane eventKey="3.3">
                                Tab 3.3 content
                            </Tab.Pane>
                            <Tab.Pane eventKey="3.4">
                                Tab 3.4 content
                            </Tab.Pane>

                            <Tab.Pane eventKey="NewProject">
                                Tab 3.4 content
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        )
    }

}

export const Tabs = TabsClass;