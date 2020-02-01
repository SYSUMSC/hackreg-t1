import React, { FunctionComponent, useContext, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import AccountStatus from '../account/AccountStatus';
import { LoginEmailContext } from '../App';
import withModal from '../shared/FormModal';
import SubmitWorkForm from './SubmitWorkForm';

const Header: FunctionComponent = () => {
    const { state } = useContext(LoginEmailContext);
    const [submitModalShown, toggleSubmitModal] = useState(false);
    return (<Navbar collapseOnSelect={true} expand="sm" bg="primary" variant="dark">
        <Navbar.Brand>
            {/* TODO: logo img here */}
            Hackathon 2020 (logo待定)
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
                        {
                            withModal('提交作品', submitModalShown, () => toggleSubmitModal(false), <SubmitWorkForm />)
                        }
                        <Nav.Link onClick={() => toggleSubmitModal(true)}>提交</Nav.Link>
                    </>)
                }
            </Nav>
            <Nav>
                <Navbar.Text>{/* TODO: should let accout status include the Navbar.Text */}
                    <AccountStatus />
                </Navbar.Text>
            </Nav>
        </Navbar.Collapse>
    </Navbar>);
};

export default Header;
