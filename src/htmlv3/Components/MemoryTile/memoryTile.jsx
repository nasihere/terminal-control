import * as React from 'react';
import {Panel, Col} from 'react-bootstrap'

export const MemoryTile = (props) => {
    let header = (<h4>{props.title}</h4>)
    let item = props.values[props.values.length - 1]
    return (
        <Panel header={header}>
            <Col xs={4}>
                <div>
                    <span>
                        {parseInt(item[0] / 1000)}KB </span>
                    <span>TotalHeap</span>
                </div>
            </Col>
            <Col xs={4}>
                <div>
                    <span>
                        {parseInt(item[1] / 1000)}KB </span>
                    <span>UsedHeap</span>
                </div>
            </Col>
            <Col xs={4}>
                <div>
                    <span>
                        {parseInt(item[2] / 1000)}KB</span>
                    <span>RSS</span>
                </div>
            </Col>
        </Panel>
    )
}