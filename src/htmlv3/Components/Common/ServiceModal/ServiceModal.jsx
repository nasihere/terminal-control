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
            }

        return (
            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>{titleText}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{desc}</h4>
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
                            <HelpBlock className={"small"}>e.g: User App</HelpBlock>
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
                            <ControlLabel>Startup Variables <span>*</span></ControlLabel>
                            <FormControl
                                id="env"
                                type="text"
                                value={this.state.env}
                                placeholder=""
                                readOnly={ReadOnly}
                                onChange={this.handleChange}
                            />
                            <HelpBlock className={"small"}>e.g: NODE_ENV=LOCAL;NODE_ENC=SXXX2334X22Z</HelpBlock>
                            <ControlLabel>Command to Run</ControlLabel>
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
                            <ControlLabel>Project Directory</ControlLabel>
                            <FormControl
                                id="cd"
                                type="text"
                                value={this.state.cd}
                                placeholder=""
                                readOnly={ReadOnly}
                                onChange={this.handleChange}
                            />
                            <HelpBlock className={"small"}>Root directory of your package (absolute)</HelpBlock>
                            <HelpBlock className={"small"}>e.g: /user/john/jokerapp</HelpBlock>
                            <ButtonGroup>
                                <Button onClick={this.props.close} type="button">Cancel</Button>
                                <Button type="submit">{buttonText}</Button>
                            </ButtonGroup>
                        </FormGroup>
                    </Form>
                </Modal.Body>

            </Modal>
        );

    }
}