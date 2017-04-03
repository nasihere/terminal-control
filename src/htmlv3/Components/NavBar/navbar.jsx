import React from 'react';
import {Glyphicon, Navbar, Nav, NavItem, FormGroup, FormControl, Button} from 'react-bootstrap/lib';
import {NavLink, withRouter} from 'react-router-dom';
export const NavBar = (props) => {
    function matchPath(path){return props.location.pathname.startsWith(path) ? 'active' : ''}
    return(
        <Navbar style={{"borderRadius":"0px"}} >
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">Node Services</a>
                </Navbar.Brand>
            </Navbar.Header>
            <ul className="nav navbar-nav">
                <li className={matchPath("/Home")}><NavLink to="/Home" activeClassName={"active"} >Home</NavLink></li>
                <li className={matchPath("/Services")}><NavLink  to="/Services" activeClassName={"active"}>Services</NavLink></li>
                <li className={matchPath("/Import")}><NavLink  to="/Import" activeClassName={"active"} >Import</NavLink></li>
            </ul>
            <Navbar.Form pullRight>
                <FormGroup>
                    <FormControl type="text" placeholder="Search" style={{"height":"31px"}}/>
                </FormGroup>{' '}
                <NavItem eventKey={4} href="#"><Glyphicon glyph="folder-open"/> Add Project</NavItem>
            </Navbar.Form>

        </Navbar>
    )}

export const NavBarInstance= withRouter(NavBar)
