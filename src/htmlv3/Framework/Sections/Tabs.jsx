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
         const serviceObj = this.props.services.items;
         return serviceObj.map((item, index) => {
             return <NavItem
                        key={'NavItem'+index}
                        eventKey={'Tabs'+index}
                        >
                        {item.name}
                        <span className="label label-default">(20)</span>
                    </NavItem>
         });
    };
    createTerminal = () => {
        if (this.props.services.items.length === 0) return;
        const serviceObj = this.props.services.items;
        return serviceObj.map((item, index) => {

            return  <Tab.Pane
                        key={'TabPanel'+index}
                        eventKey={'Tabs'+index}>
                        <Terminal
                            env={item.env}
                            package={item.cd}
                            config={item}
                            logs={item.logsHistory}
                        />
                    </Tab.Pane>
        });
    };
    render() {

        return (
            <Tab.Container id="tabs-with-dropdown" defaultActiveKey={'Tabs0'}>
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
        services: state.websocket.services,
        // memory: state.memoryUsage
    }
}
export const Tabs = connect(mapStateToProps)(TabsClass);