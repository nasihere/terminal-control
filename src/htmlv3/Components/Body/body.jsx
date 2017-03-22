import React from 'react';
import {Col, Row, Checkbox, Panel, PanelGroup} from 'react-bootstrap/lib';
import {Tile} from '../Common/Tile/tile.jsx';
import {ServiceColumn} from '../ServiceControllers'

import {connect} from 'react-redux';
export class BodyClass extends React.Component {


    render() {

        return (
            <div>
                <Col xs={12} md={4}>
                    <ServiceColumn />
                </Col>
                <Col xs={12} md={8}>
                    <Row>
                        <Col xs={6}>
                            <h5>
                                Logs
                            </h5>
                        </Col>
                        <Col xs={6}>
                            <Checkbox>Inline Logs</Checkbox>
                        </Col>
                    </Row>
                    <Row>
                        <Tile>5423</Tile>
                        {
                            this.props.logsHistory.map((row, i) => {
                               return <div key={i}>{row.status.author} - {row.status.text}</div>
                            })
                        }
                    </Row>
                </Col>
            </div>
        )
    }

}

let mapStateToProps=(state)=>{
    return {
        logsHistory:state.websocket.logsHistory
    }
}

export const Body = connect(mapStateToProps)(BodyClass);