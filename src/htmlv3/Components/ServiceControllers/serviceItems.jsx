import React from 'react';
import {ListGroupItem, Button, Glyphicon} from 'react-bootstrap';

export class ServiceItems extends React.Component {
    getAction = (item) => {
        let action;
        !item.connected ? action= (
            <div className="btn" onClick={() => this.props.startService(item)}>
                <Glyphicon glyph="play"/>
            </div>): action=
        (<div className="btn" onClick={() => this.props.killService(item)}>
            <Glyphicon glyph="stop"/>
        </div>)
        return action;

    }
    render () {
        let services =
                this.props.services.items.map((item, idx) => {

                    let errorMsg;
                    if (item.error) {
                        errorMsg = <p className="small txt--error">{item.error}</p>
                    }
                    return (
                        <ListGroupItem key={idx.toString()}>
                            {this.getAction(item)}
                            {item.name}

                           {/* <div className="btn" onClick={() => this.props.pingService(item)}>Ping</div>*/}
                            <div className="btn pull-right" onClick={() => this.props.openDeleteModal(item)}>
                                <Glyphicon glyph="remove-sign"/>
                            </div>
                            <div className="btn pull-right" onClick={() => this.props.openEditModal(item)}>
                                <Glyphicon glyph="edit"/>
                            </div>
                            {errorMsg}
                        </ListGroupItem>
                    )
                });
        return (
            <div>{services}</div>)
    }
}