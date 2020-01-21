import React, { FunctionComponent } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import FormModal from '../modal/FormModal';

type IProp = {
    shown: boolean;
    onHide: () => void;
};

const RegisterForm: FunctionComponent<IProp> = ({ shown, onHide }) => (
    <FormModal shown={shown} onHide={onHide} title="注册">
        <Alert variant="info">一个队伍的报名只需要一个账号完成，我们推荐由队长注册并管理账号。</Alert>
        <Form>
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
            <Button variant="outline-primary" type="submit" className="float-right">注册</Button>
        </Form>
    </FormModal>);

export default RegisterForm;
