import React from 'react';
import {Table} from 'react-bootstrap/lib';

export class DisplayServiceInfo extends React.Component {

    render () {
        return (
            <div>
                <Table responsive>
                    <tbody>
                    <tr>
                        <th>Port</th>
                        <th>Environment</th>
                        <th>Package.json</th>
                    </tr>
                    <tr>
                        <td>{this.props.Port}</td>
                        <td>{this.props.env}</td>
                        <td>{this.props.cd}</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}
;

