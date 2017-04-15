import * as React from 'react';
import {Row, Col, Jumbotron, Panel, ListGroup,ListGroupItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {MemoryTile} from '../../Components/MemoryTile';
import {Tabs,ReadMe} from './../../Components/Service';
import {Project} from './../../Components/Dashboard';


class _HomeBody extends React.Component{

    render(){
        let {services, memory} = this.props;
        return(
            <div>
                <Col sm={8}  lg={12}>
                    <Row>
                        <Jumbotron>
                            <h1>Welcome!</h1>
                            <p>Thank you for using the desktop webservice, <b>Node ServiceAgent</b></p>
                            <p>To get Started visit the services tab and click on service!</p>
                        </Jumbotron>
                    </Row>
                    <Row>
                        <Col xs={12} md={4} lg={4}>
                            <Panel header="Coming Soon">
                                <ListGroup>
                                    <ListGroupItem>
                                        Validation for Service Forms
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Enable use of package.json script commands
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Better Handling of the Start and Stop Services
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        DASHBOARD!
                                    </ListGroupItem>
                                </ListGroup>
                            </Panel>
                        </Col>

                        <Col xs={12} md={8} lg={8}>
                            <Project />

                        </Col>
                        <Col xs={12} md={4}  lg={4}>
                            <Panel header="Visit Github!">
                            <p>Our Content is currently stored on github however it is in a private repository. When we release the code it will be referenced here</p>
                            </Panel>
                        </Col>
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

        if(memory.hasOwnProperty(item.id)){
            return <MemoryTile key={"memtile#"+idx} title={item.name} values={props.memory[item.id]} chartValues={props.memory[item.id+"_chart"]}/>}
    })
    return (
        <div>
            {items}
        </div>
    )

}

