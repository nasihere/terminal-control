import React from 'react';
import {Glyphicon, Navbar, Nav, NavItem, FormGroup, FormControl, Button} from 'react-bootstrap/lib';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import {ServiceFormModal} from "../Common/ServiceModal/ServiceModal.jsx";
import {submitNewService} from '../Application';
export class NavBar extends React.Component {
    state = {
        modalItem: {},
        showConfigModal: false,
        submit: submitNewService,
        type: ""
    }
    closeConfigModal = () => {
        this.setState({modalItem: {}, showConfigModal: false})
    }
    openConfigModal = (item,type) => {
        this.setState({
            modalItem: {}, submit: this.addItem
        })
        this.setState({showConfigModal: true, type: type})
    }
    matchPath (path) {
        return this.props.location.pathname.startsWith(path) ? 'active' : ''
    }
    addItem = (formItem) =>{
        this.props.submitNewService(formItem);
        this.closeConfigModal();
    }
    render () {
        return (
            <Navbar style={{"borderRadius": "0px"}} fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Node Services</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <ul className="nav navbar-nav">
                    <li className={this.matchPath("/Home")}>
                        <NavLink to="/Home" activeClassName={"active"}>Home</NavLink>
                    </li>
                    <li className={this.matchPath("/Services")}>
                        <NavLink to="/Services"
                                 activeClassName={"active"}>Services
                        </NavLink>
                    </li>

                </ul>
                <Navbar.Form pullRight>
                    <FormGroup>
                        <FormControl type="text" placeholder="Search" />
                    </FormGroup>
                    {' '}

                </Navbar.Form>
                <Nav pullRight>


                    <NavItem title="Add Service To Icon" onClick={() => this.openConfigModal(null, 'new')}><Glyphicon glyph="folder-open"/> </NavItem>
                </Nav>
                <ServiceFormModal type={this.state.type}
                                  item={this.state.modalItem}
                                  show={this.state.showConfigModal}
                                  close={this.closeConfigModal} submit={this.state.submit}/>
            </Navbar>
        )
    }
}

let mapStateToProps=(state)=>{
   return {
        services:state.websocket.services,
        portStatus: state.websocket.portStatus
    }
}
export const NavBarInstance = connect(mapStateToProps,{submitNewService})(withRouter(NavBar));

