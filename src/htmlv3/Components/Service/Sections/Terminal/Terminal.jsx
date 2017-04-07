import React from 'react';
import {Col, Row, Panel} from 'react-bootstrap/lib';
import {Well, Alert} from 'react-bootstrap/lib';
import {EnviornmentPanel} from './Panel/Enviornment.jsx';
import {PackagePathPanel} from './Panel/PackagePath.jsx';
import {StartStopButtonsPanel} from './Panel/StartStopButtons.jsx';
import {MemoryPanel} from './Panel/Memory.jsx';
import {SearchLogPanel} from './Panel/SearchLog.jsx';

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
                        <Panel  key="search-panel" header='Search' bsStyle="primary">
                            <SearchLogPanel
                                handleLog={this.handleLog}
                                searchLog={this.props.searchLog} />
                        </Panel>
                        <EnviornmentPanel env={this.props.env}/>
                        <PackagePathPanel package={this.props.package}/>
                        <Panel  key="startStop-panel" header={this.props.config.name} bsStyle="primary">
                            <StartStopButtonsPanel config={this.props.config} />
                        </Panel>
                        <MemoryPanel memoryId={this.props.memoryId}/>

                    </Col>
                </Row>

            </div>
        )
    }

}


export const Terminal = TerminalClass;