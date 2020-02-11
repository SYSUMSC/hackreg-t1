import React, { FC } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

const LoginAlert: FC = () => (
  <Container
    fluid={true}
    className="signup-page-container content-fit-viewport"
  >
    <Row>
      <Col>
        <Alert variant="warning" className="signup-alert">
          注册并登陆后才可以提交报名表单，请点击右上方的按钮来注册或登陆！
        </Alert>
      </Col>
    </Row>
  </Container>
);

export default LoginAlert;
