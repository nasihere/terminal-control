import React from 'react';
import {Col, Row, Grid, Panel, PanelGroup} from 'react-bootstrap/lib';
import {Glyphicon, ButtonGroup,ListGroup, ListGroupItem, Tooltip, OverlayTrigger, Well, Jumbotron, Button, Tab, Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {Table} from 'react-bootstrap/lib';



export class EnviornmentPanelClass extends React.Component {

    constructor(props){
        super(props);
        this.createEnv = this.createEnv.bind(this);
    }
    createEnv(){
        const env = this.props.env.replace(/export/g,'').replace(/SET/g,'').split(';');
        return env.map((item, index) => {
            if (item)
                return <span key={'env'+index}><code>{item}</code><br /></span>
        })
    }
    render() {

        return (
            <Panel key="enviornment-panel" header="Environments" bsStyle="primary">
                {this.createEnv()}
            </Panel>
        )
    }

}

export const EnviornmentPanel = EnviornmentPanelClass;