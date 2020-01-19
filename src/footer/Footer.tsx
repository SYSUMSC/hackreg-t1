import React, { FunctionComponent } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Footer.css';

const Footer: FunctionComponent = () => (<Navbar className="footer" expand="sm" bg="primary" variant="dark">
    <Container fluid={true}>
        <Row className="w-100" noGutters={true}>
            <Col className="footer-item text-center text-md-left font-weight-light"
                as={Navbar.Text}
                sm={12}
                md={true}>
                这里是备案号
            </Col>
            <Col className="footer-item text-center text-md-center font-weight-light"
                as={Navbar.Text}
                sm={12}
                md={true}>
                &copy; 中山大学微软俱乐部 2020
            </Col>
            <Col className="footer-item text-center text-md-right font-weight-light"
                as={Navbar.Text}
                sm={12}
                md={true}>
                自豪地使用&nbsp;
                <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a>
                &nbsp;&&nbsp;
                <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">TypeScript</a>
            </Col>
        </Row>
    </Container>
</Navbar>);

export default Footer;
