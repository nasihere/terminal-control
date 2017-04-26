import React from 'react';
import {Col, Row, Panel} from 'react-bootstrap/lib';
import {Well, Alert} from 'react-bootstrap/lib';
import {EnviornmentPanel} from './Panel/Environment.jsx';
import {PackagePathPanel} from './Panel/PackagePath.jsx';
import {StartStopButtonsPanel} from './Panel/StartStopButtons.jsx';
import {MemoryPanel} from './Panel/Memory.jsx';
import {SearchLogPanel} from './Panel/SearchLog.jsx';

import {ConfigDashboard} from './Panel/ConfigDashboard.jsx';


import Convert from 'ansi-to-html';
let convert=new Convert({newline:true});

export class TerminalClass extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            searchLog: ''
        }
        this.handleLog = this.handleLog.bind(this);
    }

    handleLog(e) {
        this.setState({ searchLog: e.target.value });
    }

    createLogRow(){
        if (this.props.logs === undefined) return;
        const logs = this.props.logs;
        let prevTime = '';

        return logs.map((item,idx)=>{
            if (this.state.searchLog === '' || item.text.toLowerCase().indexOf(this.state.searchLog.toLowerCase()) !== -1) {
                let printTime = false;
                if (prevTime !== item.time) {
                    prevTime = item.time;
                    printTime = true;
                }
                return <Row className="show-grid" key={"logs_inline#" + (idx + 1) + "_" + idx}>
                    <Col xs={12} md={12}>
                        {(printTime) ? <code>{item.time}</code> : ''}
                        <Well bsSize="small" className="well-logs">
                            <div dangerouslySetInnerHTML={{__html:(item) ? convert.toHtml(item.text) : ''}}/>
                        </Well>
                    </Col>
                </Row>
            }
        });
    }
    render() {

        return (
            <div>
                <Row className="show-grid ">
                    <Col xs={12} md={9} className="terminal">
                        <Panel bsStyle="default">
                            {status}
                            {this.createLogRow()}
                        </Panel>
                    </Col>

                    <Col xs={12} md={3} className="terminalPanel">

                        <Col xs={12} md={12}>
                            <SearchLogPanel
                            handleLog={this.handleLog}
                            searchLog={this.props.searchLog} />

                        </Col>
                        <Col xs={4} md={12}>
                            <ConfigDashboard {...this.props}/>


                        </Col>
                        <Col xs={4} md={12}>
                            <EnviornmentPanel env={this.props.env}/>
                        </Col>
                        <Col xs={4} md={12}>
                            <PackagePathPanel package={this.props.package}/>
                        </Col>
                        <Col xs={4} md={12}>
                            <Panel  key="startStop-panel" header={this.props.config.name} bsStyle="primary">
                                <StartStopButtonsPanel config={this.props.config} />
                            </Panel>
                        </Col>
                        <Col xs={8} md={12}>
                            <MemoryPanel memoryId={this.props.memoryId}/>
                        </Col>
                    </Col>
                </Row>

            </div>
        )
    }

}


export const Terminal = TerminalClass;