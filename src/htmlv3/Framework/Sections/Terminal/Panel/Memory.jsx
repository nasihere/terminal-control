import React from 'react';
import {Col, Row, Grid, Panel, PanelGroup} from 'react-bootstrap/lib';
import {Glyphicon, ButtonGroup,ListGroup, ListGroupItem, Tooltip, OverlayTrigger, Well, Jumbotron, Button, Tab, Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {Table} from 'react-bootstrap/lib';
import {MemoryTile} from './../../../../Components/MemoryTile';

export class MemoryPanelClass extends React.Component {


    render() {

        return (
            <Panel  key="memory-panel" collapsible defaultExpanded header="Memory" bsStyle="primary">
                {/*<MTiles {...this.props}/>*/}
            </Panel>
        )
    }

}


export let MTiles = (props) => {
    let {services,memory} = props;
    let items = services.filter((item)=>item.connected).map((item, idx)=>{
        console.log(memory)
        if(memory.hasOwnProperty(item.id)){
            return <MemoryTile key={"memtile#"+idx} title={item.name} values={props.memory[item.id]} chartValues={props.memory[item.id+"_chart"]}/>}
    })
    return (
        <div>
            {items}
        </div>
    )

}

export const MemoryPanel = MemoryPanelClass;