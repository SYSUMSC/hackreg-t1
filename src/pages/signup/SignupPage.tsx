import { FormikHelpers, useFormik } from 'formik';
import React, { FunctionComponent, useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import * as Yup from 'yup';
import { LoginEmailContext } from '../../App';
import FormDataError from './FormDataError';
import MemberInfo from './MemberInfo';
import './SignupPage.css';
import SubmitAndCancelButton, { ErroredAction } from './SubmitAndCancelButton';
import TeamInfo from './TeamInfo';

export type MemberFormValues = {
    name: string,
    gender: string,
    captain: boolean,
    email: string,
    phone: string,
    size: string,
    school: string,
    education: string,
    grade: string,
    profession: string,
    experience: string,
};

export type SignupFormValues = {
    teamInfo: {
        name: string,
        description: string,
    },
    memberInfo: MemberFormValues[],
};

export type FormData = {
    confirmed: boolean,
    form: SignupFormValues,
};

// Match all phone numbers from China mainland(exclude lot numbers) and HKSAR
// Reference: https://www.hkepc.com/forum/viewthread.php?fid=26&tid=2190792 & https://github.com/VincentSit/ChinaMobilePhoneNumberRegex
const phoneRegex = /^1[0-9]{10}$|^[569][0-9]{7}$|^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[01356789]\d{2}|6[2567]\d{2}|4[579]\d{2})\d{6}$/;

const validationSchema = Yup.object({
    confirmed: Yup.boolean(),
    form: Yup.object({
        teamInfo: Yup.object({
            name: Yup.string().max(20).required(),
            description: Yup.string().max(50).required(),
        }),
        memberInfo: Yup.array(Yup.object({
            name: Yup.string().max(20).required(),
            gender: Yup.string().matches(/^[0-2]$/).required(),
            captain: Yup.bool().required(),
            // eslint-disable-next-line no-useless-escape
            email: Yup.string().max(50).matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).required(),
            phone: Yup.string().matches(phoneRegex).required(),
            size: Yup.string().matches(/^[0-6]$/).required(),
            school: Yup.string().max(30).required(),
            education: Yup.string().matches(/^[0-2]$/).required(),
            grade: Yup.string().max(10).required(),
            profession: Yup.string().max(20).required(),
            experience: Yup.string().max(100).required(),
        })).min(1).max(6).required(),
    }),
});

const getSubmitHandler = (updateInitialFormData: React.Dispatch<React.SetStateAction<FormData | null>>, updateErroredAction: React.Dispatch<React.SetStateAction<ErroredAction>>) =>
    (values: FormData, formikHelpers: FormikHelpers<FormData>) => {
        updateErroredAction(null);
        formikHelpers.setSubmitting(true);
        Promise.race<Promise<Response>>([
            new Promise((_, reject) => setTimeout(() => reject(new Error('请求超时，请重试')), 8000)),
            fetch(`/signup/update`, { // TODO: change it to /backend/signup
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
                formikHelpers.setSubmitting(false);
                updateInitialFormData(values);
                return null;
            } else {
                return response.json();
            }
        }).then((data) => {
            if (data) {
                throw new FormDataError(data.message ?? '未知错误', data.names ?? []);
            }
        }).catch((error) => {
            formikHelpers.setSubmitting(false);
            updateErroredAction({
                type: 'submit',
                errorMessage: error.message,
            });
            if (error instanceof FormDataError) {
                const erroredFormItems = {};
                error.names.forEach((name) => Object.assign(erroredFormItems, { [name]: '' }));
                formikHelpers.setErrors(erroredFormItems);
            }
        });
    };

const handleCancel = (values: FormData, updateInitialFormData: React.Dispatch<React.SetStateAction<FormData | null>>, updateErroredAction: React.Dispatch<React.SetStateAction<ErroredAction | null>>, setSubmitting: (isSubmitting: boolean) => void) => {
    updateErroredAction(null);
    setSubmitting(true);
    Promise.race<Promise<Response>>([
        new Promise((_, reject) => setTimeout(() => reject(new Error('请求超时，请重试')), 8000)),
        fetch(`/signup/cancel`, { // TODO: change it to /backend/signup
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
            },
            mode: 'same-origin',
            credentials: 'same-origin',
        }),
    ]).then((response) => {
        if (response.ok) {
            const newValues = Object.assign({}, values);
            newValues.confirmed = false;
            setSubmitting(false);
            updateInitialFormData(newValues);
            return null;
        } else {
            return response.json();
        }
    }).then((data) => {
        if (data?.message) {
            throw new Error(data.message);
        }
    }).catch((error) => {
        setSubmitting(false);
        updateErroredAction({
            type: 'cancel',
            errorMessage: error.message,
        });
    });
};

