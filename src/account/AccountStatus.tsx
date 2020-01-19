import React, { Component } from 'react';
import Cookies from 'js-cookie';
import RegisterModal from './RegisterModal';
import './AccountStatus.css';
import LoginModal from './LoginModal';

type IState = {
    registerModalShown: boolean;
    loginModalShown: boolean;
};

class AccountStatus extends Component<{}, IState> {
    public state: IState = {
        registerModalShown: false,
        loginModalShown: false,
    };

    public render() {
        if (Cookies.get('Authorization')) {
            return (<span>
                {/* TODO: ID here */}登出
            </span>);
        } else {
            return (<span className="account-status-container">
                <RegisterModal
                    shown={this.state.registerModalShown}
                    onHide={() => this.setState({ registerModalShown: false })} />
                <LoginModal
                    shown={this.state.loginModalShown}
                    onHide={() => this.setState({ loginModalShown: false })} />
                <span className="clickable-text" onClick={() => this.setState({ loginModalShown: true })}>
                    登陆
                </span>
                <span> / </span>
                <span className="clickable-text" onClick={() => this.setState({ registerModalShown: true })}>
                    注册
                </span>
            </span>);
        }
    }
}

export default AccountStatus;
