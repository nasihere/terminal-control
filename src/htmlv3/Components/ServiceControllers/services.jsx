import React from 'react';
import {ListGroup, ListGroupItem, Button, Alert,Glyphicon} from 'react-bootstrap';
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

                let errorMsg;
                if(item.error){
                    errorMsg= <span className="small txt--error">{item.error}</span>
                }
                return (
                    <ListGroupItem key={idx.toString()} >{item.name}
                        <Button type="button" onClick={()=>this.startService(item)}><Glyphicon glyph="play"/></Button>
                        <Button type="button" onClick={()=>this.pingService(item)}>Ping</Button>
                        {/*<span>ping: {(item.portStatus) ? 'running...' : "not running"}</span>*/}
                        <Button type="button" onClick={()=>this.killService(item)}><Glyphicon glyph="stop"/></Button>
                        <Button type="button" onClick={()=>this.openDeleteModal(item)}><Glyphicon glyph="remove-sign"/></Button>
                        <Button type="button" onClick={()=>this.openEditModal(item)}><Glyphicon glyph="edit"/></Button>
                        {errorMsg}
                    </ListGroupItem>
                )
            });
        let alert;
        if(this.props.services.error) {
            alert = <Alert bsStyle="danger">
                <h4>An error has occured with retrieving these Services</h4>
                <p>{this.props.services.error}</p>
            </Alert>;
        }
        return (
            <ListGroup>
                {alert}
                {services}
                <DeleteModal item={this.state.modalItem} show={this.state.showDeleteModal} close={this.closeDeleteModal} submit={this.deleteItem}/>
                <EditModal item={this.state.modalItem} show={this.state.showEditModal} close={this.closeEditModal} submit={this.editItem}/>
            </ListGroup>
        )
    }
}
