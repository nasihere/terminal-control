import React from 'react';
import {MenuItem, Glyphicon, ButtonGroup, Panel, Button, ListGroup, ListGroupItem} from 'react-bootstrap/lib';

export const NpmCommands = (props) => {

    return (
        <MenuItem
            onSelect={(k,e) => {props.run('npm run ' +props.command)}}>
            {props.cmdText}
        </MenuItem>
    )
}

