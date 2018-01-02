import React from 'react';
import {
    Modal,
    Button,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
    ButtonGroup
} from 'react-bootstrap';

export class AddGroupModal extends React.Component {
    state = {
        show: false,
        name: ""
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }
    submitAddGroup  () {
        this.props.submit(this.state.name);
    }

    render () {

        return (
            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>Service Group</Modal.Title>
                </Modal.Header>
                <Form action="" onSubmit={this.submitAddGroup.bind(this)}>
                <Modal.Body>

                        <FormGroup id="groupForm">

                            <ControlLabel>Group Name: <span>*</span></ControlLabel>
                            <FormControl
                                id="name"
                                value={this.state.name}
                                placeholder="Robinhood Services"
                                onChange={this.handleChange}
                            />


                        </FormGroup>

                </Modal.Body>
                <Modal.Footer>
                    <ButtonGroup>
                        <Button bsStyle="danger" onClick={this.props.close} type="button">Cancel</Button>
                        <Button type="submit">Create</Button>
                    </ButtonGroup>
                </Modal.Footer>
                </Form>
            </Modal>
        );

    }
}