const handleFetch = (updateErrorMsg: React.Dispatch<React.SetStateAction<string | null>>, updateInitialFormData: React.Dispatch<React.SetStateAction<FormData | null>>) => {
    Promise.race<Promise<Response>>([
        new Promise((_, reject) => setTimeout(() => reject(new Error('请求超时，请刷新重试')), 8000)),
        fetch('/signup/fetch', { // TODO: change it to /backend/signup
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
            },
            mode: 'same-origin',
            credentials: 'same-origin',
        }),
    ]).then((response) =>
        response.json().then((data) => [response.ok, data] as const),
    ).then(([ok, data]) => { // data here will be either form data object or error message object
        if (ok) {
            updateInitialFormData(data);
        } else {
            throw new Error(data.message);
        }
    }).catch((error) => {
        updateErrorMsg(error.message);
    });
};

const emptyFormData: FormData = { confirmed: false, form: { teamInfo: { name: '', description: '' }, memberInfo: [] } };

const SignupPage: FunctionComponent = () => {
    const { state } = React.useContext(LoginEmailContext);
    const [errorMsg, updateErrorMsg] = useState<string | null>(null); // for fetching form data
    const [erroredAction, updateErroredAction] = useState<ErroredAction>(null); // for canceling, submitting and confirming
    const [initialFormData, updateInitialFormData] = useState<FormData | null>(null);
    const formik = useFormik<FormData>({
        initialValues: initialFormData ?? emptyFormData,
        validationSchema,
        onSubmit: getSubmitHandler(updateInitialFormData, updateErroredAction),
        enableReinitialize: true, // force formik to reload when initialValues changes (via handleFetch)
    });
    useEffect(() => {
        if (state) {
            handleFetch(updateErrorMsg, updateInitialFormData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);
    if (!state) {
        return (<Container fluid={true} className="signup-page-container content-fit-viewport">
            <Row>
                <Col>
                    <Alert variant="warning" className="signup-alert">注册并登陆后才可以提交报名表单，请点击右上方的按钮来注册或登陆！</Alert>
                </Col>
            </Row>
        </Container>);
    }
    if (!initialFormData) {
        return (<div className="signup-page-container spinner-container content-fit-viewport">
            <Spinner
                animation="grow"
                role="status"
                className="content-spinner"
            />
            {
                errorMsg ? (
                    <span className="font-weight-light content-error-msg">{errorMsg}</span>
                ) : null
            }
        </div>);
    } else {
        return (<>
            <Container
                fluid={true}
                className="signup-page-container content-fit-viewport"
                as={Form}
                onSubmit={formik.handleSubmit}
            >
                <Row>
                    <Col>
                        <Alert variant="info" className="signup-alert">报名时间：XXX，请各参赛队伍在XXX之前保存表格并确认报名，否则报名无效。</Alert>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SubmitAndCancelButton
                            formik={formik}
                            confirmed={formik.initialValues.confirmed}
                            onCancel={(setSubmitting) => {
                                handleCancel(formik.values, updateInitialFormData, updateErroredAction, setSubmitting);
                            }}
                            erroredAction={erroredAction}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={4} as={Container} fluid={true}>
                        <Row>
                            <Col>
                                <Form.Group id="confirmed">
                                    <h4>确认报名</h4>
                                    <Form.Check
                                        type="checkbox"
                                        disabled={formik.isSubmitting || formik.initialValues.confirmed}
                                        label="确认报名并锁定表单"
                                        {...formik.getFieldProps('confirmed')}
                                        checked={formik.values.confirmed}
                                    />
                                    <Form.Text className="text-muted font-weight-light">确认报名并提交表单后，报名才算作有效。报名结束前可以任意取消报名来修改表单。</Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TeamInfo formik={formik} />
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={8}>
                        <MemberInfo formik={formik} />
                    </Col>
                </Row>
            </Container>
        </>);
    }
};

export default SignupPage;
