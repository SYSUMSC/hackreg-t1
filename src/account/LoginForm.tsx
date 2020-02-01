import { FormikHelpers, useFormik } from 'formik';
import React, { FunctionComponent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import * as Yup from 'yup';
import { LoginAndRegFormValues } from './AccountStatus';

type IProp = {
    validationSchema: Yup.ObjectSchema<LoginAndRegFormValues>;
    onSubmit: (values: LoginAndRegFormValues, formikHelpers: FormikHelpers<LoginAndRegFormValues>) => void;
    onResetPasswordButtonClicked: () => void;
};

const LoginForm: FunctionComponent<IProp> = ({ validationSchema, onSubmit, onResetPasswordButtonClicked }) => {
    const formik = useFormik<LoginAndRegFormValues>({
        initialValues: { email: '', password: '' },
        validationSchema,
        onSubmit,
    });
    return (<Form onSubmit={formik.handleSubmit}>
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
            <Form.Text className="font-weight-light text-danger">
                {
                    formik.submitCount > 0 && !formik.isSubmitting && !!formik.errors.password ? (
                        formik.errors.password!
                    ) : null
                }
            </Form.Text>
        </Form.Group>
        <Button
            variant="outline-primary"
            disabled={formik.isSubmitting}
            onClick={() => onResetPasswordButtonClicked()}
        >
            重置密码
        </Button>
        {
            <Button
                variant="outline-primary"
                className="float-right"
                disabled={formik.isSubmitting}
                type="submit"
            >
                {formik.isSubmitting ? (<>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                    />
                </>) : '登录'
                }
            </Button>
        }
    </Form>);
};

export default LoginForm;
