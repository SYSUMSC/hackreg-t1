import React, { FunctionComponent } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { EmailContext } from '../App';
import './SignupPage.css';
import Alert from 'react-bootstrap/Alert';

const SignupPage: FunctionComponent = () => {
    const { state } = React.useContext(EmailContext);
    return (<Container fluid={true} className="form-container" as={Form}>
        <Row>
            <Col>
                {state ? <>
                    <h4>已登陆</h4>
                    <Alert variant="info"></Alert>
                </> : <>
                        <h4>未登陆</h4>
                        <Alert variant="warning">注册并登陆后才可以编辑提交报名表单，请点击右上方的按钮来注册或登陆！</Alert>
                    </>
                }
            </Col>
        </Row>
        <Row>
            <Col sm={6}>
                <h4>队伍信息</h4>
                <Form.Group>
                    <Form.Label>队伍名称</Form.Label>
                    <Form.Control type="text" placeholder="起一个醒目的名字吧" maxLength={20} />
                    <Form.Text className="text-muted">长度不得超过10个汉字（20个英文字符）</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>队伍介绍</Form.Label>
                    <Form.Control as="textarea" rows="3" placeholder="介绍一下你们的队伍" maxLength={100} />
                    <Form.Text className="text-muted">长度不得超过50个汉字（100个英文字符）</Form.Text>
                </Form.Group>
            </Col>
            <Col sm={6}>
                <h4>队员信息</h4>
                <Accordion>
                    <Card> {/* TODO: use index for eventKey & radio id */}
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            俊仔 <span className="text-muted">队长</span>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form.Group>
                                    <Form.Label>姓名</Form.Label>
                                    <Form.Control type="text" placeholder="Who are you?" maxLength={20} />
                                    <Form.Text className="text-muted">长度不得超过10个汉字（20个英文字符）</Form.Text>
                                </Form.Group>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header className="card-add-member">
                            添加成员...
                        </Card.Header>
                    </Card>
                </Accordion>
            </Col>
        </Row>
    </Container>);
};

export default SignupPage;
