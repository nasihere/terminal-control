import React from 'react';
import {Col, Row, Checkbox} from 'react-bootstrap/lib';
import {Tile} from '../Tile/tile.jsx';

export const Body = (props) => (
    <div>
        <Col xs={12} md={4}>
            <Row>
                <h5>
                    Services
                </h5>
            </Row>
            <Row>
                <Tile>1234</Tile>
            </Row>
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