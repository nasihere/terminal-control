import React from 'react';
import {Col, Row, Checkbox, Panel, PanelGroup} from 'react-bootstrap/lib';

import {ServiceColumn, ServiceOptions} from '../../Components/ServiceControllers'

import {connect} from 'react-redux';
import {TerminalTabs} from '../../Components/Tabs';

export class BodyClass extends React.Component {


    render() {

        return (
            <div>
                <Col style={{"float": "left",
                "padding-right": "18px", "height":"800px", "background-color":"#555555"}}>
                    <ServiceColumn />
                </Col>
                <Col xs={12} md={8}>
                    <Row>
                        <TerminalTabs {...this.props} />
                    </Row>
                </Col>
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

export const Body = connect(mapStateToProps)(BodyClass);