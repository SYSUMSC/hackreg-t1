import { FormikErrors, FormikProps } from 'formik';
import React, { FunctionComponent } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './MemberInfo.css';
import { FormData, MemberFormValues } from './SignupPage';

const FormItem: FunctionComponent<{ children: React.ReactNode, title: string, controlId: string, colCss?: string }> =
    ({ children, title, controlId, colCss }) => (<Form.Group as={Row} controlId={controlId}>
        <Form.Label column={true} sm={2} className="text-left text-sm-right">{title}</Form.Label>
        <Col sm={10} {...(colCss && {className: colCss})}>
            {children}
        </Col>
    </Form.Group>);

const MemberInfoCard: FunctionComponent<{ formik: FormikProps<FormData>, index: number }> = ({ formik, index }) => {
    const { values, touched, errors, getFieldProps, isSubmitting } = formik;
    const touchedItems = touched?.form?.memberInfo ? touched.form.memberInfo[index] : undefined;
    const erroredItems = errors?.form?.memberInfo ?
        errors.form?.memberInfo[index] as FormikErrors<MemberFormValues> : undefined;
    return (<Card {...(!!erroredItems && !!touchedItems && { border: 'danger' })} >
        <Accordion.Toggle as={Card.Header} eventKey={`form.memberName-${index}`}>
            {values.form.memberInfo[index].name}&nbsp;&nbsp;<span className="text-muted">{values.form.memberInfo[index].captain ? '队长' : '队员'}</span>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={`form.memberName-${index}`}>
            <Card.Body>
                {!index ? (<Alert variant="light">第一位队员会被视为队长，其他将被视为队员。</Alert>) : null}
                <FormItem title="姓名" controlId={`form.memberInfo[${index}].name`}>
                    <Form.Control
                        type="text"
                        isInvalid={!!touchedItems?.name && !!erroredItems?.name}
                        maxLength={20}
                        disabled={isSubmitting || formik.initialValues.confirmed}
                        {...getFieldProps(`form.memberInfo[${index}].name`)}
                    />
                    <Form.Text className="text-muted font-weight-light">长度不得超过20个字</Form.Text>
                </FormItem>
                <FormItem title="性别" colCss="radio-container" controlId={`form.memberInfo[${index}].gender`}>
                    <Form.Control
                        as="select"
                        disabled={isSubmitting || formik.initialValues.confirmed}
                        isInvalid={!!touchedItems?.gender && !!erroredItems?.gender}
                        {...getFieldProps(`form.memberInfo[${index}].gender`)}
                    >
                        <option value="0">男</option>
                        <option value="1">女</option>
                        <option value="2">其他</option>
                    </Form.Control>
                </FormItem>
                <FormItem title="邮箱" controlId={`form.memberInfo[${index}].email`}>
                    <Form.Control
                        type="email"
                        isInvalid={!!touchedItems?.email && !!erroredItems?.email}
                        maxLength={50}
                        disabled={isSubmitting || formik.initialValues.confirmed}
                        {...getFieldProps(`form.memberInfo[${index}].email`)}
                    />
                    <Form.Text className="text-muted font-weight-light">重要信息，请确保填写正确</Form.Text>
                </FormItem>
                <FormItem title="手机号码" controlId={`form.memberInfo[${index}].phone`}>
                    <Form.Control
                        type="text"
                        isInvalid={!!touchedItems?.phone && !!erroredItems?.phone}
                        maxLength={20}
                        disabled={isSubmitting || formik.initialValues.confirmed}
                        {...getFieldProps(`form.memberInfo[${index}].phone`)}
                    />
                    <Form.Text className="text-muted font-weight-light">仅接受内地及香港手机号码</Form.Text>
                </FormItem>
                <FormItem title="衣服尺码" controlId={`form.memberInfo[${index}].size`}>
                    <Form.Control
                        as="select"
                        isInvalid={!!touchedItems?.size && !!erroredItems?.size}
                        disabled={isSubmitting || formik.initialValues.confirmed}
                        {...getFieldProps(`form.memberInfo[${index}].size`)}
                    >
                        <option value="0">XS</option>
                        <option value="1">S</option>
                        <option value="2">M</option>
                        <option value="3">L</option>
                        <option value="4">XL</option>
                        <option value="5">XXL</option>
                        <option value="6">XXXL</option>
                    </Form.Control>
                    <Form.Text className="text-muted font-weight-light">用于比赛专用T恤的制作</Form.Text>
                </FormItem>
                <FormItem title="学校" controlId={`form.memberInfo[${index}].school`}>
                    <Form.Control
                        type="text"
                        isInvalid={!!touchedItems?.school && !!erroredItems?.school}
                        maxLength={15}
                        disabled={isSubmitting || formik.initialValues.confirmed}
                        {...getFieldProps(`form.memberInfo[${index}].school`)}
                    />
                    <Form.Text className="text-muted font-weight-light">建议格式：城市名+学校名，不要写缩写，长度不得超过15字</Form.Text>
                </FormItem>
                <FormItem title="学历" controlId={`form.memberInfo[${index}].education`}>
                    <Form.Control
                        as="select"
                        isInvalid={!!touchedItems?.education && !!erroredItems?.education}
                        disabled={isSubmitting || formik.initialValues.confirmed}
                        {...getFieldProps(`form.memberInfo[${index}].education`)}
                    >
                        <option value="0">本科生</option>
                        <option value="1">研究生</option>
                        <option value="2">其他</option>
                    </Form.Control>
                    <Form.Text className="text-muted font-weight-light">正在读某某生的，也可选对应的那一项</Form.Text>
                </FormItem>
                <FormItem title="年级" controlId={`form.memberInfo[${index}].grade`}>
                    <Form.Control
                        type="text"
                        isInvalid={!!touchedItems?.grade && !!erroredItems?.grade}
                        maxLength={10}
                        disabled={isSubmitting || formik.initialValues.confirmed}
                        {...getFieldProps(`form.memberInfo[${index}].grade`)}
                    />
                    <Form.Text className="text-muted font-weight-light">建议格式：XXXX（入学年份）级，长度不得超过10个字</Form.Text>
                </FormItem>
                <FormItem title="专业" controlId={`form.memberInfo[${index}].profession`}>
                    <Form.Control
                        type="text"
                        isInvalid={!!touchedItems?.profession && !!erroredItems?.profession}
                        maxLength={20}
                        disabled={isSubmitting || formik.initialValues.confirmed}
                        {...getFieldProps(`form.memberInfo[${index}].profession`)}
                    />
                    <Form.Text className="text-muted font-weight-light">填写现在正在就读的专业的名称，长度不得超过20个字</Form.Text>
                </FormItem>
                <FormItem title="个人经历" controlId={`form.memberInfo[${index}].experience`}>
                    <Form.Control
                        as="textarea"
                        rows="5"
                        isInvalid={!!touchedItems?.experience && !!erroredItems?.experience}
                        maxLength={100}
                        disabled={isSubmitting || formik.initialValues.confirmed}
                        {...getFieldProps(`form.memberInfo[${index}].experience`)}
                    />
                    <Form.Text className="text-muted font-weight-light">吹吹水介绍一下自己，长度不得超过100个汉字</Form.Text>
                </FormItem>
            </Card.Body>
        </Accordion.Collapse>
    </Card>);
};

