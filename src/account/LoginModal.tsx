import React, { FunctionComponent } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import AccountModal from './AccountModal';

type IProp =  {
    shown: boolean;
    onHide: () => void;
};

const LoginModal: FunctionComponent<IProp> = ({ shown, onHide }) => (
    <AccountModal shown={shown} onHide={onHide} title="登陆" form={
        <Form>
            <Form.Group>
                <Form.Label>邮箱地址</Form.Label>
                <Form.Control type="email" placeholder="输入你的邮箱地址" />
            </Form.Group>
            <Form.Group>
                <Form.Label>密码</Form.Label>
                <Form.Control type="password" placeholder="输入你的密码" />
            </Form.Group>
            <Button variant="primary" type="submit" className="float-right">登陆</Button>
        </Form>
    } />
);

export default LoginModal;
