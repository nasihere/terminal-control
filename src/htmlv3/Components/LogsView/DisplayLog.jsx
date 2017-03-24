import React from 'react';
import {Col, Row} from 'react-bootstrap/lib';

export class DisplayLog extends React.Component {

    createLog() {
        if (this.props.status === undefined) {
            return <em>Error</em>;
        }
        return  <Row>
                    <Col xs={4}>
                        <h5>{(this.props.status) ? this.props.status.author : 'You'}</h5>
                    </Col>
                    <Col xs={4}>
                        <span>{(this.props.status) ? this.props.status.text : ''}</span>
                    </Col>
                </Row>

    }
    render() {
        return (
            <div>
                {this.createLog()}
            </div>
        );
    }
};