const MemberInfo: FunctionComponent<{ formik: FormikProps<FormData> }> = ({ formik }) => {
    const memberInfo = formik.initialValues.form.memberInfo;
    const cards = memberInfo.map((_, index) => (
        <MemberInfoCard
            formik={formik}
            index={index}
            key={`form.memberInfo[${index}]`}
        />
    ));
    return (<>
        <h4>队员信息</h4>
        <Accordion>
            {cards}
            {memberInfo.length < 6 ? (<>
                <Card
                    key="addMember"
                    {...(!!formik.errors?.form?.memberInfo && formik.touched?.form?.memberInfo && memberInfo.length === 0 && { border: 'danger' })}
                >
                    <Card.Header
                        className="card-add-member"
                        onClick={() => {
                            if (!formik.isSubmitting && !formik.initialValues.confirmed) {
                                const newValues = Object.assign({}, formik.values);
                                newValues.form.memberInfo.push({
                                    name: '',
                                    gender: '0',
                                    captain: memberInfo.length === 0,
                                    email: '',
                                    phone: '',
                                    size: '0',
                                    school: '',
                                    education: '0',
                                    grade: '',
                                    profession: '',
                                    experience: '',
                                });
                                formik.setValues(newValues);
                            }
                        }}
                    >
                        添加队员...
                    </Card.Header>
                </Card>
            </>) : null}
        </Accordion>
    </>);
};

export default MemberInfo;
