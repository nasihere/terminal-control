import React from 'react';
import {Col, Row} from 'react-bootstrap/lib';
import Convert from 'ansi-to-html';
let convert=new Convert({newline:true});


export class DisplayLog extends React.Component {
    showAuthor() {
        if (this.props.showAuthor) {
            return <Col xs={12} md={4}>
                <h7>{this.props.status.author}</h7>
            </Col>
        }
    }
    showLog() {
       return <Col xs={12} md={8}>
                <div style={{margin:"10.5px 0", "color": this.props.status.color}} dangerouslySetInnerHTML={{__html:(this.props.status) ? convert.toHtml(this.props.status.text) : ''}}/>
            </Col>
    }
    createLog() {
        if (this.props.status === undefined) {
            return <em>Error</em>;
        }
        return <div>
                    {this.showAuthor()}
                    {this.showLog()}
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

