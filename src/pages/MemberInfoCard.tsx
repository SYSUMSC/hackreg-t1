import { FormikErrors, useFormikContext } from 'formik';
import React, { FunctionComponent } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './MemberInfoAccordion.css';
import { MemberFormValues, SignupFormValues } from './SignupPage';

const FormItem: FunctionComponent<{ children: React.ReactNode, title: string, controlId: string, colCss?: string }> =
    ({ children, title, controlId, colCss }) => (<Form.Group as={Row} controlId={controlId}>
        <Form.Label column={true} sm={2} className="text-left text-sm-right">{title}</Form.Label>
        <Col sm={10} className={colCss ? colCss : ""}>
            {children}
        </Col>
    </Form.Group>);

const MemberInfoCard: FunctionComponent<{ index: number }> = (props) => {
    const { values, touched, errors, getFieldProps } = useFormikContext<SignupFormValues>();
    const memberInfo = values.memberInfo[props.index];
    const touchedItems = touched.memberInfo ? touched.memberInfo[props.index] : undefined;
    const erroredItems = errors.memberInfo ?
        errors.memberInfo[props.index] as FormikErrors<MemberFormValues> : undefined;
    return (<Card> {/* TODO: 1) use index for eventKey & radio name 2) check for the uniqueness of team leader */}
        <Accordion.Toggle as={Card.Header} eventKey={`memberName-${props.index}`}>
            {memberInfo.name} <span className="text-muted">{memberInfo.captain ? '队长' : '队员'}</span>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={`memberName-${props.index}`}>
            <Card.Body>
                {!props.index ? (<Alert variant="info">第一位队员会被视为队长，其他将被视为队员。</Alert>) : null}
                <FormItem title="姓名" controlId={`memberInfo[${props.index}].name`}>
                    <Form.Control
                        type="text"
                        isValid={touchedItems?.name && !erroredItems?.name}
                        maxLength={24}
                        {...getFieldProps(`memberInfo[${props.index}].name`)}
                    />
                    <Form.Text className="text-muted font-weight-light">长度不得超过12个汉字（24个英文字符）</Form.Text>
                </FormItem>
                <FormItem title="性别" colCss="radio-container" controlId={`memberInfo[${props.index}].gender`}>
                    <Form.Control
                        as="select"
                        {...getFieldProps(`memberInfo[${props.index}].gender`)}
                    >
                        <option value="0">男</option>
                        <option value="1">女</option>
                        <option value="2">其他</option>
                    </Form.Control>
                </FormItem>
                <FormItem title="邮箱" controlId={`memberInfo[${props.index}].email`}>
                    <Form.Control
                        type="email"
                        isValid={touchedItems?.email && !erroredItems?.email}
                        maxLength={30}
                        {...getFieldProps(`memberInfo[${props.index}].email`)}
                    />
                    <Form.Text className="text-muted font-weight-light">重要信息，请确保填写正确</Form.Text>
                </FormItem>
                <FormItem title="手机号码" controlId={`memberInfo[${props.index}].phone`}>
                    <Form.Control
                        type="text"
                        isValid={touchedItems?.phone && !erroredItems?.phone}
                        maxLength={20}
                        {...getFieldProps(`memberInfo[${props.index}].phone`)}
                    />
                    <Form.Text className="text-muted font-weight-light">仅接受内地及香港手机号码</Form.Text>
                </FormItem>
                <FormItem title="衣服尺码" controlId={`memberInfo[${props.index}].size`}>
                    <Form.Control
                        as="select"
                        {...getFieldProps(`memberInfo[${props.index}].size`)}
                    >
                        <option value="0">XS</option>
                        <option value="1">S</option>
                        <option value="2">M</option>
                        <option value="3">L</option>
                        <option value="4">XL</option>
                        <option value="5">XXL</option>
                        <option value="6">XXXL</option>
                    </Form.Control>
                    <Form.Text className="text-muted font-weight-light">用于比赛纪念T恤的制作（？）</Form.Text>
                </FormItem>
                <FormItem title="学校" controlId={`memberInfo[${props.index}].school`}>
                    <Form.Control
                        type="text"
                        isValid={touchedItems?.school && !erroredItems?.school}
                        maxLength={30}
                        {...getFieldProps(`memberInfo[${props.index}].school`)}
                    />
                    <Form.Text className="text-muted font-weight-light">建议格式：城市名+学校名，不要写缩写</Form.Text>
                </FormItem>
                <FormItem title="学历" controlId={`memberInfo[${props.index}].education`}>
                    <Form.Control
                        as="select"
                        {...getFieldProps(`memberInfo[${props.index}].education`)}
                    >
                        <option value="0">本科生</option>
                        <option value="1">研究生</option>
                        <option value="2">其他</option>
                    </Form.Control>
                    <Form.Text className="text-muted font-weight-light">（？）</Form.Text>
                </FormItem>
                <FormItem title="年级" controlId={`memberInfo[${props.index}].grade`}>
                    <Form.Control
                        type="text"
                        isValid={touchedItems?.grade && !erroredItems?.grade}
                        maxLength={10}
                        {...getFieldProps(`memberInfo[${props.index}].grade`)}
                    />
                    <Form.Text className="text-muted font-weight-light">（？）</Form.Text>
                </FormItem>
                <FormItem title="专业" controlId={`memberInfo[${props.index}].profession`}>
                    <Form.Control
                        type="text"
                        isValid={touchedItems?.profession && !erroredItems?.profession}
                        maxLength={20}
                        {...getFieldProps(`memberInfo[${props.index}].profession`)}
                    />
                    <Form.Text className="text-muted font-weight-light">（？）</Form.Text>
                </FormItem>
                <FormItem title="个人经历" controlId={`memberInfo[${props.index}].experience`}>
                    <Form.Control
                        as="textarea"
                        rows="5"
                        isValid={touchedItems?.experience && !erroredItems?.experience}
                        maxLength={100}
                        {...getFieldProps(`memberInfo[${props.index}].experience`)}
                    />
                    <Form.Text className="text-muted font-weight-light">吹吹水介绍一下自己，长度不得超过50个汉字（100个英文字符）</Form.Text>
                </FormItem>
            </Card.Body>
        </Accordion.Collapse>
    </Card>);
};

const MemberInfoAccordion: FunctionComponent = () => {
    const { values } = useFormikContext<SignupFormValues>();
    const cards = values.memberInfo.map((_, index) => <MemberInfoCard index={index} />);
    return (<>
        <h4>队员信息</h4>
        <Accordion>
            {cards}
            {values.memberInfo.length < 6 ? <Card>
                <Card.Header className="card-add-member">添加队员...</Card.Header>
            </Card> : null}
        </Accordion>
    </>);
};

export default MemberInfoAccordion;
