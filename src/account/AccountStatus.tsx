import { FormikHelpers } from 'formik';
import React, { FunctionComponent, useState } from 'react';
import * as Yup from 'yup';
import { LoginEmailContext, UserEmail } from '../App';
import FormModal from '../modal/FormModal';
import './AccountStatus.css';
import LoginForm from './LoginForm';
import LogoutButton from './LogoutButton';
import RegisterForm from './RegisterForm';

export type LoginAndRegFormValues = {
    email: string,
    password: string,
};

const validationSchema = Yup.object<LoginAndRegFormValues>({
    // eslint-disable-next-line no-useless-escape
    email: Yup.string().max(30).matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).required(),
    password: Yup.string().min(8, '密码必须长于8位').max(30, '密码不能超过30位').required('密码不能为空'),
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
        helper.setFieldError('password', error.message);
        helper.setSubmitting(false);
    });
};

const AccountStatus: FunctionComponent = () => {
    const { state, update } = React.useContext(LoginEmailContext);
    const [regFormShown, toggleRegForm] = useState(false);
    const [loginFormShown, toggleLoginForm] = useState(false);
    if (state) {
        return (<LogoutButton />);
    } else {
        return (<>
            <FormModal shown={regFormShown} onHide={() => toggleRegForm(false)} title="注册">
                <RegisterForm
                    validationSchema={validationSchema}
                    onSubmit={(values, helpers) => handleLoginAndReg('register', values, helpers, () => toggleRegForm(false), update)}
                />
            </FormModal>
            <FormModal shown={loginFormShown} onHide={() => toggleLoginForm(false)} title="登陆">
                <LoginForm
                    validationSchema={validationSchema}
                    onSubmit={(values, helpers) => handleLoginAndReg('login', values, helpers, () => toggleLoginForm(false), update)}
                />
            </FormModal>
            <span className="clickable-text" onClick={() => toggleLoginForm(true)}>
                登陆
            </span>
            &nbsp;/&nbsp;
            <span className="clickable-text" onClick={() => toggleRegForm(true)}>
                注册
            </span>
        </>);
    }
};

export default AccountStatus;
