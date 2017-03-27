import React from 'react';
import {Col, Row} from 'react-bootstrap/lib';
import Convert from 'ansi-to-html';
let convert=new Convert({newline:true});


export class DisplayLog extends React.Component {

    createLog() {
        if (this.props.status === undefined) {
            return <em>Error</em>;
        }
        return <div>
            <Col xs={12} md={4}>
                        <h5>{(this.props.status) ? this.props.status.author : 'You'}</h5>
                    </Col>
                    <Col xs={12} md={8}>
                        <div style={{margin:"10.5px 0"}} dangerouslySetInnerHTML={{__html:(this.props.status) ? convert.toHtml(this.props.status.text) : ''}}/>
                    </Col>
        </div>


    }
    render() {

        return (
            <Row>

                {this.createLog()}
            </Row>
        );
    }
};

