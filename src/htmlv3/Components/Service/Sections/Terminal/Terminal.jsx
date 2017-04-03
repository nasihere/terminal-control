import React from 'react';
import {Col, Row, Panel} from 'react-bootstrap/lib';
import {Well} from 'react-bootstrap/lib';
import {EnviornmentPanel} from './Panel/Enviornment.jsx';
import {PackagePathPanel} from './Panel/PackagePath.jsx';
import {StartStopButtonsPanel} from './Panel/StartStopButtons.jsx';
import {MemoryPanel} from './Panel/Memory.jsx';
import Convert from 'ansi-to-html';
let convert=new Convert({newline:true});

export class TerminalClass extends React.Component {
    constructor(props)
    {
        super(props);
    }

    createLogRow(){
        if (this.props.logs === undefined) return;
        const logs = this.props.logs;console.log(logs)
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
                        <MemoryPanel memoryId={this.props.memoryId}/>

                    </Col>
                </Row>

            </div>
        )
    }

}


export const Terminal = TerminalClass;