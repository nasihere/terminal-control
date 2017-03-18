import React from 'react';
import {PanelGroup, Panel, Row} from 'react-bootstrap';

export class LeftColumn extends React.Component {
    state = {
        activeKey:'1'
    }

    handleSelect = (activeKey) => {
        this.setState({activeKey});
    };
    render() {
        return (
            <Row>
                <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)} accordion>
                    <Panel header="Services" eventKey="1">Panel 1 content</Panel>
                    <Panel header="Add New Request" eventKey="2">Panel 2 content</Panel>
                </PanelGroup>
            </Row>
        )
    }
}