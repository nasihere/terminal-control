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
import {connect} from 'react-redux';

import Convert from 'ansi-to-html';
let convert=new Convert({newline:true});
class _ImportProjects extends React.Component{
    state = {
        modalData: undefined
    }
    constructor(){
        super();

    }
    submitForm = (event) => {
        event.preventDefault();
        alert('submit')
        //this.props.submit(this.state);

        //console.log(event)
    }
    clearStateModal() {
        this.setState({
            modalData: undefined
        })
        this.props.close.bind(this)();

    }
    removeProject(idx) {
        this.setState({
            modalData: this.state.modalData.filter((_, i) => i !== idx)
        })
        if (this.state.modalData.length === 1) {
            this.clearStateModal();
        }
    }
    createProjectRow(item) {

            return (
                        <table>
                            <tr>
                                <td>Name</td>
                                <td>Value</td>
                            </tr>
                            <tr>
                                <td><input type="text" /></td>
                                <td><input type="text" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" /></td>
                                <td><input type="text" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" /></td>
                                <td><input type="text" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" /></td>
                                <td><input type="text" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" /></td>
                                <td><input type="text" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" /></td>
                                <td><input type="text" /></td>
                            </tr>
                        </table>
            )

    }
    componentDidMount() {

    }
    render(){
        if (!this.props.modalData || !this.props.show) return null;

        const  { modalData  } = this.state;
        if (modalData === undefined ) {
            this.setState({
                modalData: this.props.modalData
            })
        }
        return(

            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>Projects</Modal.Title>
                </Modal.Header>
                <Form action="" onSubmit={this.submitForm.bind(this)}>
                    <Modal.Body>
                        <div>
                            {

                                modalData.map((item, idx) => {
                                    return (<Table>
                                            <tr>
                                                <th>
                                                    NAME
                                                </th>
                                                <th>
                                                    ENV
                                                </th>
                                                <th>
                                                    SOZE
                                                </th>
                                            </tr>
                                            <tr>
                                            <td>{item.name}</td>
                                                <td>
                                                    <span>NODE_ENV=DIT</span>
                                                    <Button bsSizes="xsmall"  bsStyle="warning" onClick={this.removeProject.bind(this, idx)} >...</Button>
                                                </td>
                                                {/*<div>{this.createProjectRow(item)}</div>*/}
                                                <td>
                                                    <Button bsSizes="xsmall"  bsStyle="warning" onClick={this.removeProject.bind(this, idx)} >X</Button>
                                                </td>
                                            </tr>
                                    </Table>)
                                    })
                            }



                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonGroup>
                            <Button bsStyle="danger" onClick={this.clearStateModal.bind(this)} type="button">Close</Button>

                        </ButtonGroup>
                    </Modal.Footer>
                </Form>
            </Modal>

        )
    }
}

let mapStateToProp = (state) => {
    return{
        services:state.websocket.services.items,
        logs:     state.websocket.logsHistory,
        memory:state.memoryUsage
    }
}




export let ImportProject = connect(mapStateToProp)(_ImportProjects);


