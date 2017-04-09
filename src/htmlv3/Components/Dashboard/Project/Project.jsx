import React from 'react';
import {Col, Row, Alert} from 'react-bootstrap/lib';
import {ListGroupItem, ListGroup} from 'react-bootstrap/lib';
import {connect} from 'react-redux';
import {StartStopButtonsPanel, StatusPanel} from './../../Service';

export class ProjectClass extends React.Component {

    constructor (props) {
        super(props);
        this.createProject = this.createProject.bind(this);
    }

    createProject = () => {
        const serviceObj = this.props.services.items;
        return serviceObj.map((item, index) => {
            return <ListGroupItem
                key={'NavItem' + index}
                eventKey={'Project' + index}
            >
                <div>
                    {item.name}
                    <StartStopButtonsPanel config={item} />
                    <hr />
                </div>
            </ListGroupItem>


        });
    };


    render () {
        let hidden = this.props.services.error ? "hidden" : "";
        if (this.props.services.error) {
            return (<Alert bsStyle="danger"><pre>{JSON.stringify(this.props.services.error,null,"\t")}</pre></Alert>)
        }
        else {
            return (

                    <ListGroup>
                        {this.createProject()}
                    </ListGroup>



            )
        }
    }
}

let mapStateToProps = (state) => {
    return {
        services: state.websocket.services
    }
}
export const Project = connect(mapStateToProps)(ProjectClass);