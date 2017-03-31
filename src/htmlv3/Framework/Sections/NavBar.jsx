import React from 'react';
import {Glyphicon, Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';


export class NavBarClass extends React.Component {


    render() {

        return (
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Node-Services</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">Dashboard</NavItem>
                        <NavItem eventKey={2} href="#">Services</NavItem>
                        <NavDropdown eventKey={3} title="Tools" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Action</MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#"><Glyphicon glyph="search"/> Search</NavItem>
                        <NavItem eventKey={2} href="#"></NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }

}

export const NavBar = NavBarClass;