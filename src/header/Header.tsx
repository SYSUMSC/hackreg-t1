import React, { FC, useRef, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useParams } from 'react-router-dom';
import './Header.css';
import { connect } from 'react-redux';
import { StateType } from '../redux/Store';
import LoginFormModal from '../modal/LoginFormModal';
import RegisterFormModal from '../modal/RegisterFormModal';
import EmailAndLogoutButton from './EmailAndLogoutButton';
import PasswordResetRequestFormModal from '../modal/PasswordResetRequestFormModal';
import PasswordResetConfirmFormModal from '../modal/PasswordResetConfirmFormModal';

type StateProps = {
  loggedIn: boolean;
};

const HeaderContent: FC<StateProps> = ({ loggedIn }) => {
  const passwordResetRequestModalHandle = useRef<() => void>();
  const passwordResetConfirmModalHandle = useRef<() => void>();
  const { resetEmail, resetToken } = useParams();
  useEffect(() => {
    if (passwordResetConfirmModalHandle.current) {
      passwordResetConfirmModalHandle.current();
    }
  }, []);
  return (
    <Navbar collapseOnSelect={true} expand="sm" bg="primary" variant="dark">
      <Navbar.Brand>Hackathon 2020 (logo待定)</Navbar.Brand>
      <Navbar.Toggle aria-controls="header-nav" />
      <Navbar.Collapse id="header-nav">
        <Nav className="mr-auto">
          <Nav.Link
            as={NavLink}
            activeClassName="nav-link-active"
            to="/"
            exact={true}
          >
            首页
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            activeClassName="nav-link-active"
            to="/description"
          >
            介绍
          </Nav.Link>
          <Nav.Link as={NavLink} activeClassName="nav-link-active" to="/signup">
            报名
          </Nav.Link>
          {!loggedIn ? null : '' // TODO: submit work modal
          }
        </Nav>
        <Nav>
          {loggedIn ? (
            <Navbar.Text>
              <EmailAndLogoutButton />
            </Navbar.Text>
          ) : (
            <>
              {!resetEmail || !resetToken ? null : (
                <PasswordResetConfirmFormModal
                  passwordResetEmail={resetEmail}
                  passwordResetToken={resetToken}
                >
                  {showModal =>
                    (handle => {
                      passwordResetConfirmModalHandle.current = handle;
                      return <></>;
                    })(showModal)
                  }
                </PasswordResetConfirmFormModal>
              )}
              <PasswordResetRequestFormModal>
                {showModal =>
                  (handle => {
                    passwordResetRequestModalHandle.current = handle;
                    return <></>;
                  })(showModal)
                }
              </PasswordResetRequestFormModal>
              <LoginFormModal
                showPasswordResetRequestModal={passwordResetRequestModalHandle}
              >
                {showModal => <Nav.Link onClick={showModal}>登录</Nav.Link>}
              </LoginFormModal>
              <RegisterFormModal>
                {showModal => <Nav.Link onClick={showModal}>注册</Nav.Link>}
              </RegisterFormModal>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state: StateType): StateProps => ({
  loggedIn: !!state.localData.email
});

const Header = connect(mapStateToProps)(HeaderContent);

export default Header;
