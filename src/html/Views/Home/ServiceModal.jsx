import React from 'react';
import {
    Modal,
    Table,
    Button,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    ButtonGroup
} from 'react-bootstrap';

export class ServiceFormModal extends React.Component {
    state = {}
    componentWillReceiveProps = (nextprops) => {

        this.setState({
            name: nextprops.item.name || '',
            Port: nextprops.item.Port || '',
            env: nextprops.item.env || '',
            command: nextprops.item.command || '',
            cd: nextprops.item.cd || '',
            id: nextprops.item.id || ''
        })
    };
    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }
    submitForm = (event) => {
        event.preventDefault();
        this.props.submit(this.state);

        //console.log(event)
    }


    render () {
        let ReadOnly=this.props.type === 'delete';
        let titleText="";
        let terminalCommand=true;
        let buttonText="";
        let desc="";

            switch(this.props.type){
                case 'delete':
                    titleText=this.props.item.name;
                    buttonText="DELETE";
                    desc=`Are you sure you want to delete ${this.props.item.name}?`;
                    break;
                case 'new':
                    titleText=this.state.name;
                    buttonText="ADD";
                    desc=`Add New Project`;
                    break;
                case 'edit':
                    titleText=this.props.item.name;
                    buttonText="UPDATE";
                    desc=`You are now editing ${this.props.item.name}`
                    break;
                case 'editGroup':
                    titleText="Setting";
                    buttonText="UPDATE ALL";
                    terminalCommand=false;
                    desc=`You are now editing ${this.props.item.length} services`
                    break;
            }
        const terminalStyleForm = !terminalCommand ? {display:"none"} : {height:"80px"}
        const terminalStyleLabel = !terminalCommand ? {display:"none"} : {display:"block"}
        return (
            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>{titleText}</Modal.Title>
                </Modal.Header>
                <Form action="" onSubmit={this.submitForm.bind(this)}>
                <Modal.Body>
                    <h4>{desc}</h4>

                        <FormGroup id="newForm">

                            <ControlLabel>Set Environment Var <span>*</span></ControlLabel>
                            <FormControl
                                id="env"
                                style={{"height":"80px"}}
                                componentClass="textarea"
                                value={this.state.env}
                                placeholder="NODE_ENV=LOCAL;NODE_ENC=SXXX2334X22Z"
                                onChange={this.handleChange}
                            />
                            <ControlLabel style={terminalStyleLabel} >Terminal Command:</ControlLabel>
                            <FormControl

                                style= {terminalStyleForm} 
                                id="command"
                                componentClass="textarea"
                                value={this.state.command}
                                placeholder="npm run start:local / node build/proxy.js"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                </Modal.Body>
                <Modal.Footer>
                    <ButtonGroup>
                        <Button bsStyle="danger" onClick={this.props.close} type="button">Cancel</Button>
                        <Button type="submit">{buttonText}</Button>
                    </ButtonGroup>
                </Modal.Footer>
                </Form>
            </Modal>
        );

    }
}