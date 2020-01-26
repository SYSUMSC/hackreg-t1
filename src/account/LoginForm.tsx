import { ErrorMessage, FormikHelpers, useFormik } from 'formik';
import React, { FunctionComponent } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
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

const handleLogin = (values: LoginFormValues, helper: FormikHelpers<LoginFormValues>) => {
    Promise.race<Promise<Response>>([
        new Promise((_, reject) => setTimeout(() => reject(new Error('请求超时')), 8000)),
        fetch('backend/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'Content-Type:application/json;charset=utf-8' },
            mode: 'same-origin',
            cache: 'reload',
            body: JSON.stringify(values),
        }),
    ]).then((response) => {
        if (!response.ok) {
            if (response.body) {
                // TODO
            } else {
                throw new Error('未知错误');
            }
        }
    }).catch((error) => {
        helper.setFieldError('password', error.message);
    }).finally(() => helper.setSubmitting(false));
};

const LoginForm: FunctionComponent<IProp> = ({ shown, onHide }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleLogin,
    });
    return (<FormModal shown={shown} onHide={onHide} title="登陆">
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="email">
                <Form.Label>邮箱地址</Form.Label>
                <Form.Control
                    type="email"
                    isInvalid={!!formik.touched.email && !!formik.errors.email}
                    maxLength={30}
                    {...formik.getFieldProps('email')}
                />
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>密码</Form.Label>
                <Form.Control
                    type="password"
                    isInvalid={!!formik.touched.password && !!formik.errors.password}
                    maxLength={30}
                    {...formik.getFieldProps('password')}
                />
            </Form.Group>
            {
                formik.submitCount > 0 && !formik.isSubmitting && !!formik.errors.password ? (
                    <Alert variant="warning">
                        {
                            formik.errors.password!
                        }
                    </Alert>
                ) : null
            }
            <Button variant="outline-primary" disabled={formik.isSubmitting}>忘记密码</Button> {/* TODO */}
            {
                formik.isSubmitting ? (<>
                    <Button
                        variant="outline-primary"
                        className="float-right"
                        disabled={true}
                    >
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    </Button>
                </>) : (<>
                    <Button
                        variant="outline-primary"
                        type="submit"
                        className="float-right"
                    >
                        登录
                    </Button>
                </>)
            }
        </Form>
    </FormModal>);
};

export default LoginForm;
