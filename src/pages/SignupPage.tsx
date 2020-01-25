import { Form as FormikForm, Formik } from 'formik';
import React, { FunctionComponent } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import * as Yup from 'yup';
import { EmailContext } from '../App';
import MemberInfoAccordion from './MemberInfoCard';
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

// Match all phone numbers from China mainland(exclude lot numbers) and HKSAR
// Reference: https://www.hkepc.com/forum/viewthread.php?fid=26&tid=2190792 & https://github.com/VincentSit/ChinaMobilePhoneNumberRegex
const phoneRegex = /^1[0-9]{10}$|^[569][0-9]{7}$|^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[01356789]\d{2}|6[2567]\d{2}|4[579]\d{2})\d{6}$/;

// TODO: I want it fucking DRY!
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
