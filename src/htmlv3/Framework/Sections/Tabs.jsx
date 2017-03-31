import React from 'react';
import {Col, Row} from 'react-bootstrap/lib';
import {Glyphicon, Tab, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {Terminal} from './Terminal/Terminal.jsx';
import {connect} from 'react-redux';

export class TabsClass extends React.Component {

    constructor(props) {
        super(props);
        this.createTabs     = this.createTabs.bind(this);
        this.createTerminal = this.createTerminal.bind(this);
    }
    createTabs = () => {
         return this.props.tabs.map((item, index) => {
             return <NavItem
                        key={'NavItem'+item.id}
                        eventKey={'Tabs'+item.id}
                        >
                        {item.name}
                        <span className="label label-default">(20)</span>
                    </NavItem>
         });
    };
    createTerminal = () => {
        if (this.props.tabs.length === 0) return;
        return this.props.tabs.map((item, index) => {
            let logsHistory = [];
            if (this.props.logs) {
                if (this.props.logs.status) {
                    logsHistory = this.props.logs.status.filter((x)=> {return (x.author === item.name)});
                }
            }

            return  <Tab.Pane  key={'TabsPane'+item.id} eventKey={'Tabs'+item.id}>
                <Terminal
                    env={item.env}
                    package={item.cd}
                    config={item}
                    logs={logsHistory}
                />
            </Tab.Pane>
        });
    };
    render() {

        return (
            <Tab.Container id="tabs-with-dropdown" defaultActiveKey={'Tabs5bql8qz99y80o0g8g44co'}>
                <Row className="clearfix">
                    <Col sm={12}>
                        <Nav bsStyle="tabs">
                            {this.createTabs()}
                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <Tab.Content animation>
                            {this.createTerminal()}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        )
    }

}

let mapStateToProps=(state)=> {
    return {
        tabs: state.websocket.services.items,
        logs: state.websocket.logsHistory[0]
    }
}
export const Tabs = connect(mapStateToProps)(TabsClass);