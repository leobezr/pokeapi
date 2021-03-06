import React from 'react'
import logo from '../Assets/img/logo.png'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class Header extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand><a href="https://leobezr.com.br/" target="_blank" rel="nofollow"><img src={logo} className="logo" /></a></NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="http://leobezr.com.br" target="_blank" rel="nofollow">Portfolio</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://github.com/leobezr" target="_blank" rel="nofollow">GitHub</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default Header;