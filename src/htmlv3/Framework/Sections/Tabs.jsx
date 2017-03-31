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
    createTabs = (tabs) => {
         return tabs.map((item, index) => {
             return <NavItem
                        key={'NavItem'+item.id}
                        eventKey={'Tabs'+item.id}
                        >
                        {item.name}
                        <span className="label label-default">(20)</span>
                    </NavItem>
         });
    };
    createTerminal = (tabs) => {
        return tabs.map((item, index) => {
            return  <Tab.Pane  key={'TabsPane'+item.id} eventKey={'Tabs'+item.id}>
                <Terminal
                    env={item.env}
                    package={item.cd}
                    config={item}
                />
            </Tab.Pane>
        });
    };
    render() {

        return (
            <Tab.Container id="tabs-with-dropdown" defaultActiveKey={'Tabs6pa6k0vivmskgoockgg84'}>
                <Row className="clearfix">
                    <Col sm={12}>
                        <Nav bsStyle="tabs">
                            {this.createTabs(this.props.tabs)}
                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <Tab.Content animation>
                            {this.createTerminal(this.props.tabs)}
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
        logs: state.websocket.logsHistory
    }
}
export const Tabs = connect(mapStateToProps)(TabsClass);