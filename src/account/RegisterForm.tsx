import { FormikHelpers, useFormik } from 'formik';
import React, { FunctionComponent } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import * as Yup from 'yup';
import { LoginAndRegFormValues } from './AccountStatus';

type IProp = {
    validationSchema: Yup.ObjectSchema<LoginAndRegFormValues>;
    onSubmit: (values: LoginAndRegFormValues, formikHelpers: FormikHelpers<LoginAndRegFormValues>) => void;
};

const RegisterForm: FunctionComponent<IProp> = ({ validationSchema, onSubmit }) => {
    const formik = useFormik<LoginAndRegFormValues>({
        initialValues: { email: '', password: '' },
        validationSchema,
        onSubmit,
    });
    return (<>
        <Alert variant="info">一个队伍的报名只需要一个账号完成，我们推荐由队长注册并管理账号。</Alert>
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="email">
                <Form.Label>邮箱地址</Form.Label>
                <Form.Control
                    type="email"
                    isInvalid={!!formik.touched.email && !!formik.errors.email}
                    maxLength={30}
                    {...formik.getFieldProps('email')}
                />
                <Form.Text className="text-muted font-weight-light">重要信息，请确保填写正确</Form.Text>
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>密码</Form.Label>
                <Form.Control
                    type="password"
                    isInvalid={!!formik.touched.password && !!formik.errors.password}
                    maxLength={30}
                    {...formik.getFieldProps('password')}
                />
                <Form.Text className="text-muted font-weight-light">长度在8到30字之间，只能包含英文字母、数字或者一些特殊符号如#@等</Form.Text>
            </Form.Group>
            <Form.Text className="font-weight-light text-danger">
                {
                    formik.submitCount > 0 && !formik.isSubmitting && !!formik.errors.password ? (
                        formik.errors.password!
                    ) : null
                }
            </Form.Text>
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
                        注册
                    </Button>
                </>)
            }
        </Form>
    </>);
};

export default RegisterForm;
