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
        return (
            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>{this.props.item.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>You are now editing {this.props.item.name}</h4>
                    <Form action="" onSubmit={this.submitForm}>
                        <FormGroup id="newForm">
                            <ControlLabel>Service Name</ControlLabel>
                            <FormControl
                                id="name"
                                type="text"
                                value={this.state.name}
                                placeholder=""
                                readOnly={ReadOnly}
                                onChange={this.handleChange}
                            />
                            <HelpBlock className={"small"}>e.g: USER MICROSERVICE</HelpBlock>
                            <ControlLabel>PORT</ControlLabel>
                            <FormControl
                                id="Port"
                                type="text"
                                value={this.state.Port}
                                placeholder=""
                                readOnly={ReadOnly}
                                onChange={this.handleChange}
                            />
                            <HelpBlock className={"small"}>e.g: 3080</HelpBlock>
                            <ControlLabel>Startup Variable</ControlLabel>
                            <FormControl
                                id="env"
                                type="text"
                                value={this.state.env}
                                placeholder=""
                                readOnly={ReadOnly}
                                onChange={this.handleChange}
                            />
                            <HelpBlock className={"small"}>e.g: export NODE_ENV=LOCAL;</HelpBlock>
                            <ControlLabel>Package JSON</ControlLabel>
                            <FormControl
                                id="command"
                                type="text"
                                value={this.state.command}
                                placeholder=""
                                readOnly={ReadOnly}
                                onChange={this.handleChange}
                            />
                            <HelpBlock className={"small"}>e.g 1: npm run start:local</HelpBlock>
                            <HelpBlock className={"small"}>e.g 2: node build/proxy.js</HelpBlock>
                            <ControlLabel>Location</ControlLabel>
                            <FormControl
                                id="cd"
                                type="text"
                                value={this.state.cd}
                                placeholder=""
                                readOnly={ReadOnly}
                                onChange={this.handleChange}
                            />
                            <HelpBlock className={"small"}>root directory of your package</HelpBlock>
                            <ButtonGroup>
                                <Button onClick={this.props.close} type="button">Cancel</Button>
                                <Button type="submit">Submit</Button>
                            </ButtonGroup>
                        </FormGroup>
                    </Form>
                </Modal.Body>

            </Modal>
        );

    }
}