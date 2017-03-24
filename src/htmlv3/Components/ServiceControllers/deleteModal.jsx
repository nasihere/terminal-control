import React from 'react';
import {Modal, Table, Button} from 'react-bootstrap';

export class DeleteModal extends React.Component{

    render() {

        let rows = Object.keys(this.props.item).map((key,idx) => {

            return <tr key={idx}>
                <td>{key}:</td>
                <td>
                    <pre>{this.props.item[key]}</pre>
                </td>
            </tr>
        })

        return (
            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>{this.props.item.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className="warning">Are you sure you want to delete this item?</h4>
                    <Table>
                        <tbody>
                        {rows}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.close} type="button" >Cancel</Button>
                    <Button onClick={this.props.submit} >Delete</Button>
                </Modal.Footer>
            </Modal>
        );

    }
}