import React from 'react';
import {Glyphicon, ButtonGroup,Panel, Button} from 'react-bootstrap/lib';
import {ServiceFormModal} from "../../../../Common/ServiceModal/ServiceModal.jsx";
import {startService,killService, editService, deleteService} from './../../../../Application/action.js';
import {connect} from 'react-redux';

export class StartStopButtonsPanelClass extends React.Component {
    state = {
        modalItem: {},
        showConfigModal: false,
        submit: () => {},
        type: ""
    }
    setStatus(config) {
        this.runVisible = (config.pid === null || config.pid === undefined) ? 'block' : 'none';
        this.stopVisible = (config.pid === null || config.pid === undefined) ? 'none' : 'block';
    }
    constructor(props){
        super(props);
        this.config = this.props.config;
        this.setStatus(this.props.config);
    }
    componentWillReceiveProps(nextProps){
        this.config = nextProps.config;
        this.setStatus(nextProps.config);
    }
    run() {
        this.props.startService(this.config)

    }
    kill() {
        this.props.killService(this.config)
    }
    restart() {
        this.kill();
        this.run();
    }
    edit=(newItem)=>{
        this.props.editService(newItem);
        this.closeConfigModal()
    }
    openConfigModal = (item, type) => {

        switch (type) {
            case 'delete':
                this.setState({modalItem: item, submit: this.remove});
                break;
            case 'edit':
                this.setState({modalItem: item, submit: this.edit});
                break;
        }
        this.setState({showConfigModal: true, type: type})

    }
    closeConfigModal = () => {
        this.setState({modalItem: {}, showConfigModal: false})
    }
    remove=(item)=> {
            this.props.deleteService(item);
            this.closeConfigModal();
    }
    render() {

        return (
               <div>
                   <ButtonGroup>
                    <Button style={{'display':this.runVisible}} onClick={()=>{this.run()}} type="button" bsSize="xsmall" bsStyle="success"><Glyphicon glyph="play-circle"/>Run</Button>
                    <Button style={{'display':this.stopVisible}} onClick={()=>{this.kill()}} type="button" bsSize="xsmall" bsStyle="info"><Glyphicon glyph="stop"/>Stop</Button>
                    <Button onClick={()=>{this.restart()}} type="button" bsSize="xsmall" bsStyle="warning"><Glyphicon glyph="repeat"/>Restart</Button>
                    <Button onClick={()=>{this.openConfigModal(this.config,"edit")}} type="button" bsSize="xsmall" bsStyle="primary"><Glyphicon glyph="edit"/>Edit</Button>
                    <Button onClick={()=>{this.openConfigModal(this.config,"delete")}} type="button" bsSize="xsmall" bsStyle="danger"><Glyphicon glyph="remove-sign"/>Remove</Button>
                </ButtonGroup>
                <ServiceFormModal type={this.state.type}
                                  item={this.config}
                                  show={this.state.showConfigModal}
                                  close={this.closeConfigModal} submit={this.state.submit}
                />
               </div>
        )
    }

}
export const StartStopButtonsPanel = connect(null,{startService,killService, editService, deleteService})(StartStopButtonsPanelClass);