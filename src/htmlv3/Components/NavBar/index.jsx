import React from 'react';
import {Navbar, Nav, NavItem, FormGroup, FormControl, Button} from 'react-bootstrap/lib';
import {NavLink, withRouter} from 'react-router-dom';
export const NavBar = (props) => {
    function matchPath(path){return props.location.pathname.startsWith(path) ? 'active' : ''}
    return(
    <Navbar>
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
        <Navbar.Form pullLeft>
            <FormGroup>
                <FormControl type="text" placeholder="Search"/>
            </FormGroup>{' '}
            <Button type="button">Search</Button>
        </Navbar.Form>

    </Navbar>
)}

export const NavBarInstance= withRouter(NavBar)
