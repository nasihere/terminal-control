import React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';


export class ServiceItems extends React.Component{
    render(){
        var items = this.props.services.map((item,idx)=>{
            return (<ListGroupItem key={idx.toString()}>{item.name}</ListGroupItem>)
        })
        return (
            <ListGroup>
                {items}
            </ListGroup>
        )
    }
}