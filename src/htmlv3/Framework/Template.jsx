import React from 'react';
import {Col, Row, Grid, Panel, PanelGroup} from 'react-bootstrap/lib';
import {Glyphicon, ButtonGroup,ListGroup, ListGroupItem, Tooltip, OverlayTrigger, Well, Jumbotron, Button, Tab, Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {Table} from 'react-bootstrap/lib';

const ChartInstance = (
    <img width={300} src="http://canvasjs.com/wp-content/uploads/2013/01/html5_multiseries_line_chart.jpg" />
);
var ReactMarkdown = require('react-markdown');
var input = `# NodeServicesAgent 
Version 0.0.7

NodeServices Agent is a terminal on browser to start/stop all the node application by one click. It has feature to view NODE Application console.logs directly on webview. Ability to search logs and append new node service application. It easy to manage all running instance in one single interface.&#x201D;

It easy and fast for development purpose. To get all information of your apps in one place. 

#### Install
---------
You can install this package with npm.
    
&#x60;npm install -g nodeserviceagent&#x60;
Then go to the terminal and type &#x60;nsa&#x60; to run the application. 

Default port 8125. If you wish to choose own port 
e.g 1: &#x60;nsa --port=8125&#x60;

You can also set RC config path
e.g 2: &#x60;nsa --port=8125 --config=/user/document/project/projectconfig.json&#x60;


#### RC Config (Optional)
---------
If you have any RC config available in the system. &#x60;nsa&#x60; will hook up to that config by automatically. That generally will be helpful for big organizations.


    &#x60;&#x60;&#x60;
    $ cd ~/
    $ vim .dev-micro-dashboardrc

    pathConfig = &#x22;&#x3C;Path to json config file&#x3E;&#x22;

    hit Esc
    type :wq
    hit Enter

    $ cd &#x3C;your package.json path&#x3E;
    $ run &#x27;npm run start&#x60;
    &#x60;&#x60;&#x60;

run the &#x60;nsa&#x60;

EXAMPLE: RC Config parameter 
---------

&#x60;&#x60;&#x60;
{
    &#x22;configService&#x22;:[
        {
            &#x22;name&#x22;: &#x3C;nameOfService:string&#x3E;,
            &#x22;Port&#x22;: &#x3C;portnumber:string&#x3E;,
            &#x22;env&#x22;:&#x3C;environmentVariables&#x3E;, // export NODE_ENV=LOCAL; export NODE_ENC=ABC;
            &#x22;command&#x22;:&#x3C;npm command string:string&#x3E;, // &#x22;npm run start&#x22;
            &#x22;cd&#x22;:&#x3C;pathofexternalproject:string&#x3E; // &#x22;/user/project/pacakge.json&#x22;
        }
    ]
}    
&#x60;&#x60;&#x60;
`;
import {connect} from 'react-redux';

const wellInstance = (
    <div>
        <Col xs={12} md={12}>
            <code>{'10:00 AM'}</code>
            <Well bsSize="small">Connection from origin http://localhost:8080!</Well>
            <hr />
        </Col>
    </div>
);
const buttonGroupInstance = (
    <ButtonGroup>
        <Button type="button" bsSize="xsmall" bsStyle="success"><Glyphicon glyph="play-circle"/>Run</Button>
        <Button type="button" bsSize="xsmall" bsStyle="info"><Glyphicon glyph="stop"/>Stop</Button>
        <Button type="button" bsSize="xsmall" bsStyle="warning"><Glyphicon glyph="repeat"/>Restart</Button>
        <Button type="button" bsSize="xsmall" bsStyle="danger"><Glyphicon glyph="remove-sign"/>Remove</Button>
    </ButtonGroup>
);



const jumbotronInstance = (
    <Jumbotron>
        <h6>Readme</h6>
        <ReactMarkdown source={input} />

    </Jumbotron>
);


const title = (
    <h3>Panel title</h3>
);

const panelsInstance = (
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
);

const panelsInstance2 = (
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
);

const tabsInstance = (
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
                        <Glyphicon glyph="`"/> &nbsp;New Project
                    </NavItem>
                </Nav>
            </Col>
            <Col sm={12}>
                <Tab.Content animation>
                    <Tab.Pane eventKey="first">
                        {panelsInstance}
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                        {panelsInstance2}
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
);
const navbarInstance = (
    <Navbar collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="#">Node-Services</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
                <NavItem eventKey={1} href="#">Dashboard</NavItem>
                <NavItem eventKey={2} href="#">Services</NavItem>
                <NavDropdown eventKey={3} title="Tools" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Action</MenuItem>
                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.3}>Separated link</MenuItem>
                </NavDropdown>
            </Nav>
            <Nav pullRight>
                <NavItem eventKey={1} href="#"><Glyphicon glyph="search"/> Search</NavItem>
                <NavItem eventKey={2} href="#"></NavItem>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

const gridInstance = (
    <Grid>
        <Row className="show-grid menubar" style_={{"background-color":"red"}}>
            <Col xs={12} md={12}>{navbarInstance}</Col>
        </Row>

        <Row className="show-grid" style_={{"background-color":"pink"}}>
            <Col xs={12} md={12}>{tabsInstance}</Col>
        </Row>




        <Row className="show-grid" style_={{"background-color":"#FFF"}}>
            <Col md={12}>{}</Col>
        </Row>
    </Grid>
);


export class TemplateDemoClass extends React.Component {


    render() {

        return (
            <div>
                {gridInstance}
            </div>
        )
    }

}

let mapStateToProps=(state)=>{
    return {
        logsHistory:state.websocket.logsHistory,
        services: state.websocket.services
    }
}

export const TemplateDemo = connect(mapStateToProps)(TemplateDemoClass);