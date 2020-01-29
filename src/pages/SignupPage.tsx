import { Form as FormikForm, Formik } from 'formik';
import React, { FunctionComponent, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import * as Yup from 'yup';
import { LoginEmailContext } from '../App';
import MemberInfo from './MemberInfo';
import './SignupPage.css';
import TeamInfo from './TeamInfo';

export type MemberFormValues = {
    name: string,
    gender: number,
    captain: boolean,
    email: string,
    phone: string,
    size: number,
    school: string,
    education: number,
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

type FormData = {
    confirmed: boolean,
    form: SignupFormValues,
};

// Match all phone numbers from China mainland(exclude lot numbers) and HKSAR
// Reference: https://www.hkepc.com/forum/viewthread.php?fid=26&tid=2190792 & https://github.com/VincentSit/ChinaMobilePhoneNumberRegex
const phoneRegex = /^1[0-9]{10}$|^[569][0-9]{7}$|^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[01356789]\d{2}|6[2567]\d{2}|4[579]\d{2})\d{6}$/;

const validationSchema = Yup.object({
    teamInfo: Yup.object({
        name: Yup.string().max(12).required(),
        description: Yup.string().max(50).required(),
    }),
    memberInfo: Yup.array(Yup.object({
        name: Yup.string().max(12).required(),
        gender: Yup.number().required(),
        captain: Yup.bool().required(),
        email: Yup.string().max(50).required(),
        phone: Yup.string().matches(phoneRegex).required(),
        size: Yup.number().required(),
        school: Yup.string().max(30).required(),
        education: Yup.number().required(),
        grade: Yup.string().max(10).required(),
        profession: Yup.string().max(20).required(),
        experience: Yup.string().max(100).required(),
    })).max(6).required(),
});

const SignupPage: FunctionComponent = () => {
    const { state } = React.useContext(LoginEmailContext);
    const [errorMsg, updateErrorMsg] = React.useState<string | null>(null);
    const [formData, updateFormData] = React.useState<FormData | null>(null);
    useEffect(() => {
        if (!state) {
            updateFormData(null);
        } else {
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
            ])
            .then((response) => response.json().then((data) => [response.ok, data] as const))
            .then(([ok, data]) => { // data here will be either form data object or error message object
                if (ok) {
                    updateFormData(data);
                } else {
                    throw new Error(data.message);
                }
            })
            .catch((error) => {
                updateErrorMsg(error.message);
            });
        }
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
    if (!formData) {
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
        return (<Formik<SignupFormValues>
            initialValues={formData.form}
            validationSchema={validationSchema}
            onSubmit={values => { /* TODO */ }}
        >
            <Container
                fluid={true}
                className="signup-page-container content-fit-viewport"
                as={FormikForm}
            >
                <Row>
                    <Col>
                        <ButtonGroup>
                            <Button variant="outline-primary">保存</Button>
                            <Button variant="outline-primary">保存并确认</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <TeamInfo />
                    </Col>
                    <Col sm={8}>
                        <MemberInfo />
                    </Col>
                </Row>
            </Container>
        </Formik>);
    }
};

export default SignupPage;
