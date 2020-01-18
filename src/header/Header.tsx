import React, { PureComponent } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import AccountInfo from './AccountInfo';

class Header extends PureComponent {
    public render() {
        return (<Navbar collapseOnSelect={true} expand="sm" bg="primary" variant="dark">
            <Navbar.Brand>
                {/* TODO: logo img here */}
                LOGO HERE
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="header-nav" />
            <Navbar.Collapse id="header-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">首页</Nav.Link>
                    <Nav.Link as={Link} to="/description">介绍</Nav.Link>
                    <Nav.Link as={Link} to="/signup">报名</Nav.Link>
                </Nav>
                <Nav>
                    <AccountInfo loggedIn={false} />
                </Nav>
            </Navbar.Collapse>
        </Navbar>);
    }
}

export default Header;