import React, { FunctionComponent } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormModal from '../modal/FormModal';

type IProp = {
    shown: boolean;
    onHide: () => void;
};

const LoginForm: FunctionComponent<IProp> = ({ shown, onHide }) => (
    <FormModal shown={shown} onHide={onHide} title="登陆">
        <Form>
            <Form.Group>
                <Form.Label>邮箱地址</Form.Label>
                <Form.Control type="email" placeholder="输入你的邮箱地址" />
            </Form.Group>
            <Form.Group>
                <Form.Label>密码</Form.Label>
                <Form.Control type="password" placeholder="输入你的密码" />
            </Form.Group>
            <Button variant="outline-primary" type="submit">忘记密码</Button>
            <Button variant="outline-primary" type="submit" className="float-right">登陆</Button>
        </Form>
    </FormModal>);

export default LoginForm;
