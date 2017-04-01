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
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={3} href="#"><Glyphicon glyph="search"/>
                            &nbsp; <input
                                id="formControlsText"
                                type="text"
                                label="Text"
                                placeholder=" Search"
                            />
                        </NavItem>
                        <NavItem eventKey={4} href="#"><Glyphicon glyph="folder-open"/> Add Project</NavItem>
                        <NavItem eventKey={5} href="#"></NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }

}

export const NavBar = NavBarClass;