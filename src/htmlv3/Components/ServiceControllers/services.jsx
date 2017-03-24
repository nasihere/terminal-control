import React from 'react';
import {ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import {DeleteModal} from './deleteModal.jsx';
import {EditModal} from './editModal.jsx';


export class ServiceItems extends React.Component {
    state={
        modalItem:{},
        showDeleteModal:false,
        showEditModal:false,
    }
    startService = (item,idx) => {
        this.props.startService(item,idx)
    }
    pingService = (item, idx) => {
        this.props.pingService(item, idx)
    }
    killService = (item, idx) => {
        this.props.killService(item, idx)
    }
    openDeleteModal=(item)=>{
        this.closeEditModal();
        this.setState({modalItem:item,showDeleteModal:true})
    }
    closeDeleteModal=()=>{

        this.setState({modalItem:{},showDeleteModal:false})
    }
    deleteItem=()=>{
        this.props.deleteService(this.state.modalItem);
        this.closeDeleteModal()
    }
    openEditModal=(item)=>{
        this.closeDeleteModal();
        this.setState({modalItem:item,showEditModal:true})
    }
    closeEditModal=()=>{
        this.closeDeleteModal();
        this.setState({modalItem:{},showEditModal:false})
    }
    editItem = (newItem) =>{
        this.props.editService(newItem);
        this.closeEditModal()
    }
    render () {
        let {items} = this.props.services;
        let services=
            items.map((item, idx) => {
                return (
                    <ListGroupItem key={idx.toString()}>{item.name}
                        <Button type="button" onClick={()=>this.startService(item)}>Start</Button>
                        <Button type="button" onClick={()=>this.pingService(item)}>Ping</Button>
                        {/*<span>ping: {(item.portStatus) ? 'running...' : "not running"}</span>*/}
                        <Button type="button" onClick={()=>this.killService(item)}>Stop</Button>
                        <Button type="button" onClick={()=>this.openDeleteModal(item)}>Delete</Button>
                        <Button type="button" onClick={()=>this.openEditModal(item)}>Edit</Button>

                    </ListGroupItem>
                )
            });

        return (
            <ListGroup>
                {services}
                <DeleteModal item={this.state.modalItem} show={this.state.showDeleteModal} close={this.closeDeleteModal} submit={this.deleteItem}/>
                <EditModal item={this.state.modalItem} show={this.state.showEditModal} close={this.closeEditModal} submit={this.editItem}/>
            </ListGroup>
        )
    }
}
