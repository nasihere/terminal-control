import React from 'react';
import {ListGroup, ListGroupItem, Button} from 'react-bootstrap';

export class ServiceItems extends React.Component {
    startService = (item,idx) => {
        this.props.startService(item,idx)
    }
    pingService = (item, idx) => {
        this.props.pingService(item, idx)
    }
    render () {
        let {items} = this.props.services;

        let services=
            items.map((item, idx) => {
                return (
                    <ListGroupItem key={idx.toString()}>{item.name}
                        <Button type="button" onClick={()=>this.startService(item)}>Start</Button>
                        <Button type="button" onClick={()=>this.pingService(item)}>Ping</Button>

                    </ListGroupItem>
                )
            });

        return (
            <ListGroup>
                {services}
            </ListGroup>
        )
    }
}
