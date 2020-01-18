import React, { PureComponent } from 'react';
import Navbar from 'react-bootstrap/Navbar';

export interface IProps {
    email?: string;
    loggedIn: boolean;
}

class AccountInfo extends PureComponent<IProps> {
    public render() {
        return (<Navbar.Text>
            {!this.props.loggedIn ?
                '未登录' :
                `已登陆，${this.props.email!}`
            }
        </Navbar.Text>);
    }
}

export default AccountInfo;
