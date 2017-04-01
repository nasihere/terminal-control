import React from 'react';
import {Col, Row, Grid, Panel, PanelGroup} from 'react-bootstrap/lib';
import {Glyphicon, ButtonGroup,ListGroup, ListGroupItem, Tooltip, OverlayTrigger, Well, Jumbotron, Button, Tab, Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {Table} from 'react-bootstrap/lib';
import {EnviornmentPanel} from './Panel/Enviornment.jsx';
import {PackagePathPanel} from './Panel/PackagePath.jsx';
import {StartStopButtonsPanel} from './Panel/StartStopButtons.jsx';
import {MemoryPanel} from './Panel/Memory.jsx';
import {GraphPanel} from './Panel/Graph.jsx';
import Convert from 'ansi-to-html';
let convert=new Convert({newline:true});

export class TerminalClass extends React.Component {
    constructor(props)
    {
        super(props);
    }

    createLogRow(){
        if (this.props.logs === undefined) return;
        const logs = this.props.logs;
        let prevTime = '';
        return logs.map((item,idx)=>{
            let printTime = false;
            if (prevTime !== item.time) {
                prevTime = item.time;
                printTime = true;
            }
            return <Row className="show-grid" key={"logs_inline#" + (idx + 1) + "_" + idx}>
                <Col xs={12} md={12}>
                    {(printTime) ? <code>{item.time}</code> : ''}
                    <Well bsSize="small"><div dangerouslySetInnerHTML={{__html:(item) ? convert.toHtml(item.text) : ''}}/></Well>
                    <hr />
                </Col>
            </Row>
        });
    }

    render() {

        return (
            <div>
                <Row className="show-grid ">
                    <Col xs={12} md={9} className="terminal">
                        <Panel bsStyle="default">
                            {this.createLogRow()}
                        </Panel>
                    </Col>

                    <Col xs={12} md={3} className="terminalPanel">

                        <EnviornmentPanel env={this.props.env}/>
                        <PackagePathPanel package={this.props.package}/>
                        <StartStopButtonsPanel config={this.props.config} />
                        <MemoryPanel {...this.props}/>
                        <GraphPanel />
                    </Col>
                </Row>

            </div>
        )
    }

}


export const Terminal = TerminalClass;