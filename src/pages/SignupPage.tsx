import React, { FunctionComponent } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';
import { EmailContext } from '../App';
import MemberInfoAccordion from './MemberInfoAccordion';
import TeamInfo from './TeamInfo';
import './SignupPage.css';

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

type FormDataPayload = {
    confirmed: boolean,
    data: SignupFormValues,
};

// TODO: should get from fetch()
const initialValues: SignupFormValues = {
    teamInfo: {
        name: 'gaygay',
        description: 'gaygay',
    },
    memberInfo: [
        {
            name: '李大刀',
            gender: 2,
            captain: true,
            email: 'how@qq.com',
            phone: '233333',
            size: 1,
            school: 'tencent',
            education: 2,
            grade: '三',
            profession: 'dontknow',
            experience: 'love',
        },
        {
            name: '蔡徐坤',
            gender: 2,
            captain: false,
            email: 'how@qq.com',
            phone: '233333',
            size: 1,
            school: 'tencent',
            education: 2,
            grade: '三',
            profession: 'dontknow',
            experience: 'love',
        },
    ], // TODO: must corrispondent to length
};

// TODO: I want it fucking DRY!
const validationSchema = Yup.object({
    teamInfo: Yup.object({
        name: Yup.string().max(20).required(),
        description: Yup.string().max(50).required(),
    }),
    memberInfo: Yup.array(Yup.object({
        name: Yup.string().max(24).required(),
        gender: Yup.number().required(),
        captain: Yup.bool().required(),
        email: Yup.string().max(30).required(),
        phone: Yup.string().max(20).required(), // TODO: use matches() to apply RegExp
        size: Yup.number().required(),
        school: Yup.string().max(30).required(),
        education: Yup.number().required(),
        grade: Yup.string().max(10).required(),
        profession: Yup.string().max(20).required(),
        experience: Yup.string().max(100).required(),
    })).max(6).required(),
});

// TODO: prevent double submit
const SignupPage: FunctionComponent = () => {
    const { state } = React.useContext(EmailContext);
    return (<Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => { /* TODO */ }}
    >
        <Container
            fluid={true}
            className="form-container"
            as={FormikForm}
        >
            <Row>
                {state ? (<Col>
                    <ButtonGroup>
                        <Button variant="outline-primary">保存</Button>
                        <Button variant="outline-primary">保存并确认</Button>
                    </ButtonGroup>
                </Col>) : (<Col>
                    <Alert variant="warning">注册并登陆后才可以提交报名表单，请点击右上方的按钮来注册或登陆！</Alert>
                </Col>)}
            </Row>
            <Row>
                <Col sm={4}>
                    <TeamInfo />
                </Col>
                <Col sm={8}>
                    <MemberInfoAccordion />
                </Col>
            </Row>
        </Container>
    </Formik>);
};

export default SignupPage;
