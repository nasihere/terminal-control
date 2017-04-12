import React from 'react';
import {Glyphicon, ButtonGroup, Panel, Button, ListGroup, ListGroupItem} from 'react-bootstrap/lib';

export const NpmCommands = (props) => {

    return (
        <ListGroupItem >

                <div className="pull-left">
                    <Button style={{'display': props.runVisible}} onClick={() => {
                        props.run(props.command, props.altCmd)
                    }} type="button" bsSize="xsmall" bsStyle="success"><Glyphicon glyph="play-circle"/>Run</Button>
                </div>
                <div >
                    <span title={props.command}>{props.cmdText}</span>
                </div>


        </ListGroupItem>
    )
}

