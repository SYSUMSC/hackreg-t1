import { useFormik } from 'formik';
import React, { FunctionComponent } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import FormModal from '../modal/FormModal';

type IProp = {
    shown: boolean;
    onHide: () => void;
};

type RegisterFormValues = {
    email: string,
    password: string,
    confirmPassword: string,
};

const initialValues: RegisterFormValues = {
    email: '',
    password: '',
    confirmPassword: '',
};

const validationSchema = Yup.object({
    // eslint-disable-next-line no-useless-escape
    email: Yup.string().max(30).matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).required(),
    password: Yup.string().min(8).max(30).required(),
    confirmPassword: Yup.string().min(8).max(30).required().test('confirm-password', '', function (value) {
        return this.parent.password === value;
    }),
});

const RegisterForm: FunctionComponent<IProp> = ({ shown, onHide }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => { } // TODO
    })
    return (<FormModal shown={shown} onHide={onHide} title="注册">
        <Alert variant="info">一个队伍的报名只需要一个账号完成，我们推荐由队长注册并管理账号。</Alert>
        <Form>
            <Form.Group>
                <Form.Label>邮箱地址</Form.Label>
                <Form.Control
                    type="email"
                    isValid={formik.touched.email && !formik.errors.email}
                    maxLength={30}
                    {...formik.getFieldProps('email')}
                />
                <Form.Text className="text-muted font-weight-light">重要信息，请确保填写正确</Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>密码</Form.Label>
                <Form.Control
                    type="password"
                    isValid={formik.touched.password && !formik.errors.password}
                    maxLength={30}
                    {...formik.getFieldProps('password')}
                />
                <Form.Text className="text-muted font-weight-light">长度在8到30字之间，只能包含英文字母、数字或者一些特殊符号如#</Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>确认密码</Form.Label>
                <Form.Control
                    type="password"
                    isValid={formik.touched.confirmPassword && !formik.errors.confirmPassword}
                    maxLength={30}
                    {...formik.getFieldProps('confirmPassword')}
                />
                <Form.Text className="text-muted font-weight-light">再输入一次密码</Form.Text>
            </Form.Group>
            <Button variant="outline-primary" type="submit" className="float-right">注册</Button>
        </Form>
    </FormModal>);
};

export default RegisterForm;
