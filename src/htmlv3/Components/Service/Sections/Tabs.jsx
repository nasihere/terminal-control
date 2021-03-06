import React from 'react';
import {Col, Row, Alert} from 'react-bootstrap/lib';
import {Tab, NavItem, Nav} from 'react-bootstrap/lib';
import {Terminal} from './Terminal/Terminal.jsx';
import {connect} from 'react-redux';
import {StatusPanel} from './Terminal/Panel/Status.jsx';
import {Get_IsWorkingTree} from '../../../Actions/git_actions';

export class TabsClass extends React.Component {

    constructor (props) {
        super(props);
        this.createTabs = this.createTabs.bind(this);
        this.createTerminal = this.createTerminal.bind(this);

    }
    createTabs = () => {
        const serviceObj = this.props.services.items;
        return serviceObj.map((item, index) => {
            return <NavItem
                key={'NavItem' + index}
                eventKey={'Tabs' + index}
            >
                <StatusPanel config={item}  />
                {item.name}
               <span className="label label-default"></span>

            </NavItem>
        });
    };
    createTerminal = () => {
        if (this.props.services.items.length === 0) return;
        const serviceObj = this.props.services.items;
        let memoryItem = serviceObj.filter((item) => item.connected).map((item, idx) => {
        });

        return serviceObj.map((item, index) => {

            return <Tab.Pane
                key={'TabPanel' + index}
                eventKey={'Tabs' + index}>
                <Terminal
                    env={item.env}
                    package={item.cd}
                    config={item}
                    logs={this.props.logs[item.id]}
                    memoryId={item.id}
                    readMe={item.readMe}
                    Get_IsWorkingTree={this.props.Get_IsWorkingTree}
                    git={this.props.git}
                />
            </Tab.Pane>
        });
    };

    render () {
        let hidden = this.props.services.error ? "hidden" : "";
        if (this.props.services.error) {
            return (<Alert bsStyle="danger"><pre>{JSON.stringify(this.props.services.error,null,"\t")}</pre></Alert>)
        }
        else if (this.props.services.items.length === 0) {
            return (<Alert bsStyle="success"><h3>Welcome to Node-Service-Agent!</h3> <i>To add new project please click 'Add New Project' on right top corner</i></Alert>)
        }

        else {
            return (

                <Tab.Container id="tabs-with-dropdown" defaultActiveKey={'Tabs0'}>

                    <Row className="clearfix">
                        <Col sm={12} md={2}>
                            <Nav bsStyle="tabs" stacked>
                                {this.createTabs()}
                            </Nav>
                        </Col>
                        <Col sm={12} md={10}>
                            <Tab.Content animation>
                                {this.createTerminal()}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            )
        }
    }
}

let mapStateToProps = (state) => {
    return {
        services: state.websocket.services,
        logs:     state.websocket.logsHistory,
        git: state.git
    }
}
export const Tabs = connect(mapStateToProps, {Get_IsWorkingTree})(TabsClass);