import React from 'react';
import {Col, Row, Grid, Panel, PanelGroup} from 'react-bootstrap/lib';
import {Glyphicon, ButtonGroup,ListGroup, ListGroupItem, Tooltip, OverlayTrigger, Well, Jumbotron, Button, Tab, Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {Table} from 'react-bootstrap/lib';
import {connect} from 'react-redux';


export class ReduxLogClass extends React.Component {

    printLog()
    {
        if (this.props.logsHistory.items.length === 0 ) return;
        return this.props.logsHistory.items.map((tabs)=>{
            return <pre>
                    <h7>{JSON.stringify(tabs)}</h7><br />
                    {tabs.logsHistory.map((log)=>{
                            return <code>{log.pid + log.text}</code>
                    })}
                </pre>
        });
    }
    render() {
        return (
            <div>
                {this.printLog()}
            </div>
        )
    }

}

export const ReduxLog = ReduxLogClass;