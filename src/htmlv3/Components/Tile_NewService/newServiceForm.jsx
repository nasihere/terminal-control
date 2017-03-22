import React from 'react';
import {connect} from 'react-redux';
import {Tile} from '../Common/Tile';
import {FormGroup, Form, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';

class newServiceFormClass extends React.Component {
    render(){
        return (
            <Tile>
                <Form>
                    <FormGroup controlId="newForm">
                        <ControlLabel>Service Name</ControlLabel>
                        <FormControl
                        type="text"
                        value=""
                        placeholder=""/>
                        <HelpBlock className={"small"}>e.g: USER MICROSERVICE</HelpBlock>
                        <ControlLabel>PORT</ControlLabel>
                        <FormControl
                            type="text"
                            value=""
                            placeholder=""/>
                        <HelpBlock className={"small"}>e.g: 3080</HelpBlock>
                        <ControlLabel>Path</ControlLabel>
                        <FormControl
                            type="text"
                            value=""
                            placeholder=""/>
                        <HelpBlock className={"small"}>e.g: /user/project/package.json</HelpBlock>
                        <ControlLabel>Startup Variable</ControlLabel>
                        <FormControl
                            type="text"
                            value=""
                            placeholder=""/>
                        <HelpBlock className={"small"}>e.g: export NODE_ENV=LOCAL;</HelpBlock>
                        <ControlLabel>Package JSON</ControlLabel>
                        <FormControl
                            type="text"
                            value=""
                            placeholder=""/>
                        <HelpBlock className={"small"}>e.g 1: npm run start:local</HelpBlock>

                        <HelpBlock className={"small"}>e.g 2: node build/proxy.js</HelpBlock>
                    </FormGroup>
                </Form>
            </Tile>
        )
    }
}

let mapStateToProps = (state) => {
    return {val:""};
}

export const NewServiceForm = connect(mapStateToProps)(newServiceFormClass);