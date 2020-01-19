import React, { FunctionComponent } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import AccountModal from './AccountModal';

type IProp = {
    shown: boolean;
    onHide: () => void;
};

const RegisterModal: FunctionComponent<IProp> = ({ shown, onHide }) => (
    <AccountModal shown={shown} onHide={onHide} title="注册" form={
        <Form>
            <Alert variant="info">一个队伍的报名只需要一个账号完成，我们建议由队长注册并管理账号。</Alert>
            <Form.Group>
                <Form.Label>邮箱地址</Form.Label>
                <Form.Control type="email" placeholder="输入你的邮箱地址" />
            </Form.Group>
            <Form.Group>
                <Form.Label>密码</Form.Label>
                <Form.Control type="password" placeholder="输入你的密码" />
            </Form.Group>
            <Form.Group>
                <Form.Label>确认密码</Form.Label>
                <Form.Control type="password" placeholder="再次输入你的密码" />
            </Form.Group>
            <Button variant="primary" type="submit" className="float-right">注册</Button>
        </Form>
    } />
);

export default RegisterModal;
