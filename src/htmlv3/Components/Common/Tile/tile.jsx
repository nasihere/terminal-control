import React from 'react';
import {Well} from 'react-bootstrap/lib';

export class Tile extends React.Component {
    render () {

        return (
            <div>
                <Well>{this.props.children}</Well>
            </div>
        )
    }
}