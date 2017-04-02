import React from 'react';
import {Table,Well} from 'react-bootstrap/lib';

export class DisplayServiceInfo extends React.Component {

    render () {
        return (
            <Well>
                <Table responsive>
                    <tbody>
                    <tr>
                        <th>Port</th>
                        <th>Environment</th>
                        <th>Package.json</th>
                        <th>Memory Usage</th>
                        <th>Memory Free</th>
                        <th>Memory ????</th>
                    </tr>
                    <tr>
                        <td>{this.props.Port}</td>
                        <td>{this.props.env}</td>
                        <td>{this.props.cd}</td>
                        <td>{123456}</td>
                        <td>{123456}</td>
                        <td>{234234}</td>
                    </tr>
                    </tbody>
                </Table>
            </Well>
        );
    }
}
;

