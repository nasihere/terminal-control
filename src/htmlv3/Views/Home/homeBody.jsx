import * as React from 'react';
import {Row, Col, Jumbotron} from 'react-bootstrap';
import {connect} from 'react-redux';
import {MemoryTile} from '../../Components/MemoryTile';


class _HomeBody extends React.Component{

    render(){
        let {services, memory} = this.props;
        return(
            <div>
                <Col sm={8}>
                    <Row>
                        <Jumbotron/>
                    </Row>
                </Col>
                <Col sm={4}>
                    <Row>
                        <MTiles {...this.props}/>
                    </Row>
                </Col>
            </div>
        )
    }
}


let mapStateToProp = (state) => {
    return{
        services:state.websocket.services.items,
        memory:state.memoryUsage
    }
}

export let HomeBody = connect(mapStateToProp)(_HomeBody);


export let MTiles = (props) => {console.log(props)
    let {services,memory} = props;
    let items = services.filter((item)=>item.connected).map((item, idx)=>{
        if(memory.hasOwnProperty(item.id)){
            return <MemoryTile key={"memtile#"+idx} title={item.name} values={props.memory[item.id]}/>}
    })
    return (
        <div>
            {items}
        </div>
    )

}