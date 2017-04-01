import React from 'react';
import {Col, Row, Grid, Panel, PanelGroup} from 'react-bootstrap/lib';
import {Glyphicon, ButtonGroup,ListGroup, ListGroupItem, Tooltip, OverlayTrigger, Well, Jumbotron, Button, Tab, Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {Table} from 'react-bootstrap/lib';
import {MemoryTile} from './../../../../Components/MemoryTile';

import {connect} from 'react-redux';
export class MemoryPanelClass extends React.Component {


    render() {
        // const memory = this.props.memory;
        // const memoryId = this.props.memoryId;
        // const MTile = (memory.props && memory.props.values !== undefined) ? <MemoryTile
        //     key={"memtile#"+memoryId}
        //     title={'Memory'}
        //     values={memory[memoryId]}
        //     chartValues={memory[memoryId+"_chart"]}
        // /> : <span>.....</span>;
        return (
            <Panel  key="memory-panel" collapsible defaultExpanded header="Memory" bsStyle="primary">
                <MTiles {...this.props}/>
            </Panel>
        )
    }

}

export let MTiles = (props) => {
    let {memoryId,memory} = props;
    return (
        <MemoryTile
            key={"memtile#"+memoryId}
            title={'Memory'}
            values={memory[memoryId]}
            chartValues={memory[memoryId+"_chart"]}
        />
    )

};

let mapStateToProps=(state)=>{
    return {
        memory: state.memoryUsage
    }
}

export const MemoryPanel = connect(mapStateToProps)(MemoryPanelClass);