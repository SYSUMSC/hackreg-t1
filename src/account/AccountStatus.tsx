import React, { FunctionComponent, useState } from 'react';
import { EmailContext } from '../App';
import './AccountStatus.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AccountStatus: FunctionComponent = () => {
    const { state } = React.useContext(EmailContext);
    const [regFormShown, toggleRegForm] = useState(false);
    const [loginFormShown, toggleLoginForm] = useState(false);
    if (state) {
        return (<>
            {state}，登出 {/* TODO: logout */}
        </>);
    } else {
        return (<>
            <RegisterForm
                shown={regFormShown}
                onHide={() => toggleRegForm(false)} />
            <LoginForm
                shown={loginFormShown}
                onHide={() => toggleLoginForm(false)} />
            <span className="clickable-text" onClick={() => toggleLoginForm(true)}>
                登陆
            </span>
            /
            <span className="clickable-text" onClick={() => toggleRegForm(true)}>
                注册
            </span>
        </>);
    }
};

export default AccountStatus;
