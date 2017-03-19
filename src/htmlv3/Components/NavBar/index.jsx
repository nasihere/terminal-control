import React from 'react';
import {Navbar, Nav, NavItem, FormGroup, FormControl, Button} from 'react-bootstrap/lib'

export const NavBarInstance = () => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="#">Node Services</a>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <NavItem eventKey={1} href="#">Home</NavItem>
            <NavItem eventKey={2} href="#" active>Services</NavItem>
            <NavItem eventKey={3} href="#">Import</NavItem>

        </Nav>
        <Navbar.Form pullLeft>
            <FormGroup>
                <FormControl type="text" placeholder="Search"/>
            </FormGroup>{' '}
            <Button type="button">Search</Button>
        </Navbar.Form>
        <Nav pullRight>
            <NavItem>Start All</NavItem>
        </Nav>
    </Navbar>
)