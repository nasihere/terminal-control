import React from 'react';
import {connect} from 'react-redux';
import {Tile} from '../Common/Tile';
import {FormGroup, Form, FormControl, ControlLabel, HelpBlock, Button, ButtonGroup} from 'react-bootstrap';
import {submitNewService} from '../Application/action.js'

class newServiceFormClass extends React.Component {
    state={
        name:"abc",
        Port:"",
        env:"",
        cmd:""
    }
    handleChange=(event)=>{

        this.setState({[event.target.id]:event.target.value})

    }
    submitForm=(event)=>{
        event.preventDefault();
        this.props.submitNewService(this.state);
        //console.log(event)
    }
    render(){
        return (
            <Tile>
                <Form action="" onSubmit={this.submitForm}>
                    <FormGroup id="newForm">
                        <ControlLabel>Service Name</ControlLabel>
                        <FormControl
                            id="name"
                        type="text"
                        value={this.state.name}
                        placeholder=""
                            onChange={this.handleChange}
                        />
                        <HelpBlock className={"small"}>e.g: USER MICROSERVICE</HelpBlock>
                        <ControlLabel>PORT</ControlLabel>
                        <FormControl
                            id="Port"
                            type="text"
                            value={this.state.Port}
                            placeholder=""
                            onChange={this.handleChange}
                        />
                        <HelpBlock className={"small"}>e.g: 3080</HelpBlock>
                        <ControlLabel>Startup Variable</ControlLabel>
                        <FormControl
                            id="env"
                            type="text"
                            value={this.state.env}
                            placeholder=""
                            onChange={this.handleChange}
                        />
                        <HelpBlock className={"small"}>e.g: export NODE_ENV=LOCAL;</HelpBlock>
                        <ControlLabel>Package JSON</ControlLabel>
                        <FormControl
                            id="cmd"
                            type="text"
                            value={this.state.cmd}
                            placeholder=""
                            onChange={this.handleChange}
                        />
                        <HelpBlock className={"small"}>e.g 1: npm run start:local</HelpBlock>
                        <HelpBlock className={"small"}>e.g 2: node build/proxy.js</HelpBlock>
                       <ButtonGroup>
                            <Button type="submit">Submit</Button>
                       </ButtonGroup>
                    </FormGroup>
                </Form>
            </Tile>
        )
    }
}

let mapStateToProps = (state) => {
    return {val:""};
}

export const NewServiceForm = connect(mapStateToProps,{submitNewService})(newServiceFormClass);