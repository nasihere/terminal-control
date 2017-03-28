import React from 'react';
import {ListGroupItem, Button, Glyphicon, Col} from 'react-bootstrap';
import './serviceItems.css';
export class ServiceItems extends React.Component {
    getAction = (item) => {
        let action;
        !item.connected ? action= (
            <div className="btn btn-sm" onClick={() => this.props.startService(item)}>
                <Glyphicon glyph="play"/>
            </div>): action=
        (<div className="btn btn-sm" onClick={() => this.props.killService(item)}>
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
                        <ListGroupItem key={idx.toString()} className="service-group">

                            {this.getAction(item)}

                            {item.name}
                            <div className="pull-right">

                           {/* <div className="btn" onClick={() => this.props.pingService(item)}>Ping</div>*/}
                            <div className="btn btn-sm" onClick={() => this.props.openConfigModal(item,'delete')}>
                                <Glyphicon glyph="remove-sign"/>
                            </div>
                            <div className="btn btn-sm" onClick={() => this.props.openConfigModal(item,'edit')}>
                                <Glyphicon glyph="edit"/>
                            </div>
                            </div>
                            {errorMsg}
                        </ListGroupItem>
                    )
                });
        return (
            <div>
                <ListGroupItem key={"btn#0"}>
                <Button type="button" onClick={() => this.props.openConfigModal(null, 'new')}>Add New
                    Service</Button>
                </ListGroupItem>
                {services}</div>)
    }
}