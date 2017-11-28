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
class TerminalLogsComponent extends React.Component{
    state = {}
    submitForm = (event) => {
        event.preventDefault();
        alert('submit')
        //this.props.submit(this.state);

        //console.log(event)
    }
    createLogRow(logs){
        if (!logs) return null;
        let prevTime = '';

        return logs.map((item,idx)=>{
            let printTime = false;
            if (prevTime !== item.time) {
                prevTime = item.time;
                printTime = true;
            }
            return <div className="show-grid" key={"logs_inline#" + (idx + 1) + "_" + idx}>
                {(printTime) ? <code>{item.time}</code> : ''}
                <div dangerouslySetInnerHTML={{__html:(item) ? convert.toHtml(item.text) : ''}}/>

            </div>

        });
    }
    render(){
        if (!this.props.modalData) return null;
        const  { modalData  } = this.props;
        return(

            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>{modalData.serviceName}</Modal.Title>
                </Modal.Header>
                <Form action="" onSubmit={this.submitForm.bind(this)}>
                    <Modal.Body>
                        <div className="terminal-body terminal-body-details ">
                            {this.createLogRow(modalData)}

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonGroup>
                            <Button bsStyle="danger" onClick={this.props.close} type="button">Close</Button>

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




export let TerminalLogs = connect(mapStateToProp)(TerminalLogsComponent);


