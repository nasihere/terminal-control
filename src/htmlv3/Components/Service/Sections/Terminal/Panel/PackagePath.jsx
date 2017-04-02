import React from 'react';
import {Panel, Tooltip, OverlayTrigger} from 'react-bootstrap/lib';




export class PackagePathPanelClass extends React.Component {


    render() {

        return (
            <Panel key="package-panel" header="Package Path" bsStyle="primary">
                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">{this.props.package}</Tooltip>}>
                    <code>{this.props.package}</code>
                </OverlayTrigger>

            </Panel>
        )
    }

}

export const PackagePathPanel = PackagePathPanelClass;