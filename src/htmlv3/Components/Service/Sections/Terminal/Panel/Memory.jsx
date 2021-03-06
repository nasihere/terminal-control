import React from 'react';
import {Panel} from 'react-bootstrap/lib';
import {MemoryTile} from './../../../../MemoryTile';
import {connect} from 'react-redux';

export class MemoryPanelClass extends React.Component {


    render() {
        let {memoryId,memory} = this.props;
        return (

                <MemoryTile
                    key={"memtile#"+memoryId}
                    title={'Memory'}
                    values={memory[memoryId]}
                    chartValues={memory[memoryId+"_chart"]}
                />

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