import React from 'react';
import {MenuItem, Glyphicon, ButtonGroup, Panel, Button, ListGroup, ListGroupItem} from 'react-bootstrap/lib';

export const NpmCommands = (props) => {

    return (
        <MenuItem
            onClick={() => {props.run(props.command, props.altCmd)}}>
            {props.cmdText}
        </MenuItem>
    )
}

