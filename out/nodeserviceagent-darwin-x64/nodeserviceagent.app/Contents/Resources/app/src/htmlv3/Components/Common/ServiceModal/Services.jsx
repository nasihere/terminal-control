import React from 'react';
import {ListGroup, ListGroupItem, Button, Alert, Glyphicon} from 'react-bootstrap';

import {ServiceFormModal} from './ServiceFormModal.jsx';
import {ServiceItems} from './serviceItems.jsx';

export class Services extends React.Component {
    state = {
        modalItem: {},
        showConfigModal: false,
        submit: () => {},
        type: ""
    }
    startService = (item, idx) => {
        this.props.startService(item, idx)
    }
    pingService = (item, idx) => {
        this.props.pingService(item, idx)
    }
    killService = (item, idx) => {
        this.props.killService(item, idx)
    }
    addItem = (formItem) =>{
        this.props.submitNewService(formItem);
        this.closeConfigModal();
    }
    editItem = (newItem) => {
        this.props.editService(newItem);
        this.closeConfigModal()
    }
    deleteItem = () => {
        this.props.deleteService(this.state.modalItem);
        this.closeConfigModal()
    }
    openConfigModal = (item, type) => {

        switch (type) {
            case 'delete':
                this.setState({modalItem: item, submit: this.deleteItem});
                break;
            case 'edit':
                this.setState({modalItem: item, submit: this.editItem});
                break;
            default:
                this.setState({
                    modalItem: {}, submit: this.addItem
                })
        }
        this.setState({showConfigModal: true, type: type})

    }

    closeConfigModal = () => {
        this.setState({modalItem: {}, showConfigModal: false})
    }


    render () {

        let alert;
        if (this.props.services.error) {
            alert = <Alert bsStyle="danger">
                <h4>An error has occured with retrieving these Services</h4>
                <p>{this.props.services.error}</p>
            </Alert>;
        }
        return (
            <ListGroup>
                {alert}
                <ServiceItems services={this.props.services}

                              openConfigModal={this.openConfigModal}
                              startService={this.startService}
                              killService={this.killService}
                              pingService={this.pingService}/>

                <ServiceFormModal type={this.state.type}
                                  item={this.state.modalItem}
                                  show={this.state.showConfigModal}
                                  close={this.closeConfigModal} submit={this.state.submit}/>
            </ListGroup>
        )
    }
}