import React, { FunctionComponent, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import AccountStatus from '../account/AccountStatus';
import { LoginEmailContext } from '../App';
import SubmitWorkForm from './SubmitWorkForm';

const Header: FunctionComponent = () => {
    const { state } = React.useContext(LoginEmailContext);
    const [submitFormShown, toggleSubmitForm] = useState(false);
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
                {
                    !state ? null : (<>
                        {/* TODO */}
                        <SubmitWorkForm shown={submitFormShown} onHide={() => toggleSubmitForm(false)} />
                        <Nav.Link onClick={() => toggleSubmitForm(true)}>提交</Nav.Link>
                    </>)
                }
            </Nav>
            <Nav>
                <Navbar.Text>
                    <AccountStatus />
                </Navbar.Text>
            </Nav>
        </Navbar.Collapse>
    </Navbar>);
};

export default Header;
