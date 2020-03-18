import React, { FC } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import './Footer.css';

const Footer: FC = () => (
  <Container
    as={Navbar}
    className="footer-container"
    fluid={true}
    sticky="bottom"
    bg="primary"
    variant="dark"
  >
    <Row className="w-100" noGutters={true}>
      <Col
        className="text-center text-md-left font-weight-light"
        as={Navbar.Text}
        sm={12}
        md={true}
      >
        这里是备案号
      </Col>
      <Col
        className="text-center text-md-center font-weight-light"
        as={Navbar.Text}
        sm={12}
        md={true}
      >
        &copy;&nbsp;中山大学微软俱乐部 2020
      </Col>
      <Col
        className="text-center text-md-right font-weight-light"
        as={Navbar.Text}
        sm={12}
        md={true}
      >
        自豪地使用&nbsp;
        <a
          href="https://reactjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          React
        </a>
        {' & '}
        <a
          href="https://www.typescriptlang.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          TypeScript
        </a>
      </Col>
    </Row>
  </Container>
);

export default Footer;
