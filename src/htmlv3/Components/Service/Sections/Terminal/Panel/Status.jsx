import React from 'react';
import {Panel, Alert} from 'react-bootstrap/lib';


export class StatusPanelClass extends React.Component {

    constructor(props){
        super(props);
        this.config = this.props.config;
        this.setStatus(this.config);
    }
    setStatus(config) {
        this.runVisible = (config.pid === null || config.pid === undefined) ? 'block' : 'none';
        this.stopVisible = (config.pid === null || config.pid === undefined) ? 'none' : 'block';
    }
    componentWillReceiveProps(nextProps){
        this.config = nextProps.config;
        this.setStatus(nextProps.config);

    }
    render() {
        if (this.runVisible === 'none') {
            return (<Alert bsStyle="success" className="alert-status">&nbsp;</Alert>)
        }
        else {
            return (<Alert bsStyle="danger" className="alert-status">&nbsp;</Alert>)
        }
    }

}

export const StatusPanel = StatusPanelClass;