import React from 'react';
import {ListGroup, ListGroupItem, Button, Alert, Glyphicon} from 'react-bootstrap';
import {DeleteModal} from './deleteModal.jsx';
import {EditModal} from './editModal.jsx';
import {ServiceItems} from './serviceItems.jsx';

export class Services extends React.Component {
    state = {
        modalItem: {},
        showDeleteModal: false,
        showEditModal: false,
        submit: () => {
        },
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
    openDeleteModal = (item) => {
        this.closeEditModal();
        this.setState({modalItem: item, showDeleteModal: true})
    }
    closeDeleteModal = () => {

        this.setState({modalItem: {}, showDeleteModal: false})
    }
    deleteItem = () => {
        this.props.deleteService(this.state.modalItem);
        this.closeEditModal()
    }
    openEditModal = (item, type) => {
        this.closeDeleteModal();
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
        this.setState({showEditModal: true, type: type})

    }
    addItem = (formItem) =>{
        this.props.submitNewService(formItem);
        this.closeEditModal();
    }
    closeEditModal = () => {
        this.closeDeleteModal();
        this.setState({modalItem: {}, showEditModal: false})
    }
    editItem = (newItem) => {
        this.props.editService(newItem);
        this.closeEditModal()
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
                              openDeleteModal={this.openDeleteModal}
                              openEditModal={this.openEditModal}
                              startService={this.startService}
                              killService={this.killService}
                              pingService={this.pingService}/>
                <DeleteModal item={this.state.modalItem} show={this.state.showDeleteModal}
                             close={this.closeDeleteModal}
                             submit={this.deleteItem}
                             type="delete"
                />
                <EditModal type={this.state.type}
                           item={this.state.modalItem}
                           show={this.state.showEditModal}
                           close={this.closeEditModal} submit={this.state.submit}/>
            </ListGroup>
        )
    }
}
