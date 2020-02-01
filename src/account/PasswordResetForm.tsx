import { FormikErrors, FormikHelpers, useFormik } from 'formik';
import React, { FunctionComponent, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import * as Yup from 'yup';
import FormDataError from '../pages/signup/FormDataError';

type PasswordResetFormValues = {
    email: string,
    token: string,
    password: string,
    confirmPassword: string,
};

type ActionResult = {
    type: 'error' | 'success',
    message: string,
} | null;

const validationSchema = Yup.object<PasswordResetFormValues>({
    email: Yup.string().max(30).matches(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/).required(),
    token: Yup.string().length(64).matches(/[0-9a-z]{20}/).required(),
    password: Yup.string().min(8).max(30).required(),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null]).required(),
});

const handleReset = (email: string,
                     toggleEmailSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
                     toggleEmailSent: React.Dispatch<React.SetStateAction<boolean>>,
                     updateActionResult: React.Dispatch<React.SetStateAction<ActionResult>>,
                     setFormErrors: (errors: FormikErrors<PasswordResetFormValues>) => void) => {
    toggleEmailSubmitting(true);
    updateActionResult(null);
    Promise.race<Promise<Response>>([
        new Promise((_, reject) => setTimeout(() => reject(new Error('请求超时，请重试')), 8000)),
        fetch('/auth/reset', { // TODO: change it to /backend/auth
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
            },
            mode: 'same-origin',
            credentials: 'same-origin',
            body: JSON.stringify({ email }),
        }),
    ]).then((response) => {
        if (response.ok) {
            toggleEmailSubmitting(false);
            toggleEmailSent(true);
            updateActionResult({ type: 'success', message: '含有验证码的邮件已发送，请注意查收。若超过五分钟未收到，请重试。' });
            return null;
        } else {
            return response.json();
        }
    }).then((data) => {
        if (data?.message) {
            throw new FormDataError(data.message ?? '未知错误', data.names ?? []);
        }
    }).catch((error) => {
        toggleEmailSubmitting(false);
        updateActionResult({ type: 'error', message: error.message });
        if (error instanceof FormDataError) {
            const erroredFormItems = {};
            error.names.forEach((name) => Object.assign(erroredFormItems, { [name]: '' }));
            setFormErrors(erroredFormItems);
        }
    });
};

const getSubmitHandler = (updateActionResult: React.Dispatch<React.SetStateAction<ActionResult>>) => (values: PasswordResetFormValues, formikHelpers: FormikHelpers<PasswordResetFormValues>) => {
    updateActionResult(null);
    formikHelpers.setSubmitting(true);
    Promise.race<Promise<Response>>([
        new Promise((_, reject) => setTimeout(() => reject(new Error('请求超时，请重试')), 8000)),
        fetch('/auth/confirm', { // TODO: change it to /backend/auth
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
            },
            mode: 'same-origin',
            credentials: 'same-origin',
            body: JSON.stringify({ ...values, confirmPassword: undefined }),
        }),
    ]).then((response) => {
        if (response.ok) {
            formikHelpers.setSubmitting(false);
            updateActionResult({ type: 'success', message: '重置密码成功' });
            return null;
        } else {
            return response.json();
        }
    }).then((data) => {
        if (data?.message) {
            throw new FormDataError(data.message ?? '未知错误', data.names ?? []);
        }
    }).catch((error) => {
        formikHelpers.setSubmitting(false);
        updateActionResult({ type: 'error', message: error.message });
        if (error instanceof FormDataError) {
            const erroredFormItems = {};
            error.names.forEach((name) => Object.assign(erroredFormItems, { [name]: '' }));
            formikHelpers.setErrors(erroredFormItems);
        }
    });
};

const PasswordResetForm: FunctionComponent = () => {
    const [emailSent, toggleEmailSent] = useState(false);
    const [emailSubmitting, toggleEmailSubmitting] = useState(false);
    const [actionResult, updateActionResult] = useState<ActionResult>(null);
    const formik = useFormik<PasswordResetFormValues>({
        initialValues: { email: '', token: '', password: '', confirmPassword: '' },
        validationSchema,
        onSubmit: getSubmitHandler(updateActionResult),
    });
    return (<>
        <Form onSubmit={formik.handleSubmit}>
            {
                !actionResult ? null : (<>
                    <Alert variant={actionResult.type === 'error' ? "warning" : "success"}>
                        {actionResult.message}
                    </Alert>
                </>)
            }
            <Form.Group controlId="email">
                <Form.Label>邮箱地址</Form.Label>
                <Form.Control
                    type="email"
                    isInvalid={!!formik.touched.email && !!formik.errors.email}
                    disabled={emailSubmitting || formik.isSubmitting}
                    maxLength={30}
                    {...formik.getFieldProps('email')}
                />
                <Form.Text className="text-muted font-weight-light">输入需要找回的密码对应的邮箱</Form.Text>
            </Form.Group>
            {
                !emailSent ? (<>
                    <Button
                        variant="outline-primary"
                        className="float-right"
                        disabled={emailSubmitting}
                        onClick={async () => {
                            const errors = await formik.validateForm();
                            if (!errors.email) {
                                handleReset(formik.values.email, toggleEmailSubmitting, toggleEmailSent, updateActionResult, formik.setErrors.bind(formik));
                            }
                        }}
                    >
                        {emailSubmitting ? (<>
                            <Spinner
                                animation="border"
                                size="sm"
                            />
                        </>) : '发送验证邮件'
                        }
                    </Button>
                </>) : (<>
                    <Form.Group controlId="token">
                        <Form.Label>验证码</Form.Label>
                        <Form.Control
                            type="text"
                            isInvalid={!!formik.touched.token && !!formik.errors.token}
                            maxLength={64}
                            disabled={formik.isSubmitting}
                            {...formik.getFieldProps('token')}
                        />
                        <Form.Text className="text-muted font-weight-light">输入找回密码邮件中提供的验证码</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>密码</Form.Label>
                        <Form.Control
                            type="password"
                            isInvalid={!!formik.touched.password && !!formik.errors.password}
                            maxLength={30}
                            disabled={formik.isSubmitting}
                            {...formik.getFieldProps('password')}
                        />
                        <Form.Text className="text-muted font-weight-light">输入要设置的新密码</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>确认密码</Form.Label>
                        <Form.Control
                            type="password"
                            isInvalid={!!formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                            maxLength={30}
                            disabled={formik.isSubmitting}
                            {...formik.getFieldProps('confirmPassword')}
                        />
                        <Form.Text className="text-muted font-weight-light">再输入一遍新密码</Form.Text>
                    </Form.Group>
                    <Button
                        type="submit"
                        variant="outline-primary"
                        className="float-right"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? (<>
                            <Spinner
                                animation="border"
                                size="sm"
                                role="status"
                            />
                        </>) : '提交'
                        }
                    </Button>
                </>)
            }
        </Form>
    </>);
};

export default PasswordResetForm;
