import { FormikHelpers } from 'formik';
import React, { FunctionComponent, useContext, useState } from 'react';
import * as Yup from 'yup';
import { LoginEmailContext, UserEmail } from '../App';
import withModal from '../shared/FormModal';
import './AccountStatus.css';
import LoginForm from './LoginForm';
import LogoutButton from './LogoutButton';
import PasswordResetForm from './PasswordResetForm';
import RegisterForm from './RegisterForm';

export type LoginAndRegFormValues = {
    email: string,
    password: string,
};

const validationSchema = Yup.object<LoginAndRegFormValues>({
    email: Yup.string().max(30).matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).required(),
    password: Yup.string().min(8).max(30).required(),
});

type LoginAndRegHandler =
    (mode: 'register' | 'login', values: LoginAndRegFormValues, helper: FormikHelpers<LoginAndRegFormValues>, onHide: () => void, updateCtx: React.Dispatch<React.SetStateAction<string | null>>) => void;

const handleLoginAndReg: LoginAndRegHandler = (mode, values, helper, onHide, updateCtx) => {
    Promise.race<Promise<Response>>([
        new Promise((_, reject) => setTimeout(() => reject(new Error('请求超时，请重试')), 8000)),
        fetch(`/auth/${mode}`, { // TODO: change it to /backend/auth
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
            },
            mode: 'same-origin',
            credentials: 'same-origin',
            body: JSON.stringify(values),
        }),
    ]).then((response) => {
        if (response.ok) {
            const userEmail: UserEmail = { email: values.email, expireTime: new Date().getTime() + 43200000 }; // 43200000 = 12h
            localStorage.setItem('user', JSON.stringify(userEmail));
            updateCtx(values.email);
            onHide();
            return null;
        } else {
            return response.json();
        }
    }).then((data) => {
        if (data?.message) {
            throw new Error(data.message);
        }
    }).catch((error) => {
        helper.setFieldError('password', error.message); // FIXME: use Alert instead
        helper.setSubmitting(false);
    });
};

const AccountStatus: FunctionComponent = () => {
    const { state, update } = useContext(LoginEmailContext);
    const [registerFormShown, toggleRegisterForm] = useState(false);
    const [loginFormShown, toggleLoginForm] = useState(false);
    const [passResetFormShown, togglePassResetForm] = useState(false);
    if (state) {
        return (<LogoutButton />);
    } else {
        return (<>
            {withModal('注册', registerFormShown, () => toggleRegisterForm(false), <>
                <RegisterForm
                    validationSchema={validationSchema}
                    onSubmit={(values, helpers) => handleLoginAndReg('register', values, helpers, () => toggleRegisterForm(false), update)}
                />
            </>)}
            {withModal('登陆', loginFormShown, () => toggleLoginForm(false), <>
                <LoginForm
                    validationSchema={validationSchema}
                    onSubmit={(values, helpers) => handleLoginAndReg('login', values, helpers, () => toggleLoginForm(false), update)}
                    onResetPasswordButtonClicked={() => {
                        toggleLoginForm(false);
                        togglePassResetForm(true);
                    }}
                />
            </>)}
            {withModal('重置密码', passResetFormShown, () => togglePassResetForm(false), <>
                <PasswordResetForm />
            </>)}
            <span className="clickable-text" onClick={() => toggleLoginForm(true)}>
                登陆
            </span>
            &nbsp;/&nbsp;
            <span className="clickable-text" onClick={() => toggleRegisterForm(true)}>
                注册
            </span>
        </>);
    }
};

export default AccountStatus;
