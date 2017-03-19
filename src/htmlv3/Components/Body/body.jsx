import React from 'react';
import {Col, Row, Checkbox, Panel, PanelGroup} from 'react-bootstrap/lib';
import {Tile} from '../Tile/tile.jsx';
import {LeftColumn} from '../LeftColumn'

export class Body extends React.Component {

    render() {
        return (
            <div>
                <Col xs={12} md={4}>
                    <LeftColumn/>
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
                    </Row>
                </Col>
            </div>
        )
    }
}