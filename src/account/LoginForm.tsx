import { useFormik } from 'formik';
import React, { FunctionComponent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import FormModal from '../modal/FormModal';

type IProp = {
    shown: boolean;
    onHide: () => void;
};

type LoginFormValues = {
    email: string,
    password: string,
};

const initialValues: LoginFormValues = {
    email: '',
    password: '',
};

const validationSchema = Yup.object({
    // eslint-disable-next-line no-useless-escape
    email: Yup.string().max(30).matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).required(),
    password: Yup.string().min(8).max(30).required(),
});

const LoginForm: FunctionComponent<IProp> = ({ shown, onHide }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => { } // TODO
    })
    return (<FormModal shown={shown} onHide={onHide} title="登陆">
        <Form>
            <Form.Group controlId="email">
                <Form.Label>邮箱地址</Form.Label>
                <Form.Control
                    type="email"
                    isValid={formik.touched.email && !formik.errors.email}
                    maxLength={30}
                    {...formik.getFieldProps('email')}
                />
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>密码</Form.Label>
                <Form.Control
                    type="password"
                    isValid={formik.touched.password && !formik.errors.password}
                    maxLength={30}
                    {...formik.getFieldProps('password')}
                />
            </Form.Group>
            <Button variant="outline-primary">忘记密码</Button> {/* TODO */}
            <Button variant="outline-primary" type="submit" className="float-right">登陆</Button>
        </Form>
    </FormModal>);
};

export default LoginForm;
