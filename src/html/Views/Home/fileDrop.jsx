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
var FileDragAndDrop = require('react-file-drag-and-drop');

class _FileDragDrop extends React.Component{
    handleDrop(dataTransfer) {
        var files = dataTransfer.files;
        // Do something with dropped files...
    }
    render() {
        return(
            <FileDragAndDrop onDrop={this.handleDrop}>
                {this.props.children}
            </FileDragAndDrop>

        )
    }

}

let mapStateToProp = (state) => {
    return{
        memory:state.memoryUsage
    }
}




export let FileDragDrop = connect(mapStateToProp)(_FileDragDrop );


