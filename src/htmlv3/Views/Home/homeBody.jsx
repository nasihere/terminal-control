import * as React from 'react';
import {Row, Col, Jumbotron, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';
import {MemoryTile} from '../../Components/MemoryTile';


class _HomeBody extends React.Component{

    render(){
        let {services, memory} = this.props;
        return(
            <div>
                <Col sm={8}>
                    <Row>
                        <Jumbotron>
                            <h1>Welcome!</h1>
                            <p>Thank you for using the desktop webservice, <b>Node ServiceAgent</b></p>
                            <p>To get Started visit the services tab and click on service!</p>
                        </Jumbotron>
                    </Row>
                    <Row>
                        <Col xs={12} md={4}>
                            <Panel header="Coming Soon">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec rutrum enim. Integer egestas nibh eu tristique tempus. Quisque dapibus quis tortor eget mattis. Integer hendrerit eu augue vitae eleifend. Cras gravida felis vel diam sollicitudin malesuada. In hac habitasse platea dictumst. In dictum enim ultricies suscipit pretium. Curabitur erat nibh, commodo sed auctor vitae, accumsan ut sapien. In et facilisis augue. Nullam aliquet gravida imperdiet.
                            </Panel>
                        </Col>
                        <Col xs={12} md={4}>
                            <Panel header="Visit Github!"></Panel>
                        </Col>
                        <Col xs={12} md={4}>
                            <Panel header="Documentation"></Panel>
                        </Col>
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